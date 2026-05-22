import { NextResponse } from 'next/server';
import { buildDashboardStatsFromRecords } from '@/lib/dashboardStats';

export const runtime = 'nodejs';

export async function GET() {
  const t0 = performance.now();

  try {
    // Try to access DB directly. The API must reflect DB state
    const mod = await import('@/lib/db');
    const db = mod.db;
    if (!db?.playSession) {
      const dur = Math.round(performance.now() - t0);
      const res = NextResponse.json({ ok: false, source: 'db', hasData: false, error: 'dashboard_data_unavailable' }, { status: 500, headers: { 'Server-Timing': `db;dur=${dur}` } });
      if (process.env.NODE_ENV !== 'production') console.debug(`[dashboard] /api/stats DB unavailable (${dur}ms)`);
      return res;
    }

    const sessions = await db.playSession.findMany({ orderBy: { updatedAt: 'desc' }, take: 500 });
    const dur = Math.round(performance.now() - t0);
    if (process.env.NODE_ENV !== 'production') console.debug(`[dashboard] /api/stats DB read ${sessions.length} rows (${dur}ms)`);

    if (!sessions || sessions.length === 0) {
      return NextResponse.json(
        { ok: true, source: 'db', hasData: false, totalSessions: 0, data: [], stats: null },
        { headers: { 'Server-Timing': `db;dur=${dur}` } }
      );
    }

    const stats = buildDashboardStatsFromRecords(sessions.map(s => ({
      industry: s.industry,
      currentStage: s.currentStage,
      round1Shortlist: s.round1Shortlist,
      round2Choice: s.round2Choice,
      round3Choice: s.round3Choice,
      finalPoll: s.finalPoll,
    })), 'db');

    return NextResponse.json(
      { ok: true, source: 'db', hasData: true, totalSessions: stats.totalSessions, stats },
      { headers: { 'Server-Timing': `db;dur=${dur}` } }
    );
  } catch (error) {
    const dur = Math.round(performance.now() - t0);
    console.error('Stats error:', error);
    if (process.env.NODE_ENV !== 'production') console.debug(`[dashboard] /api/stats error (${dur}ms)`, error);
    return NextResponse.json({ ok: false, source: 'db', hasData: false, error: 'dashboard_data_unavailable' }, { status: 500, headers: { 'Server-Timing': `db;dur=${dur}` } });
  }
}
