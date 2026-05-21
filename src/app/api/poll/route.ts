import { NextRequest, NextResponse } from 'next/server';
import { savePoll } from '@/lib/data';
import { persistPlaySession } from '@/lib/playSessionStore';

export const runtime = 'nodejs';

export async function POST(req: NextRequest) {
  try {
    const { answer, sessionId } = await req.json();
    if (!answer || !['A', 'B', 'C'].includes(answer)) {
      return NextResponse.json({ error: 'Invalid answer' }, { status: 400 });
    }

    const createdAt = new Date().toISOString();
    savePoll({
      answer,
      createdAt,
    });

    let db = { ok: false };
    if (sessionId) {
      db = await persistPlaySession(sessionId, {
        currentStage: 'final-poll',
        finalPoll: {
          answer,
          createdAt,
        },
      });
    }

    return NextResponse.json({ success: true, db: db.ok ? 'stored' : 'fallback' });
  } catch (error) {
    console.error('Poll error:', error);
    return NextResponse.json({ error: 'Failed to submit poll' }, { status: 500 });
  }
}
