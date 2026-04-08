## ADDED Requirements

### Requirement: Stripe redirect fires immediately after OTP is sent
When an unsigned user submits the sign-up form while a pending plan is stored, the system SHALL redirect the user to the Stripe payment link as soon as the OTP email is dispatched — without waiting for the user to click the magic link.

#### Scenario: Unsigned user submits sign-up email with a pending plan
- **WHEN** `pendingPlan` is set AND the user submits their email in the AuthModal
- **THEN** the OTP is sent, the modal transitions to the sent screen, AND the browser navigates to the Stripe payment link for the pending plan with `prefilled_email` set to the submitted email

#### Scenario: Stripe link is built without client_reference_id
- **WHEN** the redirect is triggered at OTP-sent time (user is not yet authenticated)
- **THEN** the Stripe URL SHALL contain `prefilled_email=<email>` and SHALL NOT contain `client_reference_id`

#### Scenario: No pending plan when OTP is sent
- **WHEN** the user signs up without a pending plan (e.g. plain sign-up, not from pricing)
- **THEN** no Stripe redirect occurs; the modal shows the standard "Check your inbox" screen

### Requirement: Sent screen notifies user to check email for account activation
When the user is redirected to Stripe after OTP is sent, the AuthModal sent screen SHALL display a message informing the user that they must also click the link in their email to activate their Humble UI account.

#### Scenario: Sent screen with a pending plan
- **WHEN** the OTP is sent and `hasPendingPlan` is true
- **THEN** the sent screen SHALL display copy indicating the payment page is opening AND that the user must click their email link to complete account activation

#### Scenario: Sent screen without a pending plan
- **WHEN** the OTP is sent and `hasPendingPlan` is false
- **THEN** the sent screen SHALL display the standard "Check your inbox" copy with no mention of Stripe or payment

### Requirement: onOtpSent callback is invoked with the submitted email
The AuthModal SHALL accept an optional `onOtpSent(email)` prop and call it after the OTP is successfully dispatched, passing the email the user entered.

#### Scenario: Callback is provided
- **WHEN** `onOtpSent` prop is passed to AuthModal AND the OTP is sent successfully
- **THEN** `onOtpSent` SHALL be called with the user's submitted email as its argument

#### Scenario: Callback is not provided
- **WHEN** `onOtpSent` prop is not passed to AuthModal
- **THEN** the modal SHALL behave identically to its current behavior with no errors
