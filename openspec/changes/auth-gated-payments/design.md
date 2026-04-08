## Context

`App.jsx` owns all top-level state: `user` (from `useAuth`), `showAuthModal`, `authMode`, and `isDemoMode`. The `LandingPage` component receives callbacks (`onDemo`, `onSubscribe`, `onSignIn`, `onGetStarted`) and knows nothing about auth state. All routing logic lives in `App.jsx`'s render body — no React Router.

Currently:
- `onDemo` → `setIsDemoMode(true)` → renders `PromptGenerator` in demo mode
- `onSubscribe(plan)` → `getStripeLink(plan, user)` → redirect (works for null user too)

## Goals / Non-Goals

**Goals:**
- "Free Demo" button → sign-up modal (first-time account creation prompt)
- Pricing buttons → sign-up modal if unauthenticated, then Stripe redirect after auth
- After auth completes, any pending Stripe plan is automatically fulfilled

**Non-Goals:**
- Removing the anonymous demo mode code path from `PromptGenerator` (kept for potential future use / direct URL access)
- Changing LandingPage component internals
- Modifying the webhook or `stripe_pending_activations` path

## Decisions

**1. Pending plan via `useState` in `App.jsx`**

Add `const [pendingPlan, setPendingPlan] = useState(null)`.

`onSubscribe(plan)`:
```js
if (!user) {
  setPendingPlan(plan)   // remember what they wanted
  openAuth('signup')     // prompt sign-up
  return
}
// signed in — go straight to Stripe
const link = getStripeLink(plan, user)
if (link) window.location.href = link
```

`onDemo`:
```js
openAuth('signup')  // no more demo mode from this button
```

After auth resolves, a `useEffect` watches `user` + `pendingPlan`:
```js
useEffect(() => {
  if (!user || !pendingPlan) return
  const link = getStripeLink(pendingPlan, user)
  setPendingPlan(null)
  if (link) window.location.href = link
}, [user, pendingPlan])
```

**Why `useState` over `localStorage`?** The pending plan only needs to survive the in-page auth modal flow (no page reload). `useState` is simpler, zero storage side-effects, and automatically cleaned up.

**2. `openAuth('signup')` as the default for both entry points**

Both "Free Demo" and unsigned pricing buttons open sign-up mode. Users who already have an account can switch to sign-in via the existing "Sign in instead" toggle in `AuthModal`.

**3. `isDemoMode` remains wired but unreachable from the primary button**

The `isDemoMode` state and the `PromptGenerator demoMode` prop stay in place. They're just no longer triggered by the "Free Demo" button. This avoids a larger refactor of `ComplexGenerator`.

## Risks / Trade-offs

- **User who clicks "Free Demo" expecting to try before buying**: they now must create an account first. This is intentional — the product wants accounts before usage.
- **Pending plan lost if user closes the auth modal**: `pendingPlan` resets to null on next page load. The user can just click the pricing button again. Acceptable UX.
- **Auth modal opens in "signup" mode for pricing buttons**: a returning user who clicks a pricing button will see sign-up copy and need to switch to sign-in. They can do this via the existing toggle — a minor friction trade-off.

## Open Questions

*(none)*
