## MODIFIED Requirements

### Requirement: Free Demo button opens sign-up modal
Clicking the "Free Demo" button on the landing page SHALL open the sign-up auth modal instead of entering anonymous demo mode.

#### Scenario: Unauthenticated user clicks Free Demo
- **WHEN** an unsigned user clicks the "Free Demo" button on the landing page
- **THEN** the sign-up auth modal SHALL open (mode: `signup`)
- **THEN** the app SHALL NOT enter demo mode (`isDemoMode` SHALL remain false)

#### Scenario: User completes sign-up after clicking Free Demo
- **WHEN** the user completes sign-up from the auth modal
- **THEN** the user SHALL be taken to the signed-in prompt generator
- **THEN** the user SHALL have 1 free generation available (standard free plan behaviour)

#### Scenario: User dismisses the auth modal after clicking Free Demo
- **WHEN** the user closes the auth modal without completing sign-up
- **THEN** the landing page SHALL be shown again
- **THEN** no demo mode is entered
