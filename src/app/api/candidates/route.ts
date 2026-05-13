import { NextRequest, NextResponse } from 'next/server';
import { candidatePool, type Industry } from '@/lib/candidates';

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const industry = searchParams.get('industry') as Industry;

    if (!industry || !candidatePool[industry]) {
      return NextResponse.json({ error: 'Invalid industry' }, { status: 400 });
    }

    const candidates = candidatePool[industry].map(c => ({
      id: c.id,
      name: c.name,
      gpa: c.gpa,
      internshipMonths: c.internshipMonths,
      projects: c.projects,
      skills: c.skills,
      note: c.note,
      quadrant: c.quadrant,
    }));

    return NextResponse.json({ candidates });
  } catch (error) {
    console.error('Candidates fetch error:', error);
    return NextResponse.json({ error: 'Failed to fetch candidates' }, { status: 500 });
  }
}
