import { NextRequest, NextResponse } from 'next/server';
import { savePoll } from '@/lib/data';

export async function POST(req: NextRequest) {
  try {
    const { answer } = await req.json();
    if (!answer || !['A', 'B', 'C'].includes(answer)) {
      return NextResponse.json({ error: 'Invalid answer' }, { status: 400 });
    }

    savePoll({
      answer,
      createdAt: new Date().toISOString(),
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Poll error:', error);
    return NextResponse.json({ error: 'Failed to submit poll' }, { status: 500 });
  }
}
