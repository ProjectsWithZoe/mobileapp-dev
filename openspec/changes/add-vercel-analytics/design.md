## Context

Humble-UI is a Vite + React SPA deployed on Vercel. There is currently no analytics instrumentation. Vercel Analytics is the natural fit: it requires no third-party account, no cookie banner (privacy-friendly by design), and integrates in two lines for a Vite/React app — install the package and render `<Analytics />`.

## Goals / Non-Goals

**Goals:**
- Automatic page view tracking on every route change (the SPA only has one real "page" but URL hash or pathname changes still matter)
- Custom event tracking at conversion funnel checkpoints: pricing CTA clicks, demo opens, and Stripe redirects
- Zero new env vars or backend work

**Non-Goals:**
- Session recording or heatmaps (not provided by Vercel Analytics)
- User-level identity tracking (Vercel Analytics is aggregate only)
- A/B testing or feature flags (separate concern — use Vercel Flags for that)

## Decisions

### 1. Use `@vercel/analytics` rather than a script tag

**Decision**: Install `@vercel/analytics` and use the `<Analytics />` React component.

**Rationale**: The npm package handles script injection, deduplication, and SPA route-change detection automatically. A raw `<script>` tag would require manual re-firing on navigation and has no TypeScript support for `track()`.

### 2. Mount `<Analytics />` in `App.jsx`, not `index.html`

**Decision**: Render `<Analytics />` as a sibling to the app's main content inside `App.jsx`.

**Rationale**: Keeps analytics co-located with the React tree. The component self-manages its lifecycle and has no visible output.

### 3. Track only high-signal events, not every click

**Decision**: Instrument three events: `pricing_cta_click` (with `plan` property), `demo_open`, and `stripe_redirect` (with `plan` property).

**Rationale**: Too many events dilute signal. These three cover the full conversion funnel: awareness → intent → purchase.

**Alternative considered**: Tracking every button click. Rejected — noisy and harder to analyse.

### 4. Call `track()` in the existing handlers, not via new wrapper components

**Decision**: Add `track()` inline inside the existing `onSubscribe`, `onDemo`, and button `onClick` handlers rather than creating analytics wrapper components.

**Rationale**: The handlers are already the single source of truth for these actions. Wrapping adds indirection with no benefit at this scale.

## Risks / Trade-offs

- **Vercel Analytics only works on Vercel deployments** — `track()` calls are silently no-ops in local dev, which is fine.
  → No mitigation needed; this is by design.

- **Ad blockers suppress the analytics script** — some users won't be tracked.
  → Acceptable; Vercel Analytics is explicitly privacy-first and documents this trade-off.

## Migration Plan

1. `npm install @vercel/analytics` in `mobiledev-web/`
2. Add `<Analytics />` to `App.jsx`
3. Add `track()` calls in `LandingPage.jsx` and `App.jsx`
4. Deploy — analytics appear in Vercel dashboard → Analytics tab automatically
5. Rollback: remove the component and calls, redeploy. No data is written anywhere persistent on the client.
