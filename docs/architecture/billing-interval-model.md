# Billing Interval Model (Marketing)

Supported intervals:
- `MONTHLY`
- `ANNUAL`

Pricing UI defaults to monthly and switches display using backend plan interval data.
Marketing must not hardcode interval pricing as a source of truth.

On onboarding start and payment verification, marketing passes the selected billing interval to MarveoOS.
