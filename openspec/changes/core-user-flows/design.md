## Context

The app is a Vite/React SPA with Supabase auth (magic-link OTP). Stripe integration uses pre-configured Payment Links — there is no Stripe.js or Elements; payments are redirected. The webhook handler is a Vercel serverless function (`api/stripe-webhook.js`) with service-role Supabase access.

Key constraint: `user_profiles` has a foreign key to `auth.users`. A plan cannot be written to `user_profiles` for an email that has no Supabase auth account yet.

## Goals / Non-Goals

**Goals:**
- Unsigned users can click pricing buttons → Stripe → payment succeeds → plan is held against their email
- When that email later signs up (or signs in), the held plan is automatically applied
- Demo users who sign up are immediately shown pricing so they understand the upgrade path
- Contact form works on humble-ui.com

**Non-Goals:**
- Auto-creating a Supabase auth account from the webhook (requires sending an invite email — adds complexity and is confusing UX)
- Changing pricing, plan names, or Stripe product configuration
- Server-side enforcement of generation limits

## Decisions

**1. `stripe_pending_activations` table as the bridge**

When a Stripe session has no `client_reference_id`, the webhook writes:
```
stripe_pending_activations(
  email       text  PRIMARY KEY,
  plan        text,   -- 'monthly' | 'lifetime'
  stripe_customer_id text,
  created_at  timestamptz DEFAULT now()
)
```

On `useProfile.load()`, after creating/fetching the user's `user_profiles` row, we query this table by email (pulled from `supabase.auth.getUser()`). If a pending activation exists and the current plan is still `free`, we:
1. Update `user_profiles.plan` and `stripe_customer_id`
2. Delete the row from `stripe_pending_activations`

This is a "claim on first login" pattern — simple, idempotent, no background job required.

RLS on `stripe_pending_activations`: no direct client access. The webhook writes with the service role key; `useProfile` reads via a Supabase function/RPC that is security-definer (so the client never touches the table directly).

**Alternative considered:** Supabase admin `inviteUserByEmail()` from the webhook — rejected because it sends an unexpected "invited to app" email immediately after a Stripe checkout, which is confusing.

**2. Remove sign-up gate in `onSubscribe` for unsigned users**

Current code in `App.jsx`:
```js
onSubscribe={(plan) => {
  const link = getStripeLink(plan, user)
  if (link) { window.location.href = link } else { openAuth('signup') }
}}
```

`getStripeLink(plan, null)` already returns a valid link (it just omits `client_reference_id` and `prefilled_email`). So the current code actually redirects correctly for unsigned users when the env var is set. The issue is entirely in the webhook. **No change needed to `App.jsx` or `getStripeLink`** for the unsigned payment flow — just fix the webhook.

**3. Demo → pricing handoff via `localStorage` signal**

When the demo upgrade modal's "Create free account" button is clicked, we set a localStorage key `"humble-ui-show-pricing"`. In `ComplexGenerator`, on profile load, if this key is set and the plan is `free`, we immediately set `showUpgradeModal = true` and clear the key. This is zero-prop-drilling — the signal lives in localStorage across the sign-up redirect.

**4. CORS fix — single-line change**

Add `'https://humble-ui.com'` to the CORS origin array in `send-contact/index.ts`.

## Risks / Trade-offs

- **Pending activation email is case-sensitive**: Stripe emails are lowercased by Stripe, but Supabase auth emails may vary. The claim query should use `ilike` or force lowercase.
- **Duplicate payment before sign-up**: If a user pays twice with the same email (e.g., tries monthly then lifetime), the second payment overwrites the first in the table. This is acceptable — latest plan wins.
- **Pending activation never claimed**: If a user pays but never signs up, the row sits in the table forever. This is fine for now — it's a small table and rows are cheap.
- **`stripe_pending_activations` RLS via RPC**: Requires a `claim_pending_activation(user_email text)` security-definer function. This is a one-time migration.

## Migration Plan

1. Run Supabase migration to create `stripe_pending_activations` table and `claim_pending_activation` RPC.
2. Deploy webhook update.
3. Deploy `useProfile` update.
4. Deploy `send-contact` CORS fix.
5. Deploy `LandingPage` / `ComplexGenerator` demo-handoff update.
6. Test unsigned payment end-to-end in Stripe test mode.

## Open Questions

*(none — all decisions resolved above)*
