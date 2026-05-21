import { NextRequest, NextResponse } from 'next/server';
import { getRecentSessionsSafe } from '@/lib/playSessionStore';

export const runtime = 'nodejs';

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const requestedLimit = Number(searchParams.get('limit') || 10);
    const data = await getRecentSessionsSafe(Number.isFinite(requestedLimit) ? requestedLimit : 10);

    return NextResponse.json(data);
  } catch (error) {
    console.error('Recent sessions API error:', error);
    return NextResponse.json({
      ok: true,
      source: 'empty',
      sessions: [],
      error: 'recent sessions unavailable',
    });
  }
}
