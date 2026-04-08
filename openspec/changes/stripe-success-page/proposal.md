## Why

After a successful Stripe payment, users are redirected to `humble-ui.com/success` but no page exists there — they land on a blank or 404 screen. We need a confirmation page that acknowledges the purchase, communicates their new plan status, and guides them back into the app.

## What Changes

- Add a `/success` route in the React app rendered at `humble-ui.com/success`
- Build a `PaymentSuccess` page component that confirms the purchase and shows plan details
- Wire Stripe Payment Links to redirect to `/success` on successful checkout
- Pull the user's updated plan from Supabase (populated by the existing stripe-webhook) to display the correct tier (`monthly` or `lifetime`)

## Capabilities

### New Capabilities

- `payment-success-page`: A post-checkout confirmation page at `/success` that shows plan confirmation, a welcome message, and a CTA back into the app. Reads plan from Supabase user profile (set by webhook) and handles loading/error states.

### Modified Capabilities

- *(none)*

## Impact

- `src/App.jsx` — add `/success` route
- `src/components/PaymentSuccess.jsx` — new component (created)
- `src/lib/stripe.js` — no changes needed (redirect URL is set in Stripe Dashboard)
- `mobiledev-web/api/stripe-webhook.js` — no changes (already updates `plan` on checkout)
- Stripe Dashboard — set Payment Link success redirect to `https://humble-ui.com/success`
