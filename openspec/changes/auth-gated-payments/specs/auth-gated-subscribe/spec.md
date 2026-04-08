## MODIFIED Requirements

### Requirement: Unsigned user clicking a pricing button is gated to sign-up
An unauthenticated user clicking any pricing button on the landing page SHALL be prompted to sign up before being redirected to Stripe.

#### Scenario: Unsigned user clicks Monthly pricing button
- **WHEN** a user with no active session clicks the "Start Monthly Plan" button
- **THEN** the intended plan (`monthly`) SHALL be stored as a pending plan
- **THEN** the sign-up auth modal SHALL open
- **THEN** the user SHALL NOT be redirected to Stripe at this point

#### Scenario: Unsigned user clicks Lifetime pricing button
- **WHEN** a user with no active session clicks the "Get Lifetime Access" button
- **THEN** the intended plan (`lifetime`) SHALL be stored as a pending plan
- **THEN** the sign-up auth modal SHALL open
- **THEN** the user SHALL NOT be redirected to Stripe at this point

---

### Requirement: Pending plan is fulfilled automatically after sign-in
After a user authenticates (sign-up or sign-in), any pending plan stored from a prior pricing button click SHALL trigger an automatic Stripe redirect.

#### Scenario: User signs up after clicking a pricing button
- **WHEN** the user completes sign-up and `user` becomes non-null
- **AND** a pending plan is stored
- **THEN** `getStripeLink(pendingPlan, user)` SHALL be called with the authenticated user
- **THEN** the user SHALL be redirected to the Stripe Payment Link for that plan
- **THEN** the pending plan SHALL be cleared

#### Scenario: User signs in (existing account) after clicking a pricing button
- **WHEN** the user completes sign-in and `user` becomes non-null
- **AND** a pending plan is stored
- **THEN** the same Stripe redirect SHALL occur as for sign-up

#### Scenario: Pending plan but Stripe env var is not configured
- **WHEN** `getStripeLink` returns null (missing env var)
- **THEN** the pending plan SHALL be cleared
- **THEN** the user SHALL land in the signed-in app with no redirect (graceful degradation)

#### Scenario: User dismisses auth modal — pending plan is not fulfilled
- **WHEN** the user closes the auth modal without completing auth
- **THEN** the pending plan SHALL remain stored in state until the modal is dismissed and reset
- **THEN** on the next page load the pending plan is gone (state is not persisted)

---

### Requirement: Signed-in user clicking a pricing button goes directly to Stripe
An authenticated user clicking a pricing button SHALL be redirected to Stripe immediately without being shown the auth modal.

#### Scenario: Signed-in user clicks any pricing button
- **WHEN** a user with an active session clicks a pricing button
- **THEN** `getStripeLink(plan, user)` SHALL be called
- **THEN** the user SHALL be redirected to Stripe immediately
