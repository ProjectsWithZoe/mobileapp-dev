## Why

When an unsigned user clicks a pricing button, they are shown the sign-up modal but receive no feedback about what happens next — there is no indication that they will be sent to Stripe, nor a reminder to click the magic link they receive to activate their account. This leads to confused users who may not complete either step.

## What Changes

- After an unsigned user submits their email in the sign-up modal (OTP sent), immediately redirect them to the Stripe payment link for the plan they selected.
- Display a persistent notification — visible on the Stripe page or after they return — telling them to also check their email and click the magic link to activate their Humble UI account.
- The `AuthModal` gains an `onOtpSent` callback so the parent (`App.jsx`) can react when the OTP is dispatched without waiting for actual sign-in.
- The Stripe redirect from this path uses the user's email (no `client_reference_id` yet), so the webhook stores the pending plan in `stripe_pending_activations`; when the user later clicks the magic link and signs in, `claim_pending_activation` applies the plan automatically.

## Capabilities

### New Capabilities
- `post-otp-stripe-redirect`: After sign-up OTP is sent for a pending plan, redirect the user to the Stripe payment link immediately and notify them to check their email to complete account activation.

### Modified Capabilities
*(none)*

## Impact

- `src/components/AuthModal.jsx` — add `onOtpSent(email)` callback prop; call it after `setSent(true)`
- `src/App.jsx` — pass `onOtpSent` to `AuthModal`; when a `pendingPlan` is in state and OTP is sent, build the Stripe link (email-only, no `client_reference_id`) and redirect
- `src/components/AuthModal.jsx` — update the "sent" screen copy to tell the user a payment page is opening and they must click the email link to activate their account
