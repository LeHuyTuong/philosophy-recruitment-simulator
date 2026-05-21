import { NextRequest, NextResponse } from 'next/server';
import { getSession, saveSession } from '@/lib/data';
import { industryList, type Industry } from '@/lib/candidates';

export async function POST(req: NextRequest) {
  try {
    const { sessionId, industry } = await req.json();
    if (!sessionId || !industry) {
      return NextResponse.json({ error: 'Missing sessionId or industry' }, { status: 400 });
    }

    if (!(industryList as readonly string[]).includes(industry)) {
      return NextResponse.json({ error: 'Invalid industry' }, { status: 400 });
    }

    const session = getSession(sessionId);
    if (!session) {
      // Serverless instances can lose in-memory state; allow client flow to continue.
      return NextResponse.json({ success: true, volatile: true });
    }
    session.industry = industry as Industry;
    saveSession(session);
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Industry set error:', error);
    return NextResponse.json({ error: 'Failed to set industry' }, { status: 500 });
  }
}
