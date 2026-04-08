## ADDED Requirements

### Requirement: Analytics component mounted at app root
The app SHALL render the `<Analytics />` component from `@vercel/analytics/react` exactly once, as a sibling to the top-level content in `App.jsx`, so that Vercel Analytics is initialised for every render path.

#### Scenario: Analytics component is present in production build
- **WHEN** the app is deployed to Vercel and a user visits any page
- **THEN** the Vercel Analytics script SHALL be injected into the page
- **THEN** a page view event SHALL be recorded in the Vercel Analytics dashboard

#### Scenario: Analytics is a no-op in local development
- **WHEN** the app is run locally via `vite dev`
- **THEN** the `<Analytics />` component SHALL render without errors
- **THEN** no network requests to Vercel Analytics endpoints SHALL be made (Vercel silently no-ops outside its infrastructure)
