## MODIFIED Requirements

### Requirement: Contact form works from humble-ui.com
The `send-contact` Edge Function SHALL accept requests originating from `https://humble-ui.com`.

#### Scenario: Request from humble-ui.com
- **WHEN** a POST request arrives at the Edge Function with `Origin: https://humble-ui.com`
- **THEN** the response SHALL include `Access-Control-Allow-Origin: https://humble-ui.com`
- **THEN** the request SHALL be processed normally (not rejected with 403)

#### Scenario: Preflight from humble-ui.com
- **WHEN** an OPTIONS preflight arrives with `Origin: https://humble-ui.com`
- **THEN** the function SHALL return 200 with appropriate CORS headers

#### Scenario: Request from unlisted origin
- **WHEN** a request arrives from an origin not in the allowlist
- **THEN** the function SHALL return 403 (existing behaviour preserved)
