# Verify WordPress Connection

## Purpose
Validate that WordPress and Marveo are connected reliably before operational rollout.

## When to use
- Immediately after connector install.
- Before support handoff and launch readiness checks.

## Setup steps
1. Open the workspace connection status panel.
2. Confirm connector status is active.
3. Confirm workspace status reads verified.
4. Run a basic sync test from the onboarding flow.
5. Confirm no critical warnings in connection logs.

## Expected result
- Connection status is verified.
- Sync checks pass.
- Team can proceed to workflows, permissions, and launch readiness.

## Troubleshooting
- Verified status missing: re-run connection step from workspace.
- Sync check fails: confirm site health and firewall/outbound rules.
- Intermittent failures: capture timestamps and escalate to support.

## Verification checklist
- [ ] Connector active
- [ ] Workspace verified
- [ ] Sync test passed
- [ ] No critical warnings
- [ ] Handoff notes recorded
