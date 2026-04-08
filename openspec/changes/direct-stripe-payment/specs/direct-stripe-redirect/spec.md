## ADDED Requirements

### Requirement: Pricing buttons redirect directly to Stripe without auth gate
The landing page pricing buttons SHALL redirect the user directly to the Stripe checkout URL when clicked, without requiring the user to sign up or sign in first. The `onSubscribe` handler in `App.jsx` SHALL NOT open the `AuthModal` for unsigned users.

#### Scenario: Unsigned user clicks a pricing button
- **WHEN** a user who is not signed in clicks a pricing button on the landing page
- **THEN** the browser SHALL navigate directly to the Stripe checkout URL for that plan
- **THEN** the Stripe URL SHALL NOT include `client_reference_id` (user is not authenticated)
- **THEN** the Stripe URL SHALL NOT include `prefilled_email` (no email known yet)
- **THEN** no `AuthModal` SHALL be shown

#### Scenario: Signed-in user clicks a pricing button
- **WHEN** a user who is already signed in clicks a pricing button
- **THEN** the browser SHALL navigate to the Stripe checkout URL for that plan
- **THEN** the Stripe URL SHALL include `client_reference_id` set to the user's Supabase ID
- **THEN** the Stripe URL SHALL include `prefilled_email` set to the user's email

#### Scenario: PricingModal confirmation step is removed
- **WHEN** a user clicks a plan button on the landing page
- **THEN** the browser SHALL navigate to Stripe immediately
- **THEN** no intermediate confirmation modal SHALL be presented before the redirect

### Requirement: `pendingPlan` state and auth-gate logic is removed from App.jsx
The `pendingPlan` state, the `handleOtpSent` callback, and the associated `useEffect` that fulfilled pending plans after sign-in SHALL be removed from `App.jsx`, as they are no longer needed when users go directly to Stripe.

#### Scenario: App.jsx no longer gates Stripe redirect behind auth
- **WHEN** `onSubscribe` is called with a plan
- **THEN** `getStripeLink` is called immediately with the current user (or null)
- **THEN** `window.location.href` is set to the resulting Stripe URL
- **THEN** no `setPendingPlan` or `openAuth` call is made

### Requirement: `getStripeLink` handles null user gracefully
`getStripeLink(plan, user)` SHALL return a valid Stripe URL when `user` is `null`, omitting the `client_reference_id` and `prefilled_email` params. This enables guest checkout without a signed-in user object.

#### Scenario: Null user produces clean Stripe URL
- **WHEN** `getStripeLink('monthly', null)` is called
- **THEN** the returned URL SHALL be the base Stripe Payment Link URL
- **THEN** the URL SHALL NOT contain `client_reference_id` query param
- **THEN** the URL SHALL NOT contain `prefilled_email` query param

#### Scenario: User object produces enriched Stripe URL
- **WHEN** `getStripeLink('lifetime', { id: 'uuid-123', email: 'user@example.com' })` is called
- **THEN** the returned URL SHALL include `client_reference_id=uuid-123`
- **THEN** the returned URL SHALL include `prefilled_email=user%40example.com`
