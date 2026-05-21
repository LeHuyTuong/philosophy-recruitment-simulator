/**
 * Temporary health check for deployment verification only.
 * - Does NOT return or log any secret values.
 * - Returns presence of env vars and a simple DB connectivity status.
 */
import { NextResponse } from 'next/server'

export const runtime = 'nodejs'

export async function GET() {
  const env = {
    DATABASE_URL: !!process.env.DATABASE_URL,
    DATABASE_URL_UNPOOLED: !!process.env.DATABASE_URL_UNPOOLED,
  }

  try {
    // Lazy/dynamic import so the route doesn't fail build when the generated
    // Prisma client is not present locally. If the project has a usable
    // Prisma client (or is built on Vercel with Prisma generated), this will
    // import the shared `db` instance and attempt a minimal query.
    const mod = await import('@/lib/db')
    const prisma = mod.db as { $queryRawUnsafe?: (query: string) => Promise<unknown> }

    if (!prisma || typeof prisma.$queryRawUnsafe !== 'function') {
      throw new Error('prisma-unavailable')
    }

    await prisma.$queryRawUnsafe('SELECT 1')

    return NextResponse.json({ ok: true, env, db: 'connected' }, { status: 200 })
  } catch (e) {
    return NextResponse.json(
      { ok: false, env, db: 'failed', error: 'database connection failed' },
      { status: 503 }
    )
  }
}
