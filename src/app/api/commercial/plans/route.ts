import { NextRequest, NextResponse } from 'next/server';

const MARVEO_OS_BASE_URL = process.env.MARVEO_OS_BASE_URL || process.env.NEXT_PUBLIC_MARVEO_OS_BASE_URL || 'https://pilot.getmarveo.com';

export async function GET(req: NextRequest) {
  const country = req.nextUrl.searchParams.get('country') || 'US';

  try {
    const response = await fetch(`${MARVEO_OS_BASE_URL.replace(/\/$/, '')}/api/public/plans?country=${encodeURIComponent(country)}`, {
      method: 'GET',
      cache: 'no-store',
      headers: { 'Content-Type': 'application/json' },
    });

    const payload = await response.json().catch(() => null);
    if (!response.ok || !payload) {
      return NextResponse.json({ error: 'Unable to fetch plans from MarveoOS backend.' }, { status: 502 });
    }

    return NextResponse.json(payload);
  } catch {
    return NextResponse.json({ error: 'Unable to reach MarveoOS backend.' }, { status: 502 });
  }
}
