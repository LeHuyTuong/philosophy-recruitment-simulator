import { NextRequest, NextResponse } from 'next/server';
import { getSession, saveSession } from '@/lib/data';
import { persistPlaySession } from '@/lib/playSessionStore';

export const runtime = 'nodejs';

export async function POST(req: NextRequest) {
  try {
    const { sessionId, ratings, top3 } = await req.json();
    if (!sessionId || !ratings || !top3) {
      return NextResponse.json({ error: 'Invalid request' }, { status: 400 });
    }

    const session = getSession(sessionId);
    if (session) {
      session.round2_ratings = ratings;
      session.round2_top3 = top3;
      saveSession(session);
    }

    const db = await persistPlaySession(sessionId, {
      currentStage: 'round3',
      round2Choice: {
        ratings,
        top3,
      },
    });

    return NextResponse.json({ success: true, volatile: !session, db: db.ok ? 'stored' : 'fallback' });
  } catch (error) {
    console.error('Round2 error:', error);
    return NextResponse.json({ error: 'Round 2 failed' }, { status: 500 });
  }
}
