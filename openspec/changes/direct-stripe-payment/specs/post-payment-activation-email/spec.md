## ADDED Requirements

### Requirement: Webhook sends activation magic link after guest checkout
After a successful Stripe `checkout.session.completed` event where no `client_reference_id` is present (guest checkout), the webhook SHALL send a Supabase magic link to the payer's email address using `supabase.auth.admin.generateLink` with `type: 'magiclink'` and a `redirectTo` pointing to the app's root URL. The call SHALL be made after successfully upserting the `stripe_pending_activations` record.

#### Scenario: Guest pays and receives activation email
- **WHEN** a `checkout.session.completed` webhook fires with no `client_reference_id` and a valid `customer_details.email`
- **THEN** the webhook upserts a `stripe_pending_activations` record for that email
- **THEN** the webhook calls `supabase.auth.admin.generateLink` with `type: 'magiclink'`, the payer's email, and `redirectTo` set to the app URL
- **THEN** Supabase sends a magic link email to the payer's address
- **THEN** the webhook responds `200 { received: true }`

#### Scenario: Magic link email fails but pending activation is saved
- **WHEN** `admin.generateLink` throws an error after a successful `stripe_pending_activations` upsert
- **THEN** the webhook logs the error with the email address
- **THEN** the webhook still responds `200 { received: true }` (so Stripe does not retry)
- **THEN** the pending activation record remains in the database for manual recovery

#### Scenario: Already-registered user pays as guest
- **WHEN** a guest checkout completes with an email that already has a Supabase account
- **THEN** `admin.generateLink` sends a sign-in magic link to that email (Supabase behavior)
- **THEN** clicking the link signs the user in and `claim_pending_activation` applies the plan

### Requirement: Success page shows activation email copy for guest users
The `PaymentSuccess` component's `noSession` branch SHALL display copy that informs the user an activation link has been sent to their checkout email, replacing the previous "sign up or log in" call-to-action.

#### Scenario: Guest user lands on success page
- **WHEN** the user lands on `/success` without an active Supabase session
- **THEN** the page SHALL display a heading that says the payment was received
- **THEN** the page SHALL tell the user to check their email for an activation link
- **THEN** the page SHALL NOT show a "Sign up" or "Log in" button as the primary action

#### Scenario: Activation email copy is specific and actionable
- **WHEN** the no-session success screen is rendered
- **THEN** the copy SHALL reference "the email you used at checkout"
- **THEN** the copy SHALL instruct the user to click the link to create their account
