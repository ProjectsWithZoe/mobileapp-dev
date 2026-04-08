## Context

The app uses React (Vite) with React Router for client-side navigation. Stripe Payment Links handle checkout; the `stripe-webhook` serverless function receives `checkout.session.completed` and writes the user's new `plan` (`monthly` or `lifetime`) to `user_profiles` in Supabase. The Stripe Payment Link success URL is configurable in the Stripe Dashboard and will be set to `https://humble-ui.com/success`.

After redirect, the page has access to the logged-in Supabase session (auth is already wired in the app) and can fetch the updated plan directly from `user_profiles`.

## Goals / Non-Goals

**Goals:**
- Render a confirmation page at `/success` that clearly communicates the purchase succeeded
- Show the correct plan name (`Monthly` or `Lifetime`) by reading from Supabase
- Handle the brief delay between redirect and webhook write (polling or optimistic display)
- Guide the user back into the app with a clear CTA

**Non-Goals:**
- Re-implementing payment logic or re-verifying the transaction client-side
- Sending confirmation emails (handled separately via Stripe or Supabase triggers)
- Supporting unauthenticated success pages

## Decisions

**1. Read plan from Supabase, not Stripe query params**

The webhook already writes `plan` to `user_profiles`. Reading from Supabase means the UI reflects ground truth (same source the rest of the app uses). Stripe query params (session ID) would require an additional server-side lookup and expose session IDs in URLs.

**2. Poll with short timeout to handle webhook lag**

There is a ~1–3s gap between the Stripe redirect and the webhook updating Supabase. The page will re-fetch the user profile up to 5 times (every 1.5s) until `plan` is not `'free'`, then stop. If still `'free'` after retries, show a "still processing" fallback rather than an error — the webhook will eventually fire.

Alternatives considered: Stripe's `?session_id=` + server-side verification — adds complexity and a new API route. Supabase Realtime subscription — heavier dependency for a one-shot page.

**3. Reuse existing auth / Supabase client**

`src/lib/supabase.js` (or equivalent) already exports a configured client used throughout the app. The success page will import it directly — no new client setup.

**4. New component, new route — no changes to existing components**

`PaymentSuccess.jsx` is self-contained. `App.jsx` gets one new `<Route path="/success">` entry. This minimises blast radius.

## Risks / Trade-offs

- **Webhook fires before page loads (rare)**: Plan already updated → page shows correct plan on first fetch. No issue.
- **Webhook delayed > 8s**: Polling exhausted → show "Your plan is being activated, check back shortly" with a refresh link. Acceptable UX for an edge case.
- **User not logged in on redirect**: Supabase session may not be present if the user was checked out as a guest or on a different device. Show a "Log in to see your plan" prompt.
- **React Router not matching `/success`**: Vercel's `vercel.json` already has SPA rewrites (`/*` → `/index.html`), so deep-link routing is covered.

## Migration Plan

1. Deploy `PaymentSuccess.jsx` + route change.
2. In Stripe Dashboard, update each Payment Link's "Confirmation page" → "Don't show confirmation page" → Redirect to `https://humble-ui.com/success`.
3. Test with Stripe test mode: complete a checkout, verify redirect lands on the page and shows the correct plan.
4. Rollback: revert the Stripe Dashboard redirect URL — no code rollback needed since the route is additive.

## Open Questions

- Should the success page differ visually for `monthly` vs `lifetime` (e.g., show next billing date for monthly)? Assumed yes — tasks reflect this.
- Is there an existing design system / component library in use? Current components use plain JSX + CSS. Tasks will follow the same pattern.
