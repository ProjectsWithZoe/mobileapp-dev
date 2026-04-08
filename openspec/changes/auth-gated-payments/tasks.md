## 1. App.jsx — pending plan state

- [x] 1.1 Add `const [pendingPlan, setPendingPlan] = useState(null)` to `App`

## 2. App.jsx — Free Demo button

- [x] 2.1 Change the `onDemo` prop passed to `LandingPage` from `() => setIsDemoMode(true)` to `() => openAuth('signup')`

## 3. App.jsx — auth-gated onSubscribe

- [x] 3.1 Update the `onSubscribe` handler: if `!user`, call `setPendingPlan(plan)` then `openAuth('signup')` and return early
- [x] 3.2 Ensure the existing signed-in path (`getStripeLink(plan, user)` → redirect) is unchanged for authenticated users

## 4. App.jsx — fulfil pending plan after auth

- [x] 4.1 Add a `useEffect` that watches `[user, pendingPlan]`: when both are truthy, call `getStripeLink(pendingPlan, user)`, clear `pendingPlan` with `setPendingPlan(null)`, and redirect if a link is returned

## 5. Verification

- [ ] 5.1 Click "Free Demo" as a logged-out user — confirm sign-up modal opens (not demo mode)
- [ ] 5.2 Click "Start Monthly Plan" as a logged-out user — confirm sign-up modal opens
- [ ] 5.3 Complete sign-up after clicking a pricing button — confirm automatic redirect to Stripe with the correct plan
- [ ] 5.4 Click a pricing button as a logged-in user — confirm immediate Stripe redirect (no modal)
- [ ] 5.5 Dismiss the auth modal after clicking a pricing button — confirm no redirect occurs
