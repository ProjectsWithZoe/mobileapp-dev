## Why

The current payment flow forces users to sign up before paying, adding unnecessary friction. Users should be able to pay immediately and receive an account activation email afterwards — matching the familiar "buy now, create account later" pattern.

## What Changes

- Landing page pricing buttons go directly to Stripe (no sign-up gate, no PricingModal confirmation step)
- Stripe checkout uses a `prefilled_email` parameter so the email entered at checkout pre-fills the Stripe form
- After a successful payment where no `client_reference_id` is present (guest checkout), the webhook sends an account activation magic link to the payer's email via Supabase Admin Auth
- The `/success` page displays messaging that tells the user to check their email to activate their account
- The existing `claim_pending_activation` RPC continues to handle linking the payment to the account once the user clicks their email link

## Capabilities

### New Capabilities

- `post-payment-activation-email`: After a guest Stripe payment, the webhook sends a Supabase magic link (OTP) to the payer's email so they can activate their account without ever seeing a sign-up form
- `direct-stripe-redirect`: Pricing buttons on the landing page bypass the auth gate and redirect straight to Stripe, optionally pre-filling the email if the user is already signed in

### Modified Capabilities

<!-- No existing spec-level requirements are changing -->

## Impact

- `mobiledev-web/src/App.jsx` — `onSubscribe` no longer opens AuthModal for unsigned users; redirects directly to Stripe
- `mobiledev-web/src/components/LandingPage.jsx` — PricingModal confirmation step removed or replaced with a direct Stripe redirect
- `mobiledev-web/api/stripe-webhook.js` — Path B (no `client_reference_id`) must call Supabase Admin Auth to send a magic link after upserting `stripe_pending_activations`
- `mobiledev-web/src/components/PaymentSuccess.jsx` — Success page copy updated to tell user to check email for account activation
- New env var required: `SUPABASE_SERVICE_ROLE_KEY` in the Vercel serverless function environment (already needed for webhook, may already exist)
