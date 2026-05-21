import { NextRequest, NextResponse } from 'next/server';
import { getSession, saveSession } from '@/lib/data';
import { candidatePool, type Industry } from '@/lib/candidates';
import { getPlaySession, persistPlaySession } from '@/lib/playSessionStore';

export const runtime = 'nodejs';

export async function POST(req: NextRequest) {
  try {
    const { sessionId, industry, shortlist } = await req.json();
    if (!sessionId) {
      return NextResponse.json({ error: 'Missing sessionId' }, { status: 400 });
    }

    const session = getSession(sessionId);
    const dbSession = session ? null : await getPlaySession(sessionId);
    const resolvedIndustry = (session?.industry || dbSession?.industry || industry) as Industry | undefined;
    if (!resolvedIndustry || !candidatePool[resolvedIndustry]) {
      return NextResponse.json({ error: 'Invalid industry context' }, { status: 400 });
    }

    const dbRound1 = dbSession?.round1Shortlist;
    const dbShortlist = (
      typeof dbRound1 === 'object' &&
      dbRound1 !== null &&
      !Array.isArray(dbRound1) &&
      Array.isArray((dbRound1 as { ids?: unknown }).ids)
    )
      ? ((dbRound1 as { ids: unknown[] }).ids.filter((id): id is string => typeof id === 'string'))
      : [];
    const shortlistIds: string[] = session?.round1_shortlist?.length ? session.round1_shortlist : (Array.isArray(shortlist) ? shortlist : dbShortlist);
    if (!Array.isArray(shortlistIds) || shortlistIds.length !== 5) {
      return NextResponse.json({ error: 'Missing shortlist context' }, { status: 400 });
    }

    const pool = candidatePool[resolvedIndustry];
    const picked = pool.filter(c => shortlistIds.includes(c.id));

    const candidatesWithResult = picked.map(c => ({
      id: c.id,
      name: c.name,
      gpa: c.gpa,
      internshipMonths: c.internshipMonths,
      projects: c.projects,
      skills: c.skills,
      note: c.note,
      quadrant: c.quadrant,
      outcome: c.outcome,
      trialResult: c.trialResult,
    }));

    const successCount = candidatesWithResult.filter(c => c.outcome === 'success').length;

    if (session) {
      session.round3_acknowledged = true;
      session.successCount = successCount;
      saveSession(session);
    }

    await persistPlaySession(sessionId, {
      industry: resolvedIndustry,
      currentStage: 'reveal',
      round3Choice: {
        successCount,
        candidates: candidatesWithResult.map(candidate => ({
          id: candidate.id,
          name: candidate.name,
          outcome: candidate.outcome,
          quadrant: candidate.quadrant,
        })),
      },
    });

    return NextResponse.json({
      candidates: candidatesWithResult,
      successCount,
      failCount: 5 - successCount,
    });
  } catch (error) {
    console.error('Round3 error:', error);
    return NextResponse.json({ error: 'Round 3 failed' }, { status: 500 });
  }
}
