# Next.js Adapter Troubleshooting

## Purpose
Resolve adapter and connection issues during Next.js onboarding.

## When to use
- Adapter install/config appears valid but workspace remains disconnected.
- Deployment succeeds but operational status is unhealthy.

## Triage steps
1. Confirm adapter package version and compatibility.
2. Confirm required environment variables are set correctly.
3. Confirm workspace mapping points to the expected project.
4. Confirm deployment health and runtime parity.
5. Retry connection verification and capture logs.

## Expected result
Root cause is isolated and either resolved or escalated with actionable diagnostics.

## Common issue patterns
- **Build passes, status fails**: mapping or runtime config mismatch.
- **Intermittent health**: deployment instability or environment drift.
- **Persistent disconnect**: adapter registration not applied in target environment.

## Escalation details
Provide:
- Project name
- Workspace name
- Environment (staging/prod)
- Failure timestamp
- Relevant build/runtime logs
