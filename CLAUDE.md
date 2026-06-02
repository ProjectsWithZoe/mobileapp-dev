# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What this project is

**Humble-UI** — a prompt engineering tool that generates structured ~1,200-character prompts for AI code tools (Claude, GPT-4, Lovable). Users describe an app, pick a use case, set colours via hex inputs, choose complexity, and get a production-grade prompt to paste into any AI.

The app lives entirely in `mobiledev-web/`. All commands below are run from that directory.

---

## Commands

```bash
# Dev server (Turbopack — fast HMR)
npm run dev           # http://localhost:3000

# Production build
npm run build

# Start production server locally
npm run start

# Lint
npm run lint

# E2E tests (Playwright)
npm run test:e2e
npx playwright test tests/landing.spec.js   # single test file
```

> The app degrades gracefully when `NEXT_PUBLIC_SUPABASE_*` env vars are missing — auth/save features are hidden but the generator works.

---

## Architecture

### Framework: Next.js 15 App Router

```
mobiledev-web/
  app/
    layout.jsx          # Root Server Component — fonts, metadata, ErrorBoundary, SentryInit
    page.jsx            # 'use client' root page — auth routing (LandingPage / PromptGenerator)
    globals.css         # @import "tailwindcss"; minimal resets
    success/
      page.jsx          # Server Component wrapper around PaymentSuccess
    api/
      webhooks/
        stripe/
          route.js      # Next.js App Router POST handler for Stripe webhooks
  src/
    components/         # All UI components — every component has 'use client' as first line
    hooks/              # useAuth.js, useProfile.js
    lib/                # supabase.js, stripe.js, posthog.js, sentry.js
    assets/             # PNG images imported as Next.js module objects (.src for URL)
  postcss.config.mjs    # { plugins: { '@tailwindcss/postcss': {} } }
  next.config.mjs       # Minimal config — security headers are in vercel.json
```

### Routing

`app/page.jsx` is the sole router. It renders one of three states:
- `/success` path → `<PaymentSuccess />` (checked via `window.location.pathname`)
- No user → `<LandingPage />` or `<PromptGenerator demoMode />` (if demo was triggered)
- Authenticated user → `<PromptGenerator />`

All heavy components are lazy-loaded with `React.lazy` + `Suspense`. There are no router libraries.

### Auth flow (Supabase magic-link OTP)

`useAuth.js` wraps Supabase auth state. Sign-in and sign-up both use `signInWithOtp()`. The difference: sign-up calls the `email_exists` RPC first and passes `shouldCreateUser: true`; sign-in passes `shouldCreateUser: false` (errors if email not found).

After a guest checkout, `stripe_pending_activations` stores the email + plan. On next sign-in, `useProfile.js` calls the `claim_pending_activation` RPC to apply the pending plan.

### Prompt generation

`ComplexGenerator.jsx` contains all logic. Key data flow:

1. User sets: use case (6 options), app idea (text), complexity (simple/standard/advanced), custom palette (3 hex inputs: background, primary, accent)
2. `generatePrompt()` picks the matching builder from `PROMPT_BUILDERS` (strategy pattern, one builder per use case)
3. Each builder interpolates `palette.colors[0/1/2]` and `complexity.screens` into a ~1,200-char prompt template
4. Output is displayed in a terminal-style pre block and copied via `navigator.clipboard`

Free users get 1 generation (tracked in `user_profiles.generation_count`). Paid users are unlimited.

### Database tables (Supabase PostgreSQL with RLS)

| Table | Purpose |
|---|---|
| `user_profiles` | `id`, `plan` (free/monthly/lifetime), `generation_count`, `stripe_customer_id` |
| `saved_prompts` | User-saved prompts with full config; `palette_index` is always `0` (custom hex colours are baked into `prompt_text`) |
| `generated_prompts` | Analytics log of every generation; `user_id` is nullable (demo users) |
| `stripe_pending_activations` | Keyed by email; holds plan for guest-checkout → account conversion |

### Payment flow

Two checkout paths handled by `app/api/webhooks/stripe/route.js` (Next.js App Router, Node.js runtime):

