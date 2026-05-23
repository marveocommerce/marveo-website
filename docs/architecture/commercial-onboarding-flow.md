# Commercial Onboarding Flow (Marketing Surface)

Public CTA flow:
1. `/pricing`
2. select plan, billing interval, and optional template
3. create account details
4. choose trial or paid mode
5. call MarveoOS `POST /api/public/onboarding/start`
6. for paid flows, verify payment before using the onboarding redirect
7. redirect to backend-provided `/setup/mvp?session=...`

Marketing must not send public users directly to `/setup/mvp`.

Minimal upgrade path is also available via `POST /api/commercial/subscription/upgrade`, which prepares a paid subscription from a recoverable trial or expired-trial context before payment verification.

Template integration rules:
- Website template catalog loads from `GET /api/commercial/templates` (proxy to MarveoOS public templates API).
- Only active and public templates compatible with new website setup are shown.
- Template CTA routes to pricing first with `selectedTemplateId` query parameter.
- Pricing forwards `selectedTemplateId` to onboarding start so setup session can preselect it.
