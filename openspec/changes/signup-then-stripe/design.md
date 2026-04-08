## Context

The app uses Supabase magic-link OTP auth. When a user enters their email, Supabase sends them a magic link and the modal flips to a "Check your inbox" state. At this point `user` is still `null` in React — the session is only created when the user clicks the link.

The existing `pendingPlan` flow in `App.jsx` waits for `user` to become non-null and then redirects to Stripe. That covers signed-in users fine, but for brand-new users the redirect only happens *after* they click the magic link and return — by which time they may have never visited Stripe at all.

The fix: treat "OTP sent" as the trigger for the Stripe redirect (not "user signed in"), so the user hits the Stripe checkout immediately. Their account activation (magic link click) can happen before or after payment.

`AuthModal` currently has no way to inform its parent that the OTP was sent — it only updates local `sent` state.

## Goals / Non-Goals

**Goals:**
- Redirect to Stripe immediately after the sign-up OTP is dispatched, not after sign-in.
- Show the user a clear message that they must also click their email link to activate their account.
- Keep the existing `pendingPlan` + `useEffect([user, pendingPlan])` flow for already-signed-in users unchanged.

**Non-Goals:**
- Changing the Stripe payment link structure or webhook handling.
- Waiting for email confirmation before allowing payment.
- Adding a dedicated notification component or toast library.

## Decisions

### 1. Add `onOtpSent(email)` callback to `AuthModal`

`AuthModal.handleSubmit` calls `await onSignIn(email)` then `setSent(true)`. We add an optional `onOtpSent` prop and call it (if provided) right after `setSent(true)`. The callback receives `email` so the parent can build a Stripe link with `prefilled_email`.

**Alternative considered**: Lift the `sent` state up to `App.jsx` and detect the transition there. Rejected — it requires more refactoring and couples `App.jsx` to `AuthModal`'s internal flow.

### 2. Stripe link uses `prefilled_email` only (no `client_reference_id`)

At OTP-sent time, `user` is still `null`, so there is no UUID to attach as `client_reference_id`. The link format becomes:

```
<STRIPE_LINK>?prefilled_email=<email>
```

This routes through the `stripe_pending_activations` webhook path already in place. When the user later clicks the magic link, `claim_pending_activation` fires and applies the plan.

### 3. Update `AuthModal` sent-screen copy when a `pendingPlan` is in flight

The "Check your inbox" screen should contextually tell the user:
- The payment page is opening (or has opened).
- They must click the email link to activate their Humble UI account after paying.

We pass a `hasPendingPlan` boolean prop to `AuthModal` to switch the copy on the sent screen. This keeps the modal self-contained and avoids reaching into external state from inside the modal.

## Risks / Trade-offs

- **User pays but never clicks magic link** → Plan sits in `stripe_pending_activations` indefinitely. Mitigation: copy clearly says to click the link; `claim_pending_activation` runs on every sign-in so late activation works.
- **Popup blocker prevents Stripe redirect** → Stripe opens via `window.location.href` (same tab), so no popup is involved. Not a risk.
- **Email typo** → User enters wrong email, pays, account never activated. Mitigation: no change from current flow; this is a Stripe/Supabase concern outside this scope.
- **`onOtpSent` fires but Stripe link is missing** → `getStripeLink` returns `null` for unknown plans. Guard with `if (link)` before redirect.
