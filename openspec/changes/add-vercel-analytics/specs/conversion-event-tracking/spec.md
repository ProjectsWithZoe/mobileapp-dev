## ADDED Requirements

### Requirement: Pricing CTA clicks are tracked
The app SHALL call `track('pricing_cta_click', { plan })` from `@vercel/analytics` whenever a user clicks a pricing button that triggers a Stripe redirect, where `plan` is either `'monthly'` or `'lifetime'`.

#### Scenario: User clicks lifetime pricing button
- **WHEN** a user clicks any "Get Lifetime Access" or "Get started today" pricing button
- **THEN** `track('pricing_cta_click', { plan: 'lifetime' })` SHALL be called before the Stripe redirect

#### Scenario: User clicks monthly pricing button
- **WHEN** a user clicks any "Start Monthly Plan" or "Monthly" pricing button
- **THEN** `track('pricing_cta_click', { plan: 'monthly' })` SHALL be called before the Stripe redirect

### Requirement: Demo opens are tracked
The app SHALL call `track('demo_open')` whenever a user opens the free demo (clicks "Free Demo" in the nav or any demo CTA that triggers `openAuth('signup')`).

#### Scenario: User clicks Free Demo button
- **WHEN** a user clicks the "Free Demo" button in the landing page nav
- **THEN** `track('demo_open')` SHALL be called

### Requirement: Stripe redirects are tracked
The app SHALL call `track('stripe_redirect', { plan })` in `App.jsx`'s `onSubscribe` handler immediately before `window.location.href` is set to the Stripe URL.

#### Scenario: onSubscribe redirects to Stripe
- **WHEN** `onSubscribe` is called with a valid plan and `getStripeLink` returns a URL
- **THEN** `track('stripe_redirect', { plan })` SHALL be called
- **THEN** the browser SHALL navigate to the Stripe URL
