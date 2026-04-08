## 1. Routing

- [x] 1.1 Add `/success` route to `src/App.jsx` pointing to the new `PaymentSuccess` component
- [x] 1.2 Verify Vercel SPA rewrite in `vercel.json` covers `/success` (i.e. `/*` → `/index.html` already present)

## 2. PaymentSuccess Component

- [x] 2.1 Create `src/components/PaymentSuccess.jsx`
- [x] 2.2 On mount, fetch `user_profiles` row for the current Supabase user (`plan`, `stripe_customer_id`)
- [x] 2.3 Implement polling loop: re-fetch up to 5× at 1.5s intervals while `plan === 'free'`; cancel on unmount
- [x] 2.4 Render loading spinner/skeleton while fetch or polling is in progress
- [x] 2.5 Render plan confirmation copy for `monthly` (show "Monthly Plan · renews automatically")
- [x] 2.6 Render plan confirmation copy for `lifetime` (show "Lifetime Access · one-time purchase")
- [x] 2.7 Render "still processing" fallback with a manual refresh link when all retries exhausted and plan still `free`
- [x] 2.8 Render "Log in to view your plan" prompt + login link when no Supabase session is present
- [x] 2.9 Add primary CTA button ("Go to app") that navigates to `/`

## 3. Stripe Dashboard Configuration

- [ ] 3.1 In Stripe Dashboard, open the Monthly Payment Link → Confirmation page → set redirect URL to `https://humble-ui.com/success`
- [ ] 3.2 In Stripe Dashboard, open the Lifetime Payment Link → same redirect URL
- [ ] 3.3 Confirm test-mode checkout redirects correctly to `/success`

## 4. Verification

- [ ] 4.1 Complete a test checkout (monthly) in Stripe test mode; confirm plan shows as "Monthly" on the success page
- [ ] 4.2 Complete a test checkout (lifetime) in Stripe test mode; confirm plan shows as "Lifetime"
- [ ] 4.3 Simulate webhook lag: verify polling kicks in and eventually resolves
- [ ] 4.4 Test unauthenticated visit to `/success`; confirm login prompt is shown
- [ ] 4.5 Test direct navigation to `https://humble-ui.com/success`; confirm no 404
