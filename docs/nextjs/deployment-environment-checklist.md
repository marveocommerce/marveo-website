# Deployment Environment Checklist (Next.js)

## Purpose
Ensure staging and production environments are aligned before onboarding and launch.

## When to use
- Before final connection verification.
- Before launch-readiness sign-off.
- After major environment changes.

## Environment Parity Checklist
- [ ] Node runtime version aligned
- [ ] Next.js version aligned
- [ ] Adapter package version aligned
- [ ] Required environment variables present
- [ ] Domain and routing configuration verified
- [ ] Build and start commands validated
- [ ] Observability/log access confirmed

## Operational Validation Checklist
- [ ] Connection verification passes in staging
- [ ] Connection verification passes in production
- [ ] Content update path tested
- [ ] Forms/enquiry path tested
- [ ] Rollback path documented

## Expected Result
Predictable deployment behavior with fewer environment-related surprises.

## Troubleshooting
- Drift between staging and production: align runtime and config first.
- Works in staging but fails in production: compare env vars and routing.
- Intermittent failures: review platform logs and deployment events.
