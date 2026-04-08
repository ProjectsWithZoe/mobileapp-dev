## MODIFIED Requirements

### Requirement: Demo sign-up surfaces pricing immediately after auth
After a demo user clicks "Create free account" and completes sign-up, the upgrade pricing modal SHALL open automatically the first time the prompt generator loads.

#### Scenario: User completes sign-up after demo paywall
- **WHEN** the user clicks "Create free account" in the demo upgrade modal
- **THEN** a localStorage flag `"humble-ui-show-pricing"` SHALL be set before the auth modal opens
- **THEN** the auth modal opens for sign-up

#### Scenario: Newly signed-in user loads the prompt generator with the flag set
- **WHEN** `ComplexGenerator` mounts for a signed-in user
- **AND** `localStorage.getItem("humble-ui-show-pricing") === "true"`
- **AND** `profile.plan === 'free'`
- **THEN** `showUpgradeModal` SHALL be set to `true` on profile load
- **THEN** the `"humble-ui-show-pricing"` flag SHALL be removed from localStorage

#### Scenario: Flag is set but user is already paid
- **WHEN** `localStorage.getItem("humble-ui-show-pricing") === "true"`
- **AND** `isPaid === true`
- **THEN** the upgrade modal SHALL NOT open
- **THEN** the flag SHALL still be cleared from localStorage
