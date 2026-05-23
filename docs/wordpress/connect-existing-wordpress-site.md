# Connect Existing WordPress Site

## Purpose
Connect an already-live WordPress site into the Marveo operational workspace without rebuilding the site.

## When to use
- You already run WordPress in production.
- You want centralized operational visibility in Marveo.
- You want support-assisted onboarding with minimal disruption.

## Setup steps
1. Confirm admin access to WordPress.
2. Confirm you can install approved plugins in your environment.
3. Create or open the target workspace in Marveo.
4. Follow the connector onboarding prompts in Marveo.
5. Install and activate the Marveo connector in WordPress.
6. Complete verification in Marveo.

## Expected result
- Site appears as connected in Marveo.
- Workspace status changes from pending to verified.
- Operational setup can continue (roles, workflows, launch checks).

## Troubleshooting
- No admin rights: request temporary admin with plugin install permissions.
- Plugin install blocked: ask hosting provider to allow plugin deployment.
- Verification timeout: retry after confirming site can reach outbound services.
- Workspace still pending: run the verification checklist in `verify-wordpress-connection.md`.

## Architecture flow
```mermaid
flowchart LR
  WP[Existing WordPress Site] --> CONN[Marveo Connector]
  CONN --> WKS[Marveo Workspace]
  WKS --> OPS[Operational Workflows]
```
