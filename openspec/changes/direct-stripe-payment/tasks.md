## 1. Remove auth gate from App.jsx

- [x] 1.1 Delete the `pendingPlan` state and `setPendingPlan` calls from `App.jsx`
- [x] 1.2 Delete the `handleOtpSent` function from `App.jsx`
- [x] 1.3 Delete the `useEffect([user, pendingPlan])` that fulfilled pending Stripe redirects
- [x] 1.4 Update `onSubscribe` prop passed to `LandingPage` so it calls `getStripeLink(plan, user)` and sets `window.location.href` directly for all users (signed-in and guest)
- [x] 1.5 Remove `onOtpSent` and `hasPendingPlan` props from both `<AuthModal>` usages in `App.jsx` (props no longer needed)

## 2. Remove PricingModal confirmation step from LandingPage.jsx

- [x] 2.1 Remove the `modalPlan` state and `setModalPlan` calls from `LandingPage`
- [x] 2.2 Remove the `PricingModal` component rendering from `LandingPage`
- [x] 2.3 Update pricing buttons to call `onSubscribe?.(plan)` directly on click instead of `setModalPlan(plan)`
- [x] 2.4 Remove the `PricingModal` component definition (or its import) if it exists in `LandingPage.jsx`

## 3. Update webhook to send activation email

- [x] 3.1 In `api/stripe-webhook.js` Path B, after the successful `stripe_pending_activations` upsert, add a call to `supabase.auth.admin.generateLink({ type: 'magiclink', email, options: { redirectTo: process.env.APP_URL ?? 'https://humble-ui.com' } })`
- [x] 3.2 Wrap the `admin.generateLink` call in try/catch: log the error but still return `200 { received: true }` so Stripe does not retry on email failure
- [x] 3.3 Add `APP_URL` to the list of required env vars in the comment at the top of `stripe-webhook.js`

## 4. Update success page copy for guest users

- [x] 4.1 In `PaymentSuccess.jsx`, update the `noSession` branch heading to reflect that an activation email has been sent (e.g. "Check your email")
- [x] 4.2 Update the `noSession` branch body copy to say "We sent an activation link to the email you used at checkout. Click it to create your account and start building."
- [x] 4.3 Replace or remove the "Sign up / Log in" button in the `noSession` branch — it is no longer the primary action (optionally keep a small secondary link)

## 5. Environment variable

- [x] 5.1 Add `APP_URL=https://humble-ui.com` (or the correct production domain) as a non-`VITE_` env var in the Vercel project dashboard under all environments (Production, Preview, Development)
