import { NextResponse } from 'next/server';
import { v4 as uuidv4 } from 'uuid';
import { saveSession } from '@/lib/data';

export async function POST() {
  try {
    const sessionId = uuidv4();
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
      createdAt: new Date().toISOString(),
    };
    saveSession(session);
    return NextResponse.json({ sessionId });
  } catch (error) {
    console.error('Session creation error:', error);
    return NextResponse.json({ error: 'Failed to create session' }, { status: 500 });
  }
}
