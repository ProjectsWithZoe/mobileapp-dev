## Why

There is no visibility into how users interact with Humble-UI — which pages they visit, where they drop off, or how many reach the pricing section. Adding Vercel Analytics provides first-party, privacy-friendly page-view and custom event tracking with zero configuration on the hosting side.

## What Changes

- Install `@vercel/analytics` package
- Mount the `<Analytics />` component in `App.jsx` so page views are tracked automatically
- Add custom `track()` calls at key conversion points: pricing button clicks, demo button clicks, and successful payment redirects

## Capabilities

### New Capabilities

- `page-view-tracking`: Automatic page view reporting via the Vercel Analytics script injected by `<Analytics />`
- `conversion-event-tracking`: Custom events fired at high-value user actions (pricing CTA clicks, demo opens, Stripe redirects)

### Modified Capabilities

<!-- No existing spec-level requirements are changing -->

## Impact

- `mobiledev-web/package.json` — add `@vercel/analytics` dependency
- `mobiledev-web/src/App.jsx` — mount `<Analytics />` once at the app root
- `mobiledev-web/src/components/LandingPage.jsx` — `track()` calls on pricing and demo buttons
- No backend changes, no new env vars required — Vercel injects the analytics endpoint automatically on deployment
