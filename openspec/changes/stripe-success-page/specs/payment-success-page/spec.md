## ADDED Requirements

### Requirement: Route exists at /success
The app SHALL render the `PaymentSuccess` page when the user navigates to `/success`.

#### Scenario: Direct navigation to /success
- **WHEN** the user visits `https://humble-ui.com/success`
- **THEN** the PaymentSuccess page component is rendered (not a 404)

---

### Requirement: Page confirms purchase and shows plan
The page SHALL display a success confirmation message and the user's current plan (`Monthly` or `Lifetime`).

#### Scenario: Plan is already updated when page loads
- **WHEN** the webhook has already updated `user_profiles.plan` before the page first fetches
- **THEN** the page displays "Payment successful" and the plan name without delay

#### Scenario: Plan is still "free" on first fetch (webhook lag)
- **WHEN** the user's plan is still `free` on initial load
- **THEN** the page SHALL poll Supabase up to 5 times (1.5s interval) until plan changes
- **THEN** once plan updates, the confirmed plan name is displayed

#### Scenario: Plan remains "free" after all retries
- **WHEN** all 5 polling attempts return `plan: 'free'`
- **THEN** the page SHALL display a "still processing" message with a manual refresh link
- **THEN** the page SHALL NOT show an error or failure state

---

### Requirement: Differentiate monthly vs lifetime display
The page SHALL show plan-specific copy for `monthly` and `lifetime` tiers.

#### Scenario: Monthly plan confirmed
- **WHEN** `user_profiles.plan === 'monthly'`
- **THEN** the page SHALL display the plan name "Monthly" and mention recurring billing

#### Scenario: Lifetime plan confirmed
- **WHEN** `user_profiles.plan === 'lifetime'`
- **THEN** the page SHALL display "Lifetime" and indicate it is a one-time purchase with no renewal

---

### Requirement: CTA returns user to the app
The page SHALL include a primary call-to-action button that navigates back into the app.

#### Scenario: User clicks CTA
- **WHEN** the user clicks the "Go to app" (or equivalent) button
- **THEN** the user is navigated to the app's main authenticated route (e.g., `/`)

---

### Requirement: Unauthenticated user is prompted to log in
The page SHALL handle the case where no Supabase session is present.

#### Scenario: No active session on /success
- **WHEN** the user arrives at `/success` without an active Supabase auth session
- **THEN** the page SHALL display a prompt to log in to view their plan
- **THEN** a "Log in" link SHALL be shown directing to the auth flow

---

### Requirement: Loading state during plan fetch
The page SHALL display a loading indicator while the Supabase fetch (or polling) is in progress.

#### Scenario: First fetch in flight
- **WHEN** the component mounts and the Supabase query has not yet resolved
- **THEN** a loading spinner or skeleton is shown in place of the plan confirmation
