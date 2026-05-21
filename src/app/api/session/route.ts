import { NextResponse } from 'next/server';
import { v4 as uuidv4 } from 'uuid';
import { saveSession } from '@/lib/data';
import { persistPlaySession } from '@/lib/playSessionStore';

export const runtime = 'nodejs';

export async function POST() {
  try {
    const sessionId = uuidv4();
    const now = new Date().toISOString();
    const session = {
      id: sessionId,
      industry: '',
      round1_shortlist: [],
      round1_sortUsed: '',
      round1_filterUsed: '',
      round2_ratings: {},
      round2_top3: [],
      round3_acknowledged: false,
      criteriaProfile: '',
      successCount: 0,
      createdAt: now,
      updatedAt: now,
    };
    saveSession(session);
    const db = await persistPlaySession(sessionId, { currentStage: 'landing' });

    return NextResponse.json({ sessionId, db: db.ok ? 'stored' : 'fallback' });
  } catch (error) {
    console.error('Session creation error:', error);
    return NextResponse.json({ error: 'Failed to create session' }, { status: 500 });
  }
}
