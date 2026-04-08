## MODIFIED Requirements

### Requirement: Unsigned users can initiate payment from landing page
An unsigned user clicking a pricing button on the landing page SHALL be redirected directly to Stripe without requiring sign-up first.

#### Scenario: Unsigned user clicks Monthly pricing button
- **WHEN** a user with no active session clicks the Monthly pricing button on the landing page
- **THEN** `getStripeLink('monthly', null)` is called
- **THEN** the user is redirected to the Stripe Payment Link URL
- **THEN** no sign-up modal is shown

#### Scenario: Unsigned user clicks Lifetime pricing button
- **WHEN** a user with no active session clicks the Lifetime pricing button on the landing page
- **THEN** `getStripeLink('lifetime', null)` is called
- **THEN** the user is redirected to the Stripe Payment Link URL

#### Scenario: Stripe env vars not configured
- **WHEN** `VITE_STRIPE_MONTHLY_LINK` or `VITE_STRIPE_LIFETIME_LINK` is not set
- **THEN** `getStripeLink` returns null
- **THEN** the user is shown the sign-up modal as a fallback (existing behaviour)

---

### Requirement: Post-payment /success page handles unsigned users
The `/success` page SHALL show a prompt to sign up or log in when no Supabase session is present, so the user can claim their paid plan.

#### Scenario: User arrives at /success with no session
- **WHEN** a user who paid as a guest lands on `/success`
- **THEN** the page SHALL display a message explaining their plan is ready
- **THEN** a "Sign up / Log in" CTA SHALL be shown directing to the auth flow
- **THEN** the page SHALL NOT show "Log in to view your plan" (the current generic copy) — it SHALL mention their payment was received

#### Scenario: User signs in after arriving at /success
- **WHEN** the user clicks the auth CTA from `/success` and completes sign-up/login
- **THEN** `useProfile.load()` claims the pending activation automatically
- **THEN** the user sees their correct paid plan in the app
