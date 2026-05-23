# Escalation Severity Matrix

## Purpose
Standardize issue severity, response expectations, and escalation ownership.

## When to use
- During onboarding blockers.
- During production-impacting incidents.
- During repeated unresolved support tickets.

## Severity Levels

### Sev 1 - Critical Service Impact
- Definition: Core workflow or connection is unavailable for active customer operations.
- Initial response target: 15 minutes
- Escalation owner: Technical lead + support lead
- Communication cadence: Every 30 minutes until stabilized

### Sev 2 - Major Degradation
- Definition: Core workflows are partially available with significant impact.
- Initial response target: 1 hour
- Escalation owner: Support lead with engineering backup
- Communication cadence: Every 2 hours

### Sev 3 - Moderate Issue
- Definition: Non-critical workflow issue with workaround available.
- Initial response target: Same business day
- Escalation owner: Support owner
- Communication cadence: Daily until resolved

### Sev 4 - Minor / Request
- Definition: Cosmetic issue, minor bug, or enhancement request.
- Initial response target: Next business day
- Escalation owner: Support queue owner
- Communication cadence: As scheduled in normal updates

## Escalation Triggers
- Issue exceeds response target.
- Workaround fails.
- Issue repeats in multiple workspaces.
- Launch milestone is blocked.

## Required Escalation Context
- Workspace name
- Stack type
- Environment (staging/production)
- Exact timestamp of failure
- Current impact summary
- Screenshots/logs available

## Expected Result
Teams classify incidents consistently and escalate with complete context.
