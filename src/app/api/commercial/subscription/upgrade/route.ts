import { NextRequest, NextResponse } from 'next/server';

const MARVEO_OS_BASE_URL = process.env.MARVEO_OS_BASE_URL || process.env.NEXT_PUBLIC_MARVEO_OS_BASE_URL || 'https://app.getmarveo.com';

export async function POST(req: NextRequest) {
  const body = await req.json().catch(() => null);
  if (!body) {
    return NextResponse.json({ error: 'Invalid request body.' }, { status: 400 });
  }

  try {
    const response = await fetch(`${MARVEO_OS_BASE_URL.replace(/\/$/, '')}/api/public/subscription/upgrade`, {
      method: 'POST',
      cache: 'no-store',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    });

    const payload = await response.json().catch(() => null);
    if (!response.ok || !payload) {
      return NextResponse.json({ error: payload?.error || 'Failed to prepare subscription upgrade.' }, { status: response.status || 502 });
    }

    return NextResponse.json(payload);
  } catch {
    return NextResponse.json({ error: 'Unable to reach MarveoOS backend.' }, { status: 502 });
  }
}
