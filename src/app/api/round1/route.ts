import { NextRequest, NextResponse } from 'next/server';
import { getSession, saveSession } from '@/lib/data';
import { candidatePool, type Industry } from '@/lib/candidates';
import { persistPlaySession } from '@/lib/playSessionStore';

export const runtime = 'nodejs';

export async function POST(req: NextRequest) {
  try {
    const { sessionId, industry, shortlist, sortUsed, filterUsed } = await req.json();
    if (!shortlist || shortlist.length !== 5) {
      return NextResponse.json({ error: 'Invalid request' }, { status: 400 });
    }

    const session = sessionId ? getSession(sessionId) : undefined;
    const resolvedIndustry = (session?.industry || industry) as Industry | undefined;
    if (!resolvedIndustry || !candidatePool[resolvedIndustry]) {
      return NextResponse.json({ error: 'Invalid industry context' }, { status: 400 });
    }

    const pool = candidatePool[resolvedIndustry];
    const picked = pool.filter(c => shortlist.includes(c.id));
    if (picked.length !== 5) {
      return NextResponse.json({ error: 'Invalid shortlist entries' }, { status: 400 });
    }

    const avgGPA = picked.reduce((sum, c) => sum + c.gpa, 0) / 5;
    const avgExp = picked.reduce((sum, c) => sum + c.internshipMonths, 0) / 5;

    let criteriaProfile: string;
    if (avgGPA >= 3.5 && avgExp < 4) {
      criteriaProfile = 'gpa_heavy';
    } else if (avgExp >= 6 && avgGPA < 3.2) {
      criteriaProfile = 'exp_heavy';
    } else if (avgGPA >= 3.3 && avgExp >= 5) {
      criteriaProfile = 'balanced';
    } else {
      criteriaProfile = 'mixed';
    }

    if (session) {
      session.round1_shortlist = shortlist;
      session.round1_sortUsed = sortUsed;
      session.round1_filterUsed = filterUsed;
      session.criteriaProfile = criteriaProfile;
      saveSession(session);
    }

    if (sessionId) {
      await persistPlaySession(sessionId, {
        industry: resolvedIndustry,
        currentStage: 'round2',
        round1Shortlist: {
          ids: shortlist,
          sortUsed,
          filterUsed,
          criteriaProfile,
        },
      });
    }

    const candidatesWithInterview = picked.map(c => ({
      id: c.id,
      name: c.name,
      gpa: c.gpa,
      internshipMonths: c.internshipMonths,
      projects: c.projects,
      skills: c.skills,
      note: c.note,
      quadrant: c.quadrant,
      interviewAnswer: c.interviewAnswer,
    }));

    return NextResponse.json({ candidates: candidatesWithInterview, criteriaProfile });
  } catch (error) {
    console.error('Round1 error:', error);
    return NextResponse.json({ error: 'Round 1 failed' }, { status: 500 });
  }
}
