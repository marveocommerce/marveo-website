# Marketing to MarveoOS Integration

Website server routes proxy to MarveoOS:
- `GET /api/commercial/plans` -> MarveoOS `GET /api/public/plans`
- `POST /api/commercial/onboarding/start` -> MarveoOS `POST /api/public/onboarding/start`

Reason: avoid browser CORS coupling and centralize backend integration handling.
