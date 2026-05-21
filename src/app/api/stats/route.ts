import { NextResponse } from 'next/server';
import { createDemoDashboardStats } from '@/lib/dashboardStats';
import { getDashboardStats } from '@/lib/playSessionStore';

export const runtime = 'nodejs';

export async function GET() {
  try {
    const stats = await getDashboardStats();
    return NextResponse.json(stats);
  } catch (error) {
    console.error('Stats error:', error);
    return NextResponse.json(
      createDemoDashboardStats('Stats API gặp lỗi an toàn, đang hiển thị dữ liệu mô phỏng.'),
      { status: 200 }
    );
  }
}
