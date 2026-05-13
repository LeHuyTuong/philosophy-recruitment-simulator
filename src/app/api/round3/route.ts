import { NextRequest, NextResponse } from 'next/server';
import { getSession, saveSession } from '@/lib/data';
import { candidatePool, type Industry } from '@/lib/candidates';

export async function POST(req: NextRequest) {
  try {
    const { sessionId } = await req.json();
    if (!sessionId) {
      return NextResponse.json({ error: 'Missing sessionId' }, { status: 400 });
    }

    const session = getSession(sessionId);
    if (!session) {
      return NextResponse.json({ error: 'Session not found' }, { status: 404 });
    }

    const industry = session.industry as Industry;
    const pool = candidatePool[industry];
    const picked = pool.filter(c => session.round1_shortlist.includes(c.id));

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

    session.round3_acknowledged = true;
    session.successCount = successCount;
    saveSession(session);

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
