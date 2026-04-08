## MODIFIED Requirements

### Requirement: Generate button is disabled while profile loads
Authenticated users SHALL NOT be able to trigger prompt generation while `useProfile.loading` is true.

#### Scenario: Profile still loading on mount
- **WHEN** a logged-in user visits the app and `useProfile.loading === true`
- **THEN** the generate button SHALL be disabled (not clickable)

#### Scenario: Profile finishes loading — limit not hit
- **WHEN** `useProfile.loading` transitions to `false` and `withinLimit === true`
- **THEN** the generate button SHALL become enabled (if `canGenerate` is also true)

#### Scenario: Profile finishes loading — limit already hit
- **WHEN** `useProfile.loading` transitions to `false` and `withinLimit === false`
- **THEN** the generate button SHALL show "🔒 Upgrade to Generate More" and remain clickable (to open the upgrade modal)

---

### Requirement: generatePrompt guards against null profile for authenticated users
The `generatePrompt` function SHALL return early without generating if the user is authenticated but `profile` is null.

#### Scenario: Race condition — generate called before profile resolves
- **WHEN** `user` is set but `profile === null`
- **THEN** `generatePrompt` SHALL return immediately without generating a prompt or showing the upgrade modal

---

### Requirement: Free users are limited to 1 generation
A logged-in user on the `free` plan SHALL be blocked from generating a second prompt.

#### Scenario: First generation for a new free user
- **WHEN** a free user with `generation_count === 0` clicks Generate with a valid app idea
- **THEN** the prompt SHALL be generated and `generation_count` incremented to 1

#### Scenario: Second generation attempt
- **WHEN** a free user with `generation_count >= 1` clicks the generate button
- **THEN** the upgrade modal SHALL appear immediately
- **THEN** no prompt SHALL be generated

---

### Requirement: Orphaned payment banner effect is removed
The `?payment=success` query-param polling effect in `ComplexGenerator` SHALL be removed.

#### Scenario: User returns from Stripe redirect (old path — no longer used)
- **WHEN** the app URL contains `?payment=success`
- **THEN** no polling loop SHALL start (the effect is gone; users now land on `/success` instead)

#### Scenario: User returns from /success page via "Go to app"
- **WHEN** user navigates from `/success` to `/` via the CTA button
- **THEN** `useProfile` re-fetches the updated plan on mount via the normal load path
- **THEN** the upgraded plan is reflected without any additional polling
