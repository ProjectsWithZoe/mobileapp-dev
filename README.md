# Humble-UI

**AI prompt engineering for UI mockups.** Humble-UI generates structured, production-grade prompts that you paste into any AI code tool (Claude, GPT-4, Lovable, Bolt) to get a polished UI on the first try — no 10-round revision loops.

🌐 **[humble-ui.com](https://humble-ui.com)**

---

## What it does

You describe your app. Humble-UI turns that into a ~1,200-character structured prompt with exact screen definitions, a hex-accurate colour palette, layout rules, and component specs. The AI model gets everything it needs upfront — so the output is actually good.

---

## Tech stack

| Layer | Technology |
|---|---|
| Frontend | React 19 + Vite 7, Tailwind CSS v4 |
| Auth & Database | [Supabase](https://supabase.com) (magic-link auth, PostgreSQL, RLS) |
| Payments | [Stripe](https://stripe.com) (Payment Links + webhooks) |
| Email | [Resend](https://resend.com) (transactional — magic links, contact form) |
| Hosting | [Vercel](https://vercel.com) (SPA + serverless API routes) |
| Edge Functions | Supabase Edge Functions (Deno — Stripe webhook, contact form) |
| Analytics | [PostHog](https://posthog.com) (consent-gated) + Vercel Analytics |
| Error monitoring | [Sentry](https://sentry.io) |

---

## Prerequisites

- **Node.js** ≥ 20 (project tested on v24)
- **npm** (bundled with Node)
- **Supabase CLI** — for deploying Edge Functions: `npm i -g supabase`
- **Vercel CLI** — for local serverless function emulation (optional): `npm i -g vercel`
- A [Supabase](https://supabase.com) project
- A [Stripe](https://stripe.com) account with two Payment Links created

---

## Local development

### 1. Clone the repo

```bash
git clone <repo-url>
cd gpt-mobiledev
```

### 2. Install dependencies

```bash
cd mobiledev-web
npm install
```

### 3. Configure environment variables

```bash
cp .env.example .env.local
```

Open `.env.local` and fill in the values. See [Environment variables](#environment-variables) below.

### 4. Start the dev server

```bash
npm run dev
```

The app is available at **http://localhost:5173**.

> **Note:** Serverless API routes (`/api/*`) require the Vercel CLI to emulate locally. Run `vercel dev` instead of `npm run dev` if you need them. For most frontend work `npm run dev` is sufficient.

---

## Environment variables

All variables live in `mobiledev-web/.env.local` (copy from `.env.example`). Variables prefixed with `VITE_` are bundled into the browser. All others are server-side only and must also be added to Vercel's environment variable settings for production.

### Frontend (VITE\_\*)

| Variable | Required | Description |
|---|---|---|
| `VITE_SUPABASE_URL` | ✅ | Supabase project URL — Supabase Dashboard → Project Settings → API |
| `VITE_SUPABASE_PUBLISHABLE_DEFAULT_KEY` | ✅ | Supabase anon/publishable key. Also accepted as `VITE_SUPABASE_ANON_KEY` |
| `VITE_STRIPE_MONTHLY_LINK` | ✅ | Stripe Payment Link URL for the $9.99/month plan |
| `VITE_STRIPE_LIFETIME_LINK` | ✅ | Stripe Payment Link URL for the $49.99 lifetime plan |
| `VITE_PUBLIC_POSTHOG_KEY` | Optional | PostHog project API key. Omit to disable analytics entirely |
| `VITE_PUBLIC_POSTHOG_HOST` | Optional | PostHog ingest host. Defaults to `https://us.i.posthog.com` |
| `VITE_SENTRY_DSN` | Optional | Sentry DSN for error tracking. Omit to disable |

### Supabase server-side

| Variable | Required | Description |
|---|---|---|
| `SUPABASE_SERVICE_ROLE_KEY` | ✅ (prod) | Service role key — bypasses RLS. **Never expose to the browser.** Supabase Dashboard → Project Settings → API → `service_role` |
| `SUPABASE_URL` | Optional | Server-side fallback for `VITE_SUPABASE_URL` |
| `SUPABASE_ANON_KEY` | Optional | Server-side fallback for the anon key |

### Stripe server-side

| Variable | Required | Description |
|---|---|---|
| `STRIPE_SECRET_KEY` | ✅ (prod) | Stripe secret key — Stripe Dashboard → Developers → API keys |
| `STRIPE_WEBHOOK_SECRET` | ✅ (prod) | Webhook signing secret — Stripe Dashboard → Webhooks → your endpoint |

### Application

| Variable | Required | Description |
|---|---|---|
| `APP_URL` | ✅ (prod) | Public app URL (e.g. `https://humble-ui.com`) — used as redirect target in magic-link emails |

### Supabase Edge Function secrets

Set these via the Supabase CLI (not `.env.local`):

```bash
supabase secrets set ANTHROPIC_API_KEY=sk-ant-...
supabase secrets set STRIPE_WEBHOOK_SECRET=whsec_...
supabase secrets set STRIPE_SECRET_KEY=sk_live_...
supabase secrets set SUPABASE_SERVICE_ROLE_KEY=...
supabase secrets set RESEND_API_KEY=re_...
supabase secrets set CONTACT_TO_EMAIL=support@humble-ui.co.uk
supabase secrets set APP_URL=https://humble-ui.com
```

---

## Project structure

```
gpt-mobiledev/
├── mobiledev-web/                   # React + Vite application
│   ├── api/                         # Vercel serverless functions
│   │   └── stripe-webhook.js        # Stripe webhook handler (Node.js)
│   ├── public/                      # Static files served at root
│   │   ├── privacy.html             # Privacy Policy
│   │   ├── terms.html               # Terms & Conditions
│   │   └── cookie-policy.html       # Cookie Policy
│   └── src/
│       ├── assets/                  # Images
│       ├── components/              # React components
│       │   ├── AuthModal.jsx        # Magic-link sign in / sign up
│       │   ├── ComplexGenerator.jsx # Core prompt generator UI
│       │   ├── CookieBanner.jsx     # PECR-compliant cookie consent
│       │   ├── LandingPage.jsx      # Marketing page
│       │   └── PaymentSuccess.jsx   # Post-payment confirmation
│       ├── hooks/                   # Custom React hooks
│       │   ├── useAuth.js           # Supabase auth (sign in, sign up, session)
│       │   ├── useGeneratedPrompts.js
│       │   ├── useProfile.js        # Plan, generation count
│       │   └── useSavedPrompts.js
│       ├── lib/                     # Third-party client initialisation
│       │   ├── posthog.js           # Consent-gated PostHog init
│       │   ├── sentry.js
│       │   └── supabase.js
│       ├── App.jsx                  # Root component + routing
│       └── main.jsx                 # Entry point
├── supabase/
│   └── functions/
│       ├── send-contact/            # Contact form Edge Function (Deno)
│       └── stripe-webhook/          # Stripe webhook Edge Function (Deno)
└── openspec/                        # OpenSpec change management
    ├── specs/                       # Canonical feature specifications
    └── changes/                     # Change history
```

---

## Supabase setup

### Required tables

Run in the Supabase SQL editor:

```sql
-- User profiles
create table if not exists user_profiles (
  id                 uuid primary key references auth.users(id) on delete cascade,
  plan               text not null default 'free',
  generation_count   int  not null default 0,
  stripe_customer_id text,
  created_at         timestamptz not null default now()
);
alter table user_profiles enable row level security;
create policy "own profile" on user_profiles using (auth.uid() = id);

-- Saved prompts
create table if not exists saved_prompts (
  id            uuid primary key default gen_random_uuid(),
  user_id       uuid not null references auth.users(id) on delete cascade,
  name          text not null,
  app_idea      text not null,
  use_case      text not null,
  palette_index int  not null,
  complexity    text not null,
  extra_context text not null default '',
  prompt_text   text not null,
  created_at    timestamptz not null default now()
);
alter table saved_prompts enable row level security;
create policy "own prompts" on saved_prompts using (auth.uid() = user_id);

-- Generated prompts log
create table if not exists generated_prompts (
  id            uuid primary key default gen_random_uuid(),
  user_id       uuid references auth.users(id) on delete cascade,
  app_idea      text not null,
  use_case      text not null,
  palette_name  text not null,
  complexity    text not null,
  extra_context text not null default '',
  prompt_text   text not null,
  created_at    timestamptz not null default now()
);
alter table generated_prompts enable row level security;
create policy "own generated" on generated_prompts using (auth.uid() = user_id);

-- Stripe pending activations (guest checkout flow)
create table if not exists stripe_pending_activations (
  email              text primary key,
  plan               text not null,
  stripe_customer_id text,
  created_at         timestamptz not null default now()
);
```

### Deploy Edge Functions

```bash
supabase link --project-ref <your-project-ref>
supabase functions deploy send-contact
supabase functions deploy stripe-webhook
```

---

## Deployment

The app deploys to **Vercel**. Every push to `main` triggers an automatic production deploy.

```bash
# Manual deploy
vercel --prod
```

**Stripe webhook** — register in the Stripe Dashboard:
- Endpoint URL: `https://humble-ui.com/api/stripe-webhook`
- Events: `checkout.session.completed`

**Supabase Edge Functions** are deployed independently via the Supabase CLI (see above) and are not part of the Vercel build.

---

## Legal

- [Privacy Policy](https://humble-ui.com/privacy.html)
- [Terms & Conditions](https://humble-ui.com/terms.html)
- [Cookie Policy](https://humble-ui.com/cookie-policy.html)

---

© 2025 Humble-UI. All rights reserved.
