import { NextRequest, NextResponse } from 'next/server';

const MARVEO_OS_BASE_URL = process.env.MARVEO_OS_BASE_URL || process.env.NEXT_PUBLIC_MARVEO_OS_BASE_URL || 'https://app.getmarveo.com';

export async function GET(req: NextRequest, context: { params: Promise<{ sessionId: string }> }) {
  const params = await context.params;
  const sessionId = String(params.sessionId || '').trim();

  if (!sessionId) {
    return NextResponse.json({ error: 'sessionId is required.' }, { status: 400 });
  }

  try {
    const response = await fetch(`${MARVEO_OS_BASE_URL.replace(/\/$/, '')}/api/public/onboarding/session/${encodeURIComponent(sessionId)}`, {
      method: 'GET',
      cache: 'no-store',
      headers: { 'Content-Type': 'application/json' },
    });

    const payload = await response.json().catch(() => null);
    if (!response.ok || !payload) {
      return NextResponse.json({ error: payload?.error || 'Failed to recover onboarding session.' }, { status: response.status || 502 });
    }

    return NextResponse.json(payload);
  } catch {
    return NextResponse.json({ error: 'Unable to reach MarveoOS backend.' }, { status: 502 });
  }
}
