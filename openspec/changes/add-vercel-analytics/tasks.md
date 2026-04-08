## 1. Install package

- [x] 1.1 Run `npm install @vercel/analytics` in `mobiledev-web/`

## 2. Mount Analytics component

- [x] 2.1 Import `Analytics` from `@vercel/analytics/react` in `App.jsx`
- [x] 2.2 Render `<Analytics />` once at the root of `App.jsx` (sibling to the main content, outside all conditional branches so it always mounts)

## 3. Track conversion events in App.jsx

- [x] 3.1 Import `track` from `@vercel/analytics` in `App.jsx`
- [x] 3.2 In `onSubscribe`, call `track('stripe_redirect', { plan })` immediately before `window.location.href = link`

## 4. Track conversion events in LandingPage.jsx

- [x] 4.1 Import `track` from `@vercel/analytics` in `LandingPage.jsx`
- [x] 4.2 Add `track('pricing_cta_click', { plan: 'lifetime' })` to all lifetime pricing button `onClick` handlers (hero, pricing section, final CTA)
- [x] 4.3 Add `track('pricing_cta_click', { plan: 'monthly' })` to the monthly pricing button `onClick` handler
- [x] 4.4 Add `track('demo_open')` to the "Free Demo" nav button `onClick` handler
