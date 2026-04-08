## Why

Logged-in free users can currently generate prompts without meaningful enforcement — a race condition lets them generate during the profile-loading phase even after exhausting their allowance. The generate button also has an inverted `disabled` logic that allows clicks in edge cases. The feature needs hardening so the 1-free-generation limit is reliably enforced, and the upgrade flow is clean for logged-in users.

## What Changes

- Fix `generatePrompt` to treat a loading profile as a blocker (not a pass-through) for returning users
- Disable the generate button while the profile is still loading when the user is logged in
- Remove the orphaned `?payment=success` polling code in `ComplexGenerator` (that redirect no longer fires — users now land on `/success` instead)
- Verify and tighten the upgrade modal copy/flow for logged-in non-demo users (the modal and Stripe links already exist; the path needs to be smooth end-to-end)

## Capabilities

### New Capabilities

*(none — this change hardens existing behaviour, no new user-visible feature)*

### Modified Capabilities

- `free-generation-limit`: The enforcement logic in `ComplexGenerator` and `useProfile` gains:
  - Loading-state gate: generate button is disabled while `useProfile.loading` is true for authenticated users
  - `generatePrompt` guards against `profile === null` (returns early instead of allowing generation)
  - Orphaned `?payment=success` handler removed from `ComplexGenerator`

## Impact

- `src/components/ComplexGenerator.jsx` — button disabled logic, `generatePrompt` guard, remove `?payment=success` effect
- `src/hooks/useProfile.js` — expose `loading` (already returned); no schema changes needed
