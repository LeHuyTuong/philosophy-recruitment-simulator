import { candidatePool } from '@/lib/candidates';

export type DashboardStatsSource = 'db' | 'memory' | 'demo' | 'empty';

export interface DashboardStats {
  totalSessions: number;
  byIndustry: Record<string, number>;
  criteriaProfileDist: Record<string, number>;
  successRateByProfile: Record<string, number>;
  crossIndustry: { industry: string; gpa_heavy: number; exp_heavy: number; balanced: number; mixed: number }[];
  topPicked: { id: string; name: string; count: number }[];
  topSuccess: { id: string; name: string; count: number }[];
  finalPoll: { A: number; B: number; C: number };
  source: DashboardStatsSource;
  fallbackReason?: string;
}

export interface StatsSessionRecord {
  industry?: string | null;
  currentStage?: string | null;
  round1Shortlist?: unknown;
  round2Choice?: unknown;
  round3Choice?: unknown;
  finalPoll?: unknown;
}

const industries = ['it', 'marketing', 'accounting', 'business', 'design', 'education'];
const profiles = ['gpa_heavy', 'exp_heavy', 'balanced', 'mixed'];

const candidateNames = new Map(
  Object.values(candidatePool)
    .flat()
    .map(candidate => [candidate.id, candidate.name])
);

function emptyDistribution() {
  return { gpa_heavy: 0, exp_heavy: 0, balanced: 0, mixed: 0 };
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null && !Array.isArray(value);
}

function asStringArray(value: unknown): string[] {
  if (!Array.isArray(value)) return [];
  return value.filter((item): item is string => typeof item === 'string');
}

function getRound1Ids(round1: unknown): string[] {
  if (Array.isArray(round1)) return asStringArray(round1);
  if (!isRecord(round1)) return [];
  return asStringArray(round1.ids);
}

function getCriteriaProfile(round1: unknown): string | null {
  if (!isRecord(round1)) return null;
  const profile = round1.criteriaProfile;
  return typeof profile === 'string' && profiles.includes(profile) ? profile : null;
}

function getSuccessCount(round3: unknown): number | null {
  if (!isRecord(round3)) return null;
  const successCount = round3.successCount;
  return typeof successCount === 'number' ? successCount : null;
}

function getSuccessfulCandidateIds(round3: unknown): string[] {
  if (!isRecord(round3) || !Array.isArray(round3.candidates)) return [];
  return round3.candidates
    .filter(candidate => isRecord(candidate) && candidate.outcome === 'success' && typeof candidate.id === 'string')
    .map(candidate => (candidate as { id: string }).id);
}

function getPollAnswer(finalPoll: unknown): 'A' | 'B' | 'C' | null {
  if (!isRecord(finalPoll)) return null;
  const answer = finalPoll.answer;
  return answer === 'A' || answer === 'B' || answer === 'C' ? answer : null;
}

function toPercent(value: number, total: number): number {
  if (total <= 0) return 0;
  return Math.round((value / total) * 100);
}

function topCounts(counts: Map<string, number>) {
  return Array.from(counts.entries())
    .sort((a, b) => b[1] - a[1])
    .slice(0, 5)
    .map(([id, count]) => ({
      id,
      name: candidateNames.get(id) || id,
      count,
    }));
}

export function createEmptyDashboardStats(source: DashboardStatsSource = 'empty', fallbackReason?: string): DashboardStats {
  return {
    totalSessions: 0,
    byIndustry: {},
    criteriaProfileDist: emptyDistribution(),
    successRateByProfile: emptyDistribution(),
    crossIndustry: industries.map(industry => ({ industry, ...emptyDistribution() })),
    topPicked: [],
    topSuccess: [],
    finalPoll: { A: 0, B: 0, C: 0 },
    source,
    fallbackReason,
  };
}

