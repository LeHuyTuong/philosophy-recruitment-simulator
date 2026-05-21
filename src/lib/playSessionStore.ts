import {
  buildDashboardStatsFromRecords,
  createDemoDashboardStats,
  type DashboardStats,
  type StatsSessionRecord,
} from '@/lib/dashboardStats';
import { getRecentSessions, getStats as getMemoryStats, type Session } from '@/lib/data';
import { maskSessionId } from '@/lib/sessionPrivacy';

export interface PlaySessionPatch {
  industry?: string | null;
  currentStage?: string;
  round1Shortlist?: unknown;
  round2Choice?: unknown;
  round3Choice?: unknown;
  finalPoll?: unknown;
}

export interface SafeDbResult {
  ok: boolean;
  reason?: string;
}

export interface RecentSessionSummary {
  id: string;
  clientSessionId: string;
  industry: string | null;
  currentStage: string;
  createdAt: string;
  updatedAt: string;
}

type DbClient = {
  playSession?: {
    upsert: (args: unknown) => Promise<unknown>;
    findUnique: (args: unknown) => Promise<DbPlaySession | null>;
    findMany: (args: unknown) => Promise<DbPlaySession[]>;
  };
};

type DbPlaySession = {
  id: string;
  clientSessionId: string;
  industry: string | null;
  currentStage: string;
  round1Shortlist: unknown;
  round2Choice: unknown;
  round3Choice: unknown;
  finalPoll: unknown;
  createdAt: Date | string;
  updatedAt: Date | string;
};

async function getDbClient(): Promise<DbClient | null> {
  try {
    const mod = await import('@/lib/db');
    const db = mod.db as DbClient;
    if (!db?.playSession) return null;
    return db;
  } catch {
    return null;
  }
}

function toIsoDate(value: Date | string | undefined): string {
  if (!value) return new Date().toISOString();
  if (value instanceof Date) return value.toISOString();
  return value;
}

function dbRecordToStats(record: DbPlaySession): StatsSessionRecord {
  return {
    industry: record.industry,
    currentStage: record.currentStage,
    round1Shortlist: record.round1Shortlist,
    round2Choice: record.round2Choice,
    round3Choice: record.round3Choice,
    finalPoll: record.finalPoll,
  };
}

function memoryRecordToStats(session: Session): StatsSessionRecord {
  return {
    industry: session.industry || null,
    currentStage: session.round3_acknowledged ? 'reveal' : session.industry ? 'round1' : 'landing',
    round1Shortlist: {
      ids: session.round1_shortlist,
      sortUsed: session.round1_sortUsed,
      filterUsed: session.round1_filterUsed,
      criteriaProfile: session.criteriaProfile,
    },
    round2Choice: {
      ratings: session.round2_ratings,
      top3: session.round2_top3,
    },
    round3Choice: {
      successCount: session.successCount,
    },
  };
}

function toCreatePayload(clientSessionId: string, patch: PlaySessionPatch) {
  return {
    clientSessionId,
    currentStage: patch.currentStage || 'landing',
    industry: patch.industry ?? null,
    round1Shortlist: patch.round1Shortlist,
    round2Choice: patch.round2Choice,
    round3Choice: patch.round3Choice,
    finalPoll: patch.finalPoll,
  };
}

export async function persistPlaySession(clientSessionId: string, patch: PlaySessionPatch): Promise<SafeDbResult> {
  if (!clientSessionId) return { ok: false, reason: 'missing-session-id' };

  try {
    const db = await getDbClient();
    if (!db?.playSession) return { ok: false, reason: 'db-unavailable' };

    await db.playSession.upsert({
      where: { clientSessionId },
      create: toCreatePayload(clientSessionId, patch),
      update: patch,
    });

    return { ok: true };
  } catch {
    console.error('PlaySession persistence skipped: db-write-failed');
    return { ok: false, reason: 'db-write-failed' };
  }
}

export async function getPlaySession(clientSessionId: string): Promise<DbPlaySession | null> {
  if (!clientSessionId) return null;

  try {
    const db = await getDbClient();
    if (!db?.playSession) return null;

    return await db.playSession.findUnique({
      where: { clientSessionId },
    });
  } catch {
    console.error('PlaySession read skipped: db-read-failed');
    return null;
  }
}

export async function getDashboardStats(): Promise<DashboardStats> {
  try {
    const db = await getDbClient();
    if (db?.playSession) {
      const sessions = await db.playSession.findMany({
        orderBy: { updatedAt: 'desc' },
        take: 500,
      });

      if (sessions.length === 0) {
        return createDemoDashboardStats('DB đang kết nối nhưng chưa có phiên chơi thật.');
      }

      return buildDashboardStatsFromRecords(sessions.map(dbRecordToStats), 'db');
    }
  } catch {
    console.error('DB stats read skipped: db-read-failed');
  }

  const memoryStats = getMemoryStats();
  if (memoryStats.totalSessions > 0) {
    return {
      ...memoryStats,
      source: 'memory',
      fallbackReason: 'DB chưa sẵn sàng, đang dùng dữ liệu bộ nhớ tạm.',
    };
  }

  return createDemoDashboardStats('DB chưa sẵn sàng hoặc chưa có dữ liệu, đang hiển thị dashboard mô phỏng.');
}

export async function getRecentSessionsSafe(limit = 10): Promise<{
  ok: boolean;
  source: 'db' | 'memory' | 'empty';
  sessions: RecentSessionSummary[];
  error?: string;
}> {
  const safeLimit = Math.min(Math.max(limit, 1), 20);

  try {
    const db = await getDbClient();
    if (db?.playSession) {
      const sessions = await db.playSession.findMany({
        orderBy: { updatedAt: 'desc' },
        take: safeLimit,
      });

      return {
        ok: true,
        source: sessions.length > 0 ? 'db' : 'empty',
        sessions: sessions.map(session => ({
          id: maskSessionId(session.id),
          clientSessionId: maskSessionId(session.clientSessionId),
          industry: session.industry,
          currentStage: session.currentStage,
          createdAt: toIsoDate(session.createdAt),
          updatedAt: toIsoDate(session.updatedAt),
        })),
      };
    }
  } catch {
    console.error('Recent sessions DB read skipped: db-read-failed');
  }

  const memorySessions = getRecentSessions(safeLimit);
  return {
    ok: true,
    source: memorySessions.length > 0 ? 'memory' : 'empty',
    sessions: memorySessions.map(session => ({
      id: maskSessionId(session.id),
      clientSessionId: maskSessionId(session.id),
      industry: session.industry || null,
      currentStage: session.round3_acknowledged ? 'reveal' : session.industry ? 'round1' : 'landing',
      createdAt: session.createdAt,
      updatedAt: session.updatedAt || session.createdAt,
    })),
  };
}

export function buildStatsFromMemorySessions(sessions: Session[]): DashboardStats {
  return buildDashboardStatsFromRecords(sessions.map(memoryRecordToStats), 'memory');
}
