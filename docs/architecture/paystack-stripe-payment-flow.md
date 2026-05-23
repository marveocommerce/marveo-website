# Paystack and Stripe Payment Flow (Marketing)

Pricing UI fetches live plans from MarveoOS.
The selected plan carries backend pricing metadata and recommended provider.

Paid flow:
1. start onboarding
2. backend creates pending paid subscription
3. website calls payment verification endpoint
4. backend returns onboarding redirect only after successful verification

Sandbox/test references are the safe current mode until live provider verification is implemented.
