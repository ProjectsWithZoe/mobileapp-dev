## 1. Update AuthModal

- [x] 1.1 Add optional `onOtpSent` prop to `AuthModal`; call `onOtpSent(email)` after `setSent(true)` in `handleSubmit`
- [x] 1.2 Add optional `hasPendingPlan` boolean prop to `AuthModal`
- [x] 1.3 On the sent screen, show payment-specific copy when `hasPendingPlan` is true: tell the user the payment page is opening and they must click their email link to activate their account

## 2. Update App.jsx

- [x] 2.1 Pass `onOtpSent` to `AuthModal`: when called, if `pendingPlan` is set build the Stripe link with `prefilled_email=<email>` (no `client_reference_id`) and redirect via `window.location.href`
- [x] 2.2 Pass `hasPendingPlan={!!pendingPlan}` to `AuthModal` so the sent screen shows the correct copy
- [x] 2.3 Clear `pendingPlan` after the redirect so the existing `useEffect([user, pendingPlan])` does not double-redirect when the user returns and signs in
