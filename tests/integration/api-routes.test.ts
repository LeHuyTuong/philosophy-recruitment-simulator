import { afterEach, describe, expect, it, vi } from 'vitest';
import { createDemoDashboardStats } from '@/lib/dashboardStats';

describe('API route integration shape', () => {
  afterEach(() => {
    vi.resetModules();
    vi.restoreAllMocks();
  });

  it('/api/db-health returns safe connected shape without secrets', async () => {
    const originalDatabaseUrl = process.env.DATABASE_URL;
    process.env.DATABASE_URL = 'postgres://user:secret@example.test/db';

    vi.doMock('@/lib/db', () => ({
      db: {
        $queryRawUnsafe: vi.fn().mockResolvedValue([{ ok: 1 }]),
      },
    }));

    const { GET } = await import('@/app/api/db-health/route');
    const response = await GET();
    const body = await response.json();

    expect(response.status).toBe(200);
    expect(body).toMatchObject({
      ok: true,
      env: { DATABASE_URL: true },
      db: 'connected',
    });
    expect(JSON.stringify(body)).not.toContain('secret');

    if (originalDatabaseUrl === undefined) {
      delete process.env.DATABASE_URL;
    } else {
      process.env.DATABASE_URL = originalDatabaseUrl;
    }
  });

  it('/api/db-health returns safe failed shape', async () => {
    vi.doMock('@/lib/db', () => ({
      db: {
        $queryRawUnsafe: vi.fn().mockRejectedValue(new Error('connection failed')),
      },
    }));

    const { GET } = await import('@/app/api/db-health/route');
    const response = await GET();
    const body = await response.json();

    expect(response.status).toBe(503);
    expect(body.ok).toBe(false);
    expect(body.db).toBe('failed');
    expect(JSON.stringify(body)).not.toContain('DATABASE_URL=');
  });

  it('/api/stats returns hasData=false when DB is empty', async () => {
    const originalDatabaseUrl = process.env.DATABASE_URL;
    process.env.DATABASE_URL = 'postgres://user:secret@example.test/db';
    // Mock DB client with empty sessions
    vi.doMock('@/lib/db', () => ({
      db: {
        playSession: {
          findMany: vi.fn().mockResolvedValue([]),
        },
      },
    }));

    const { GET } = await import('@/app/api/stats/route');
    const response = await GET();
    const body = await response.json();

    expect(response.status).toBe(200);
    expect(body.ok).toBe(true);
    expect(body.source).toBe('db');
    expect(body.hasData).toBe(false);
    expect(body.totalSessions).toBe(0);
    expect(body.data).toEqual([]);
    expect(body.stats).toBeNull();

    if (originalDatabaseUrl === undefined) {
      delete process.env.DATABASE_URL;
    } else {
      process.env.DATABASE_URL = originalDatabaseUrl;
    }
  });

  it('/api/stats returns a controlled env-missing response before DB import', async () => {
    const originalDatabaseUrl = process.env.DATABASE_URL;
    delete process.env.DATABASE_URL;
    const dbImport = vi.fn();

    vi.doMock('@/lib/db', () => {
      dbImport();
      return {
        db: {
          playSession: {
            findMany: vi.fn().mockResolvedValue([]),
          },
        },
      };
    });

    const { GET } = await import('@/app/api/stats/route');
    const response = await GET();
    const body = await response.json();

    expect(response.status).toBe(500);
    expect(body).toMatchObject({
      ok: false,
      source: 'db',
      hasData: false,
      error: 'dashboard_env_missing',
    });
    expect(dbImport).not.toHaveBeenCalled();
    expect(JSON.stringify(body)).not.toContain('DATABASE_URL');

    if (originalDatabaseUrl === undefined) {
      delete process.env.DATABASE_URL;
    } else {
      process.env.DATABASE_URL = originalDatabaseUrl;
    }
  });

  it('/api/stats returns a sanitized error when DB read fails', async () => {
    const originalDatabaseUrl = process.env.DATABASE_URL;
    process.env.DATABASE_URL = 'postgres://user:secret@example.test/db';
    vi.doMock('@/lib/db', () => ({
      db: {
        playSession: {
          findMany: vi.fn().mockRejectedValue(new Error('database unavailable')),
        },
      },
    }));

    const { GET } = await import('@/app/api/stats/route');
    const response = await GET();
    const body = await response.json();

    expect(response.status).toBe(500);
    expect(body.ok).toBe(false);
    expect(body.source).toBe('db');
    expect(body.hasData).toBe(false);
    expect(body.error).toBe('dashboard_data_unavailable');
    expect(JSON.stringify(body)).not.toContain('database unavailable');

    if (originalDatabaseUrl === undefined) {
      delete process.env.DATABASE_URL;
    } else {
      process.env.DATABASE_URL = originalDatabaseUrl;
    }
  });

  it('/api/sessions/recent returns an anonymous list safely', async () => {
    vi.doMock('@/lib/playSessionStore', () => ({
      getRecentSessionsSafe: vi.fn().mockResolvedValue({
        ok: true,
        source: 'db',
        sessions: [
          {
            id: 'ckab...1234',
            clientSessionId: 'abcd...wxyz',
            industry: 'it',
            currentStage: 'round2',
            createdAt: '2026-05-21T00:00:00.000Z',
            updatedAt: '2026-05-21T00:05:00.000Z',
          },
        ],
      }),
    }));

    const { GET } = await import('@/app/api/sessions/recent/route');
    const response = await GET(new Request('http://localhost/api/sessions/recent?limit=10') as never);
    const body = await response.json();

    expect(response.status).toBe(200);
    expect(body.ok).toBe(true);
    expect(body.sessions).toHaveLength(1);
    expect(body.sessions[0].clientSessionId).toContain('...');
  });

  it('/api/sessions/recent tolerates empty data', async () => {
    vi.doMock('@/lib/playSessionStore', () => ({
      getRecentSessionsSafe: vi.fn().mockResolvedValue({
        ok: true,
        source: 'empty',
        sessions: [],
      }),
    }));

    const { GET } = await import('@/app/api/sessions/recent/route');
    const response = await GET(new Request('http://localhost/api/sessions/recent') as never);
    const body = await response.json();

    expect(response.status).toBe(200);
    expect(body.sessions).toEqual([]);
  });
});
