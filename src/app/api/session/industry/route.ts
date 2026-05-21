import { NextRequest, NextResponse } from 'next/server';
import { getSession, saveSession } from '@/lib/data';
import { industryList, type Industry } from '@/lib/candidates';
import { persistPlaySession } from '@/lib/playSessionStore';

export const runtime = 'nodejs';

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
    if (session) {
      session.industry = industry as Industry;
      saveSession(session);
    }

    const db = await persistPlaySession(sessionId, {
      industry: industry as Industry,
      currentStage: 'round1',
    });

    return NextResponse.json({
      success: true,
      volatile: !session,
      db: db.ok ? 'stored' : 'fallback',
    });
  } catch (error) {
    console.error('Industry set error:', error);
    return NextResponse.json({ error: 'Failed to set industry' }, { status: 500 });
  }
}
