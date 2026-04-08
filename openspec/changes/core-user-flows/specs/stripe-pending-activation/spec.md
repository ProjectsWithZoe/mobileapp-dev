## ADDED Requirements

### Requirement: Webhook stores pending activation by email when no client_reference_id
When a `checkout.session.completed` event has no `client_reference_id`, the webhook SHALL store the payment against the customer email for later claim.

#### Scenario: Unsigned user completes Stripe payment
- **WHEN** `checkout.session.completed` fires and `session.client_reference_id` is null/undefined
- **THEN** the webhook SHALL read `session.customer_details.email` (lowercased)
- **THEN** upsert a row into `stripe_pending_activations(email, plan, stripe_customer_id)`
- **THEN** return HTTP 200

#### Scenario: Duplicate payment for same email
- **WHEN** a second `checkout.session.completed` arrives for the same email without a client_reference_id
- **THEN** the existing row SHALL be overwritten (upsert) with the new plan and stripe_customer_id
- **THEN** return HTTP 200

#### Scenario: session.customer_details.email is missing
- **WHEN** the event has no client_reference_id AND no customer email
- **THEN** the webhook SHALL log a warning and return HTTP 200 (do not 400 — Stripe will not retry)

---

### Requirement: Plan is claimed automatically on profile load
When a user's profile is loaded and a pending activation exists for their email, the plan SHALL be applied and the pending record consumed.

#### Scenario: User signs up after paying as guest
- **WHEN** `useProfile.load()` runs for a user whose auth email matches a `stripe_pending_activations` row
- **AND** the user's current plan is `free`
- **THEN** `user_profiles.plan` and `stripe_customer_id` SHALL be updated to match the pending activation
- **THEN** the `stripe_pending_activations` row SHALL be deleted
- **THEN** `profile.plan` in the hook state SHALL reflect the activated plan immediately (optimistic update)

#### Scenario: User already on paid plan
- **WHEN** `useProfile.load()` runs and `user_profiles.plan` is already `monthly` or `lifetime`
- **THEN** any pending activation SHALL be ignored (not overwrite a higher plan)

#### Scenario: No pending activation for email
- **WHEN** `useProfile.load()` finds no matching row in `stripe_pending_activations`
- **THEN** normal profile load proceeds with no change

---

### Requirement: claim_pending_activation RPC
A Supabase security-definer RPC `claim_pending_activation(p_user_id uuid, p_email text)` SHALL perform the claim atomically without exposing the `stripe_pending_activations` table to direct client access.

#### Scenario: RPC called for user with pending activation
- **WHEN** RPC is called with a valid user_id and email that matches a pending activation row
- **THEN** RPC updates `user_profiles` plan and `stripe_customer_id`
- **THEN** RPC deletes the `stripe_pending_activations` row
- **THEN** RPC returns the updated plan string

#### Scenario: RPC called with no matching pending activation
- **WHEN** RPC is called but no row matches the email
- **THEN** RPC returns null (no-op)