export function createDemoDashboardStats(fallbackReason = 'Chưa có dữ liệu DB thật nên đang hiển thị dữ liệu mô phỏng.'): DashboardStats {
  return {
    totalSessions: 12,
    byIndustry: { it: 4, marketing: 2, accounting: 1, business: 2, design: 2, education: 1 },
    criteriaProfileDist: { gpa_heavy: 17, exp_heavy: 25, balanced: 42, mixed: 16 },
    successRateByProfile: { gpa_heavy: 40, exp_heavy: 58, balanced: 78, mixed: 46 },
    crossIndustry: [
      { industry: 'it', gpa_heavy: 20, exp_heavy: 20, balanced: 50, mixed: 10 },
      { industry: 'marketing', gpa_heavy: 10, exp_heavy: 35, balanced: 45, mixed: 10 },
      { industry: 'accounting', gpa_heavy: 30, exp_heavy: 10, balanced: 45, mixed: 15 },
      { industry: 'business', gpa_heavy: 12, exp_heavy: 38, balanced: 35, mixed: 15 },
      { industry: 'design', gpa_heavy: 10, exp_heavy: 25, balanced: 50, mixed: 15 },
      { industry: 'education', gpa_heavy: 20, exp_heavy: 20, balanced: 40, mixed: 20 },
    ],
    topPicked: [
      { id: 'demo-balanced', name: 'Ứng viên cân bằng', count: 7 },
      { id: 'demo-practice', name: 'Ứng viên thực hành mạnh', count: 5 },
    ],
    topSuccess: [
      { id: 'demo-balanced', name: 'Ứng viên cân bằng', count: 6 },
      { id: 'demo-practice', name: 'Ứng viên thực hành mạnh', count: 4 },
    ],
    finalPoll: { A: 18, B: 64, C: 18 },
    source: 'demo',
    fallbackReason,
  };
}

export function buildDashboardStatsFromRecords(records: StatsSessionRecord[], source: DashboardStatsSource = 'db'): DashboardStats {
  if (records.length === 0) {
    return createEmptyDashboardStats(source);
  }

  const byIndustry: Record<string, number> = {};
  const criteriaCounts = emptyDistribution();
  const successByProfile: Record<string, { total: number; success: number }> = {
    gpa_heavy: { total: 0, success: 0 },
    exp_heavy: { total: 0, success: 0 },
    balanced: { total: 0, success: 0 },
    mixed: { total: 0, success: 0 },
  };
  const pickedCounts = new Map<string, number>();
  const successCounts = new Map<string, number>();
  const pollCounts = { A: 0, B: 0, C: 0 };
  let pollTotal = 0;

  for (const record of records) {
    const industry = typeof record.industry === 'string' ? record.industry : '';
    if (industry) {
      byIndustry[industry] = (byIndustry[industry] || 0) + 1;
    }

    const profile = getCriteriaProfile(record.round1Shortlist);
    if (profile) {
      criteriaCounts[profile] = (criteriaCounts[profile] || 0) + 1;

      const successCount = getSuccessCount(record.round3Choice);
      if (typeof successCount === 'number') {
        successByProfile[profile].total += 1;
        successByProfile[profile].success += successCount;
      }
    }

    for (const id of getRound1Ids(record.round1Shortlist)) {
      pickedCounts.set(id, (pickedCounts.get(id) || 0) + 1);
    }

    for (const id of getSuccessfulCandidateIds(record.round3Choice)) {
      successCounts.set(id, (successCounts.get(id) || 0) + 1);
    }

    const pollAnswer = getPollAnswer(record.finalPoll);
    if (pollAnswer) {
      pollCounts[pollAnswer] += 1;
      pollTotal += 1;
    }
  }

  const totalSessions = records.length;
  const criteriaProfileDist = Object.fromEntries(
    profiles.map(profile => [profile, toPercent(criteriaCounts[profile] || 0, totalSessions)])
  ) as Record<string, number>;

  const successRateByProfile = Object.fromEntries(
    profiles.map(profile => {
      const counts = successByProfile[profile];
      return [profile, counts.total > 0 ? toPercent(counts.success, counts.total * 5) : 0];
    })
  ) as Record<string, number>;

  const crossIndustry = industries.map(industry => {
    const industryRecords = records.filter(record => record.industry === industry);
    const total = industryRecords.length;
    const counts = emptyDistribution();

    for (const record of industryRecords) {
      const profile = getCriteriaProfile(record.round1Shortlist);
      if (profile) counts[profile] = (counts[profile] || 0) + 1;
    }

    return {
      industry,
      gpa_heavy: toPercent(counts.gpa_heavy, total),
      exp_heavy: toPercent(counts.exp_heavy, total),
      balanced: toPercent(counts.balanced, total),
      mixed: toPercent(counts.mixed, total),
    };
  });

  return {
    totalSessions,
    byIndustry,
    criteriaProfileDist,
    successRateByProfile,
    crossIndustry,
    topPicked: topCounts(pickedCounts),
    topSuccess: topCounts(successCounts),
    finalPoll: {
      A: toPercent(pollCounts.A, pollTotal),
      B: toPercent(pollCounts.B, pollTotal),
      C: toPercent(pollCounts.C, pollTotal),
    },
    source,
  };
}

export function formatDashboardSourceLabel(stats: Pick<DashboardStats, 'source'>): string {
  const labels: Record<DashboardStatsSource, string> = {
    db: 'DB thật',
    memory: 'Bộ nhớ tạm',
    demo: 'Dữ liệu mô phỏng',
    empty: 'Chưa có dữ liệu',
  };

  return labels[stats.source] || labels.empty;
}