- **Signed-in checkout**: Stripe session has `client_reference_id` = user UUID → directly updates `user_profiles.plan`
- **Guest checkout**: No `client_reference_id` → stores email in `stripe_pending_activations`, triggers OTP email via Supabase `signInWithOtp` so the user can create an account

There is also a Supabase Edge Function alternative:
- `supabase/functions/stripe-webhook/` — Supabase Edge Function (Deno, alternative deployment)

### Edge Functions (Supabase Deno runtime)

`supabase/functions/send-contact/` — contact form handler. Called directly from `LandingPage.jsx` via `fetch` to `${NEXT_PUBLIC_SUPABASE_URL}/functions/v1/send-contact`.

Deploy edge functions separately from the Vercel build:
```bash
supabase link --project-ref <ref>
supabase functions deploy send-contact
supabase secrets set RESEND_API_KEY=re_...
```

### Analytics + monitoring

- **PostHog**: consent-gated. `initPostHog()` called only after cookie banner acceptance. `capture()` is a no-op if uninitialised. Key events: `prompt_generated`, `prompt_saved`, `prompt_copied`, `stripe_redirect`.
- **Sentry**: `src/lib/sentry.js` has a `typeof window !== 'undefined'` guard so it's safe to import server-side. `SentryInit.jsx` is a `'use client'` leaf component that triggers the import from `app/layout.jsx`.
- **Vercel Analytics**: `<Analytics />` from `@vercel/analytics/next` in `app/layout.jsx`.

---

## Environment variables

All in `mobiledev-web/.env.local`. See `.env.example` for the full list.

**Client (`NEXT_PUBLIC_` prefix, bundled into browser):**
- `NEXT_PUBLIC_SUPABASE_URL` + `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- `NEXT_PUBLIC_STRIPE_MONTHLY_LINK` + `NEXT_PUBLIC_STRIPE_LIFETIME_LINK`
- `NEXT_PUBLIC_POSTHOG_KEY`, `NEXT_PUBLIC_SENTRY_DSN` (optional)
- `NEXT_PUBLIC_APP_URL` — magic-link redirect target in development

**Server-only (Vercel env vars — never in `.env.local` for prod):**
- `SUPABASE_SERVICE_ROLE_KEY` — used by the Stripe webhook route to bypass RLS
- `STRIPE_SECRET_KEY`, `STRIPE_WEBHOOK_SECRET`
- `APP_URL` — redirect target in magic-link emails (e.g. `https://humble-ui.com`)

---

## Design system

Colours are defined as named constants at the top of each component file (not in a shared theme):

```js
const ORANGE = "#EA580C"   // primary accent
const AMBER  = "#FB923C"   // secondary accent
const BROWN  = "#1C0A02"   // headlines
const BROWN2 = "#5C2E0A"   // body text
const BROWN3 = "#9A6040"   // muted / secondary
const BG     = "#FFFBF7"   // warm cream background
const SURF   = "#FFFFFF"   // card surface
const SURF2  = "#FFF5EC"   // alternate section tint
const BORDER = "#E8CFBA"   // warm border
```

Fonts loaded via `next/font/google` in `app/layout.jsx`: **Instrument Sans** (headings), **Inter** (body), **IBM Plex Mono** (code/terminal). Applied to `<html>` as CSS variables `--font-inter`, `--font-instrument-sans`, `--font-ibm-plex-mono`.

Tailwind CSS v4 is used via `@tailwindcss/postcss` — no `tailwind.config.js` file.

---

## Key constraints

- The app must function (generator only) even with no Supabase env vars — `supabase.js` exports `null` and every hook guards with `if (!supabase) return`.
- All `src/components/` files must have `'use client'` as their first line — they use hooks, browser APIs, or event handlers.
- `app/layout.jsx` and `app/success/page.jsx` are Server Components — do not import browser-only code directly; use `'use client'` leaf components like `SentryInit.jsx`.
- The Stripe webhook route (`app/api/webhooks/stripe/route.js`) uses `await req.text()` for the raw body — do not add a JSON body parser or it will break Stripe signature verification.
- CSP is applied via `vercel.json` in production. `script-src` includes `'unsafe-inline' 'unsafe-eval'` for Next.js runtime requirements.
