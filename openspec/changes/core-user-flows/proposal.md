## Why

An audit of the five core user flows against the product requirements revealed one critical broken path and three UX gaps that would prevent users from completing a purchase or accessing the product correctly.

**Critical broken path:** Unsigned-in users clicking a pricing button on the landing page are sent to Stripe *without* a `client_reference_id`. The webhook then receives the completed payment but cannot find the user to upgrade — the plan is never applied, and the `/success` page loops to "Still activating…".

**UX gap — post-payment account linking:** When an unauthenticated user pays via Stripe, the email they enter in Stripe checkout should become their account email. There is currently no mechanism to link that payment to a future sign-up.

**UX gap — demo → sign-up + pricing handoff:** The upgrade modal after a demo generation correctly shows "Create free account", but after the user signs up, they land in the signed-in app with no visibility of pricing. The intent is: demo → sign-up prompt + immediate pricing view.

**UX gap — contact form CORS:** The `send-contact` Edge Function's CORS allowlist includes `humble-ui.vercel.app` and `humble-ui.co.uk` but not `humble-ui.com`. Any request from the production domain will be rejected with a 403.

## What Changes

- **Unsigned user → Stripe flow**: Remove the sign-up gate on landing page pricing buttons. Let unsigned users go straight to Stripe. `getStripeLink` passes only `prefilled_email` (none) — no `client_reference_id`.
- **Webhook — email-based activation**: When `client_reference_id` is absent, the webhook reads `session.customer_details.email`, stores `(email, plan, stripe_customer_id)` in a new `stripe_pending_activations` table, and returns 200. On sign-up/login, `useProfile.load()` checks this table by email and promotes the plan automatically.
- **Demo → pricing handoff**: After the demo upgrade modal's "Create free account" button triggers sign-up, once auth resolves the app should surface the pricing upgrade modal immediately (since the user just came from a demo paywall).
- **Contact form CORS fix**: Add `humble-ui.com` to the allowlist in `send-contact/index.ts`.

## Capabilities

### New Capabilities

- `stripe-pending-activation`: A lightweight table + claim mechanism that bridges unsigned Stripe payments to future account sign-ups. Email is the key; on profile load the pending record is consumed and the plan applied.

### Modified Capabilities

- `unsigned-pricing-flow`: Landing page pricing buttons no longer require a signed-in session. `getStripeLink` is called with `user = null` and generates a valid link (no `client_reference_id`).
- `demo-signup-pricing-handoff`: After demo sign-up, the upgrade pricing modal auto-opens once the user's profile loads and the plan is still `free`.
- `contact-form-cors`: `send-contact` Edge Function CORS allowlist extended to include `humble-ui.com`.

## Impact

- `mobiledev-web/src/lib/stripe.js` — no change (already handles null user gracefully)
- `mobiledev-web/src/App.jsx` — remove sign-up gate in `onSubscribe` for unsigned users; add demo→pricing handoff signal
- `mobiledev-web/src/components/ComplexGenerator.jsx` — accept and act on a `showPricingOnLoad` prop
- `mobiledev-web/api/stripe-webhook.js` — add email-based activation path when `client_reference_id` is absent
- `mobiledev-web/src/hooks/useProfile.js` — claim pending activation on profile load
- `supabase/functions/send-contact/index.ts` — CORS fix
- Supabase migration — create `stripe_pending_activations` table
