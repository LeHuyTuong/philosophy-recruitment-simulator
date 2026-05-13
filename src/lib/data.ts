import { readFileSync, writeFileSync, existsSync, mkdirSync } from 'fs';
import { join } from 'path';

const DATA_DIR = join(process.cwd(), 'server-data');
const DATA_FILE = join(DATA_DIR, 'data.json');

export interface Session {
  id: string;
  industry: string;
  round1_shortlist: string[];
  round1_sortUsed: string;
  round1_filterUsed: string;
  round2_ratings: Record<string, number>;
  round2_top3: string[];
  round3_acknowledged: boolean;
  criteriaProfile: string;
  successCount: number;
  createdAt: string;
}

export interface FinalPoll {
  answer: string;
  createdAt: string;
}

export interface AppData {
  sessions: Session[];
  finalPolls: FinalPoll[];
}

function ensureDataFile(): AppData {
  if (!existsSync(DATA_DIR)) {
    mkdirSync(DATA_DIR, { recursive: true });
  }
  if (!existsSync(DATA_FILE)) {
    const initial: AppData = { sessions: [], finalPolls: [] };
    writeFileSync(DATA_FILE, JSON.stringify(initial, null, 2), 'utf-8');
    return initial;
  }
  const raw = readFileSync(DATA_FILE, 'utf-8');
  return JSON.parse(raw) as AppData;
}

function saveData(data: AppData): void {
  writeFileSync(DATA_FILE, JSON.stringify(data, null, 2), 'utf-8');
}

export function getData(): AppData {
  return ensureDataFile();
}

export function saveSession(session: Session): void {
  const data = getData();
  const idx = data.sessions.findIndex(s => s.id === session.id);
  if (idx >= 0) {
    data.sessions[idx] = session;
  } else {
    data.sessions.push(session);
  }
  saveData(data);
}

export function getSession(id: string): Session | undefined {
  const data = getData();
  return data.sessions.find(s => s.id === id);
}

export function savePoll(poll: FinalPoll): void {
  const data = getData();
  data.finalPolls.push(poll);
  saveData(data);
}

export function getStats() {
  const data = getData();
  const totalSessions = data.sessions.length;

  const byIndustry: Record<string, number> = {};
  const criteriaProfileDist: Record<string, number> = { gpa_heavy: 0, exp_heavy: 0, balanced: 0, mixed: 0 };
  const successCountByProfile: Record<string, { total: number; success: number }> = {
    gpa_heavy: { total: 0, success: 0 },
    exp_heavy: { total: 0, success: 0 },
    balanced: { total: 0, success: 0 },
    mixed: { total: 0, success: 0 },
  };

  const candidatePickCount: Record<string, { id: string; name: string; count: number; industry: string }> = {};
  const candidateSuccessCount: Record<string, { id: string; name: string; picked: number; passed: number }> = {};

  for (const session of data.sessions) {
    byIndustry[session.industry] = (byIndustry[session.industry] || 0) + 1;
    criteriaProfileDist[session.criteriaProfile] = (criteriaProfileDist[session.criteriaProfile] || 0) + 1;
    successCountByProfile[session.criteriaProfile].total++;
    successCountByProfile[session.criteriaProfile].success += session.successCount;

    for (const cid of session.round1_shortlist) {
      if (!candidatePickCount[cid]) {
        candidatePickCount[cid] = { id: cid, name: '', count: 0, industry: session.industry };
      }
      candidatePickCount[cid].count++;
    }
  }

  const industries = ['it', 'marketing', 'accounting', 'business', 'design', 'education'];
  const crossIndustry = industries.map(ind => {
    const sessions = data.sessions.filter(s => s.industry === ind);
    const dist: Record<string, number> = { gpa_heavy: 0, exp_heavy: 0, balanced: 0, mixed: 0 };
    sessions.forEach(s => {
      dist[s.criteriaProfile] = (dist[s.criteriaProfile] || 0) + 1;
    });
    const total = sessions.length || 1;
    return {
      industry: ind,
      gpa_heavy: Math.round((dist.gpa_heavy / total) * 100),
      exp_heavy: Math.round((dist.exp_heavy / total) * 100),
      balanced: Math.round((dist.balanced / total) * 100),
      mixed: Math.round((dist.mixed / total) * 100),
    };
  });

  const successRateByProfile: Record<string, number> = {};
  for (const [profile, counts] of Object.entries(successCountByProfile)) {
    if (counts.total > 0) {
      successRateByProfile[profile] = Math.round((counts.success / (counts.total * 5)) * 100);
    } else {
      successRateByProfile[profile] = 0;
    }
  }

  const topPicked = Object.values(candidatePickCount)
    .sort((a, b) => b.count - a.count)
    .slice(0, 5)
    .map(c => ({ id: c.id, count: c.count, name: c.name }));

  const topSuccess = Object.entries(candidatePickCount)
    .sort((a, b) => b[1].count - a[1].count)
    .slice(0, 5)
    .map(([cid, info]) => ({ id: cid, count: info.count, name: info.name }));

  const finalPoll: Record<string, number> = { A: 0, B: 0, C: 0 };
  data.finalPolls.forEach(p => {
    finalPoll[p.answer] = (finalPoll[p.answer] || 0) + 1;
  });
  const pollTotal = data.finalPolls.length || 1;

  return {
    totalSessions,
    byIndustry,
    criteriaProfileDist: {
      gpa_heavy: Math.round(((criteriaProfileDist.gpa_heavy || 0) / (totalSessions || 1)) * 100),
      exp_heavy: Math.round(((criteriaProfileDist.exp_heavy || 0) / (totalSessions || 1)) * 100),
      balanced: Math.round(((criteriaProfileDist.balanced || 0) / (totalSessions || 1)) * 100),
      mixed: Math.round(((criteriaProfileDist.mixed || 0) / (totalSessions || 1)) * 100),
    },
    successRateByProfile,
    crossIndustry,
    topPicked,
    topSuccess,
    finalPoll: {
      A: Math.round((finalPoll.A / pollTotal) * 100),
      B: Math.round((finalPoll.B / pollTotal) * 100),
      C: Math.round((finalPoll.C / pollTotal) * 100),
    },
  };
}
