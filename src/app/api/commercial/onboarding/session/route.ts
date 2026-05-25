import { NextRequest, NextResponse } from 'next/server';

const MARVEO_OS_BASE_URL = process.env.MARVEO_OS_BASE_URL || process.env.NEXT_PUBLIC_MARVEO_OS_BASE_URL || 'https://pilot.getmarveo.com';

export async function GET(req: NextRequest) {
  const query = req.nextUrl.searchParams.toString();

  try {
    const response = await fetch(`${MARVEO_OS_BASE_URL.replace(/\/$/, '')}/api/public/onboarding/session${query ? `?${query}` : ''}`, {
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
