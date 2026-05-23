# Payment Provider Integration (Marketing)

Marketing currently does not embed Paystack or Stripe SDKs.
This phase uses server-side proxy routes and backend-owned payment verification contracts.

Provider direction:
- Nigeria / NGN -> Paystack
- International / non-NG -> Stripe

Paid onboarding flow should not assume subscription activation until backend verification succeeds.
