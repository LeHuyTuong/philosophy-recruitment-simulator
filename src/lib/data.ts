// In-memory data store — works in both server and client
// Next.js App Router API routes run server-side, but this file must be safe to import

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

// Global singleton — persists for the lifetime of the Node.js process
const sessions: Map<string, Session> = new Map();
const polls: FinalPoll[] = [];

export function saveSession(session: Session): void {
  sessions.set(session.id, session);
}

export function getSession(id: string): Session | undefined {
  return sessions.get(id);
}

export function savePoll(poll: FinalPoll): void {
  polls.push(poll);
}

export function getStats() {
  const allSessions = Array.from(sessions.values());
  const totalSessions = allSessions.length;

  const byIndustry: Record<string, number> = {};
  const criteriaProfileDist: Record<string, number> = { gpa_heavy: 0, exp_heavy: 0, balanced: 0, mixed: 0 };
  const successCountByProfile: Record<string, { total: number; success: number }> = {
    gpa_heavy: { total: 0, success: 0 },
    exp_heavy: { total: 0, success: 0 },
    balanced: { total: 0, success: 0 },
    mixed: { total: 0, success: 0 },
  };

  for (const session of allSessions) {
    byIndustry[session.industry] = (byIndustry[session.industry] || 0) + 1;
    criteriaProfileDist[session.criteriaProfile] = (criteriaProfileDist[session.criteriaProfile] || 0) + 1;
    if (successCountByProfile[session.criteriaProfile]) {
      successCountByProfile[session.criteriaProfile].total++;
      successCountByProfile[session.criteriaProfile].success += session.successCount;
    }

    for (const cid of session.round1_shortlist) {
      void cid;
    }
  }

  const industries = ['it', 'marketing', 'accounting', 'business', 'design', 'education'];
  const crossIndustry = industries.map(ind => {
    const indSessions = allSessions.filter(s => s.industry === ind);
    const dist: Record<string, number> = { gpa_heavy: 0, exp_heavy: 0, balanced: 0, mixed: 0 };
    indSessions.forEach(s => {
      dist[s.criteriaProfile] = (dist[s.criteriaProfile] || 0) + 1;
    });
    const total = indSessions.length || 1;
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

  const finalPoll: Record<string, number> = { A: 0, B: 0, C: 0 };
  polls.forEach(p => {
    finalPoll[p.answer] = (finalPoll[p.answer] || 0) + 1;
  });
  const pollTotal = polls.length || 1;

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
    topPicked: [] as { id: string; name: string; count: number }[],
    topSuccess: [] as { id: string; name: string; count: number }[],
    finalPoll: {
      A: Math.round((finalPoll.A / pollTotal) * 100),
      B: Math.round((finalPoll.B / pollTotal) * 100),
      C: Math.round((finalPoll.C / pollTotal) * 100),
    },
  };
}
