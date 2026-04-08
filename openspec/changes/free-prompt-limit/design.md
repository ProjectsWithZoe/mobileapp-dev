## Context

`ComplexGenerator` uses `useProfile(user?.id)` which returns `{ loading, withinLimit, generationsUsed, incrementGeneration }`. The current `withinLimit` computation is:

```js
const withinLimit = loading || !profile || isPaid || generationsUsed < FREE_LIMIT
```

This intentionally lets users generate while the profile is loading (`loading === true → withinLimit = true`). The problem: for returning users who have already used their free generation, there is a brief window between mount and profile fetch where the button is enabled and the generate function will run (since `withinLimit` evaluates to `true` during that window).

The generate button's `disabled` prop is also inverted:
```js
disabled={withinLimit && !canGenerate}
```
This disables the button when the user is *within* their limit but hasn't typed an idea. When `withinLimit = false` (limit hit), the button is always enabled — which is intentional (clicking shows the upgrade modal). But when the profile is loading for a logged-in user with `canGenerate = true`, the button is enabled before we know the user's count.

## Goals / Non-Goals

**Goals:**
- Prevent returning users from generating during the profile load window
- Make the generate button's loading state explicit when the user is authenticated
- Remove dead code (`?payment=success` effect) left over from before the `/success` page

**Non-Goals:**
- Server-side enforcement (prompts are built client-side from templates; no AI API call is gated)
- Changing the free limit value or pricing
- Changing the upgrade modal design

## Decisions

**1. Gate `generatePrompt` on `profile !== null` for authenticated users**

Add an early return to `generatePrompt`: if `user` is set but `profile` is null (loading not yet complete), do nothing. This is safe because `withinLimit` is also `true` during this state — but the explicit guard makes the intent clear and prevents the edge case.

```js
// Early return if profile hasn't loaded yet for authenticated users
if (user && !profile) return
```

**2. Disable the generate button while profile is loading for authenticated users**

Change the `disabled` prop from `disabled={withinLimit && !canGenerate}` to:

```js
disabled={!canGenerate || (!!user && profileLoading)}
```

`useProfile` already returns `loading`; expose it as `profileLoading` in the destructure. While the profile loads, authenticated users see a subtly disabled button (no jarring layout shift, just prevents the race).

**3. Remove the `?payment=success` effect from `ComplexGenerator`**

The Stripe Payment Links now redirect to `humble-ui.com/success`. The `?payment=success` effect (which polled Supabase for plan upgrades) no longer triggers. Removing it eliminates dead code. When users return to the app from the `/success` page via "Go to app", a full page reload re-mounts `useProfile` which fetches the updated plan — no additional polling needed.

## Risks / Trade-offs

- **Returning users see a briefly disabled button on mount**: only lasts the duration of the Supabase profile fetch (typically < 200ms on a warm connection). Acceptable UX trade-off for correctness.
- **`profile === null` guard in `generatePrompt` is belt-and-suspenders**: already covered by the button being disabled, but cheap to add and prevents any future path that bypasses the disabled state.

## Open Questions

*(none)*
