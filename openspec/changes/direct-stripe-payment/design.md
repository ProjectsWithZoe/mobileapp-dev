## Context

The app uses Stripe Payment Links (pre-configured URLs) with `prefilled_email` and `client_reference_id` query params. The existing webhook already handles two paths:

- **Path A** (`client_reference_id` present): updates `user_profiles` directly for signed-in users
- **Path B** (no `client_reference_id`, email present): upserts `stripe_pending_activations` for guest checkouts; the account link is claimed later via `claim_pending_activation` RPC when the user signs in

The `SUPABASE_SERVICE_ROLE_KEY` is already listed as a required env var in the webhook file, so the Admin Auth API is available without new secrets.

The `PaymentSuccess` component already has a `noSession` branch (line 67-77) with copy that says "Sign up or log in with the email you used at checkout". This branch needs updated copy to say "Check your email for an activation link".

## Goals / Non-Goals

**Goals:**
- Remove the sign-up gate from the pricing CTA flow — users go straight to Stripe
- After guest payment, automatically send a Supabase magic link to the payer's email
- Update the success page to tell guest users to check their email (not manually sign up)
- Pre-fill the Stripe checkout with the user's email if they happen to be signed in already

**Non-Goals:**
- Changing how `claim_pending_activation` works — it already handles account linking correctly
- Modifying the monthly subscription cancellation webhook path
- Adding email templates or custom Supabase email branding (that's a Supabase dashboard concern)

## Decisions

### 1. Remove PricingModal confirmation step for direct Stripe redirect

**Decision**: Remove the `PricingModal` intermediary. Pricing buttons call `onSubscribe` directly (or navigate directly to Stripe). If a confirmation affordance is desired, it can be added as a simpler inline state change rather than a full modal.

**Rationale**: The PricingModal was designed to be the auth gate entry point. In the new flow it adds friction with no benefit — the user has already read the pricing on the landing page. Stripe's own checkout is the confirmation step.

**Alternative considered**: Keep PricingModal but skip the AuthModal it currently triggers. Rejected — PricingModal copy would need rewriting anyway, and removing it is simpler.

### 2. Send magic link via `supabase.auth.admin.generateLink` in the webhook

**Decision**: In webhook Path B, after upserting `stripe_pending_activations`, call `supabase.auth.admin.generateLink({ type: 'magiclink', email, options: { redirectTo: appUrl } })` and discard the token — Supabase sends the email automatically.

**Rationale**: `admin.generateLink` with `type: 'magiclink'` creates or finds an existing user and fires the email in one call. It does not require the user to already exist. This is the correct Admin SDK call for passwordless account creation from server-side code.

**Alternative considered**: `supabase.auth.signInWithOtp` with service role. This also works but does not guarantee account creation without `shouldCreateUser: true`, and generates the same magic link email — functionally identical. `admin.generateLink` is more explicit about intent.

**Alternative considered**: Custom email via a third-party provider (e.g., Resend). Rejected — adds a new dependency. Supabase magic links already do exactly this.

### 3. `redirectTo` for the activation magic link

**Decision**: Use `VITE_APP_URL` (or fall back to `process.env.APP_URL`) as the `redirectTo` base. This lands the user on the homepage after clicking the link, where `useProfile`'s `claim_pending_activation` call runs automatically.

**Rationale**: The `claim_pending_activation` RPC runs in the `useProfile` hook on every page load for signed-in users. No special `/activate` route needed.

### 4. `PaymentSuccess` — guest branch copy

**Decision**: Update the `noSession` branch copy to: "Check your email — we sent an activation link to the address you used at checkout. Click it to create your account and start building."

**Rationale**: In the new flow, the user will *always* receive an email after guest payment. The old "Sign up or log in" call-to-action no longer applies.

### 5. `onSubscribe` in `App.jsx` — unsigned users go directly to Stripe

**Decision**: Remove the `if (!user) { setPendingPlan(plan); openAuth('signup'); return }` guard. All users (signed-in and guest) go straight to `getStripeLink(plan, user)` → `window.location.href`. For unsigned users, `user` is `null` so `getStripeLink` produces a URL with no `prefilled_email` and no `client_reference_id` — a clean guest checkout URL.

**Rationale**: The sign-up gate is no longer needed. The webhook + magic link handles account creation post-payment.

## Risks / Trade-offs

- **Duplicate magic links**: If the webhook fires twice (Stripe retry), `admin.generateLink` is called twice, sending two emails. The `upsert` on `stripe_pending_activations` is idempotent (keyed by email), so no duplicate records. The extra email is harmless.
  → Mitigation: log a warning on the second upsert; Stripe retries are rare for completed sessions.

- **Email delivery delay**: User lands on `/success` before the webhook fires (Stripe can take a few seconds). They may see the success page before the email arrives.
  → Mitigation: success page copy says "we've sent an activation link" — no live status check needed.

- **User already has an account**: `admin.generateLink` with an existing email sends a sign-in magic link (not a new account). The user signs in, `claim_pending_activation` runs, and the plan is applied. This is correct behavior.

- **Env var `VITE_APP_URL` vs `APP_URL`**: The webhook runs server-side and cannot read `VITE_*` vars. The `redirectTo` must come from a non-prefixed env var (`APP_URL`) or be hard-coded as a fallback to the production domain.
  → Decision: read `process.env.APP_URL ?? 'https://humble-ui.com'` in the webhook.

## Migration Plan

1. Deploy webhook change first (adds `admin.generateLink` call) — safe, additive, no client changes needed
2. Deploy frontend changes (removes sign-up gate, updates success page copy) — safe, no DB changes
3. Verify in Stripe test mode: guest checkout → activation email received → click → plan applied
4. No rollback needed for DB — `stripe_pending_activations` table is unchanged

## Open Questions

- Should `APP_URL` be added as an explicit non-`VITE_` env var in Vercel, or is hard-coding `https://humble-ui.com` as the fallback acceptable? (Recommend adding the env var for flexibility.)
- Should the PricingModal be removed entirely, or replaced with a lighter "You're about to be redirected to our secure checkout" interstitial? (This design removes it entirely — revisit if conversion data suggests otherwise.)
