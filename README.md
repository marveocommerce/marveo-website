# Marveo Website

Operational marketing site for Marveo, built with Next.js App Router.

## Business-Ready Stack Included

- Real lead submission API endpoint (`/api/leads`)
- Contact form wired to backend submission
- Waiting list popup wired to backend submission
- GA4 + Meta Pixel client-side integration (env-driven)
- SEO baseline:
	- global metadata
	- Open Graph image
	- JSON-LD structured data
	- dynamic sitemap
	- robots.txt
	- manifest

## Local Development

1. Install dependencies.

```bash
npm install
```

2. Copy environment template and set values.

```bash
cp .env.example .env.local
```

3. Start dev server.

```bash
npm run dev
```

4. Open `http://localhost:3000`.

## Lead Submission Delivery

Submissions are accepted by `src/app/api/leads/route.ts`.

Supported delivery channels:

1. Webhook (`LEADS_WEBHOOK_URL`, optional `WAITLIST_WEBHOOK_URL`)
2. Resend email alerts (`RESEND_API_KEY`, `LEADS_ALERT_EMAIL`)

If no provider is configured, submissions are still captured in server logs to avoid silent frontend success without backend processing.

## Analytics and Pixel

Configured in `src/components/analytics/MarketingScripts.tsx`.

- `NEXT_PUBLIC_GA_MEASUREMENT_ID` enables GA4 pageview + events.
- `NEXT_PUBLIC_META_PIXEL_ID` enables Meta Pixel pageview + lead tracking.

Client conversion events are emitted from:

- `src/app/contact/page.tsx`
- `src/components/shared/WaitingListPopup.tsx`

## SEO Files

- `src/app/layout.tsx` (metadata + JSON-LD)
- `src/app/sitemap.ts`
- `src/app/robots.ts`
- `src/app/manifest.ts`

## Validation

```bash
npm run lint
npm run build
```
