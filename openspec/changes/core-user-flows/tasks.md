## 1. Supabase migration — stripe_pending_activations

- [x] 1.1 Create `supabase/migrations/stripe_pending_activations.sql` with the table definition (`email text PRIMARY KEY`, `plan text`, `stripe_customer_id text`, `created_at timestamptz DEFAULT now()`)
- [x] 1.2 Add RLS: disable all direct client access (`ALTER TABLE stripe_pending_activations ENABLE ROW LEVEL SECURITY` — no policies = deny all)
- [x] 1.3 Create `claim_pending_activation(p_user_id uuid, p_email text)` security-definer RPC that: reads matching row, updates `user_profiles`, deletes the row, returns new plan (or null if none)
- [ ] 1.4 Run the migration in Supabase (paste SQL into Supabase SQL editor or push via CLI)

## 2. Webhook — email-based activation path

- [x] 2.1 In `mobiledev-web/api/stripe-webhook.js`, inside the `checkout.session.completed` handler, after the existing `!userId` early return, add a branch: if `!userId` AND `session.customer_details?.email` exists → upsert into `stripe_pending_activations` and return 200
- [x] 2.2 Pass the session `mode` through to determine plan (`mode === 'subscription'` → `'monthly'`, else → `'lifetime'`)

## 3. useProfile — claim on load

- [x] 3.1 In `useProfile.load()`, after the profile is fetched/created, call the `claim_pending_activation` RPC with the user's `id` and email (from `supabase.auth.getUser()`)
- [x] 3.2 If the RPC returns a non-null plan, update local state: `setProfile(p => ({ ...p, plan: claimedPlan }))`

## 4. PaymentSuccess — unsigned user copy

- [x] 4.1 In `PaymentSuccess.jsx`, change the `noSession` render: replace the generic "Log in to view your plan" with "Your payment was received — sign up or log in to activate your plan"
- [x] 4.2 Change the CTA label from "Log in" to "Sign up / Log in"

## 5. Demo → pricing handoff

- [x] 5.1 In `LandingPage.jsx` (or wherever the demo upgrade modal "Create free account" button fires `onDemoSignUp`), set `localStorage.setItem("humble-ui-show-pricing", "true")` before calling `onDemoSignUp()`
- [x] 5.2 In `ComplexGenerator.jsx`, add a `useEffect` that runs when `profile` first loads: if `localStorage.getItem("humble-ui-show-pricing") === "true"` → `localStorage.removeItem(...)` → if `!isPaid` → `setShowUpgradeModal(true)`

## 6. Contact form CORS fix

- [x] 6.1 In `supabase/functions/send-contact/index.ts`, add `'https://humble-ui.com'` to the CORS allowed origins array — already present, no change needed

## 7. Verification

- [ ] 7.1 Contact form: submit from a browser pointed at humble-ui.com — confirm no CORS error and message is received
- [ ] 7.2 Unsigned payment: click pricing button on landing page as a logged-out user — confirm redirect to Stripe (not sign-up modal)
- [ ] 7.3 Unsigned payment: complete a Stripe test checkout — confirm row appears in `stripe_pending_activations`
- [ ] 7.4 Claim flow: sign up with the same email after test payment — confirm plan is applied and pending row is deleted
- [ ] 7.5 Demo handoff: complete demo → "Create free account" → sign up — confirm upgrade modal opens automatically
