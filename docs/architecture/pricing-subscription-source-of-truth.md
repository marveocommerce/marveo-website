# Pricing and Subscription Source of Truth (Marketing)

Marketing website is display and conversion UX only.
MarveoOS backend is source of truth for:
- plans
- regional currency and amount
- monthly and annual interval pricing
- trials
- subscriptions
- workspace limits
- feature entitlements

Fallback static pricing is allowed only for graceful degradation when live plans API is unavailable.
Fallback static pricing must not become the pricing source of truth for monthly or annual plans.
