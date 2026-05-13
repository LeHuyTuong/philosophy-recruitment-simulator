import { NextRequest, NextResponse } from 'next/server';
import { getSession, saveSession } from '@/lib/data';

export async function POST(req: NextRequest) {
  try {
    const { sessionId, industry } = await req.json();
    if (!sessionId || !industry) {
      return NextResponse.json({ error: 'Missing sessionId or industry' }, { status: 400 });
    }
    const session = getSession(sessionId);
    if (!session) {
      return NextResponse.json({ error: 'Session not found' }, { status: 404 });
    }
    session.industry = industry;
    saveSession(session);
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Industry set error:', error);
    return NextResponse.json({ error: 'Failed to set industry' }, { status: 500 });
  }
}
