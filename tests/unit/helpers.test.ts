import { describe, expect, it } from 'vitest';
import { getJobDescription, matchJdSkills } from '@/data/jobDescriptions';
import {
  buildDashboardStatsFromRecords,
  createDemoDashboardStats,
  formatDashboardSourceLabel,
} from '@/lib/dashboardStats';
import { maskSessionId } from '@/lib/sessionPrivacy';

describe('helper functions', () => {
  it('matches JD skills with aliases', () => {
    const jd = getJobDescription('it');
    const result = matchJdSkills(['ReactJS', 'SQL', 'Testing'], jd);

    expect(result.matchedMust).toEqual(expect.arrayContaining(['react', 'sql']));
    expect(result.matchedNice).toEqual(expect.arrayContaining(['testing']));
  });

  it('masks session ids without leaking full identifiers', () => {
    expect(maskSessionId('1234567890abcdef')).toBe('1234...cdef');
    expect(maskSessionId('abc')).toBe('ab...bc');
    expect(maskSessionId(null)).toBe('anonymous');
  });

  it('creates demo stats with display source metadata', () => {
    const stats = createDemoDashboardStats('demo fallback');

    expect(stats.source).toBe('demo');
    expect(stats.totalSessions).toBeGreaterThan(0);
    expect(formatDashboardSourceLabel(stats)).toBe('Dữ liệu mô phỏng');
  });

  it('formats stats from session records', () => {
    const stats = buildDashboardStatsFromRecords([
      {
        industry: 'it',
        round1Shortlist: {
          ids: ['it-01', 'it-02'],
          criteriaProfile: 'balanced',
        },
        round3Choice: {
          successCount: 4,
          candidates: [{ id: 'it-01', outcome: 'success' }],
        },
        finalPoll: { answer: 'B' },
      },
    ]);

    expect(stats.totalSessions).toBe(1);
    expect(stats.byIndustry.it).toBe(1);
    expect(stats.criteriaProfileDist.balanced).toBe(100);
    expect(stats.successRateByProfile.balanced).toBe(80);
    expect(stats.finalPoll.B).toBe(100);
  });
});
