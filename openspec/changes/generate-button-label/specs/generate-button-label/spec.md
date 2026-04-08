## MODIFIED Requirements

### Requirement: Generate button shows "Generate New Prompt" after first generation
After a prompt has been generated, the generate button SHALL display "→ Generate New Prompt".

#### Scenario: Button label before any generation
- **WHEN** `promptGenerated === false`
- **THEN** the button SHALL display "→ Generate Prompt"

#### Scenario: Button label after a prompt has been generated
- **WHEN** `promptGenerated === true` AND the user is within their generation limit
- **THEN** the button SHALL display "→ Generate New Prompt"

#### Scenario: Button label when limit is exhausted
- **WHEN** `withinLimit === false`
- **THEN** the button SHALL display "🔒 Upgrade to Generate More" (unchanged)
