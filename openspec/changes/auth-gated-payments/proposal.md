## Why

Two behaviours need adjusting to create a cleaner, account-first funnel:

1. **"Free Demo" currently bypasses account creation.** Anonymous demo users try the product and are prompted to sign up only after their generation is exhausted. The desired flow is: clicking "Free Demo" opens the sign-up modal so users create an account first — then get their free generation as a signed-in user.

2. **Pricing buttons allow unsigned users to go straight to Stripe.** The previous `core-user-flows` change enabled guest checkout. The new requirement reverses this: only signed-in users should be able to initiate a payment. An unsigned user clicking a pricing button should be directed to sign up, then after auth completes, automatically redirected to Stripe for the plan they selected.

## What Changes

- **"Free Demo" button**: instead of entering demo mode (`isDemoMode = true`), it opens the sign-up auth modal. The anonymous `PromptGenerator` demo mode is no longer reachable from this button.
- **Pricing buttons (landing page)**: if the user is not signed in, clicking a plan stores the intended plan and opens the sign-up modal. After sign-in/sign-up succeeds, the user is immediately redirected to Stripe for that plan.
- **`onSubscribe` handler in `App.jsx`**: gates on `user` — no user → open auth (signup mode), remembering the chosen plan. On auth success, check for a pending plan and fire the Stripe redirect.
- **Remove `stripe_pending_activations` path for unsigned checkouts** is *not* in scope — that table/webhook path still handles edge cases where users find Stripe links directly. This change only affects the primary UI flow.

## Capabilities

### New Capabilities

*(none — behavioural changes to existing flows only)*

### Modified Capabilities

- `free-demo-entry`: "Free Demo" button opens sign-up modal instead of anonymous demo mode.
- `auth-gated-subscribe`: Pricing buttons require an authenticated session; pending plan is stored and fulfilled after auth.

## Impact

- `mobiledev-web/src/App.jsx` — change `onDemo` prop to open sign-up, add pending-plan state, fulfil redirect after auth resolves
- `mobiledev-web/src/components/LandingPage.jsx` — no changes needed (buttons already delegate to `onDemo` and `onSubscribe` callbacks)
