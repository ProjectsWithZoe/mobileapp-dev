## 1. Disable button during profile load

- [x] 1.1 In `ComplexGenerator`, destructure `loading as profileLoading` from `useProfile(user?.id)`
- [x] 1.2 Change the generate button's `disabled` prop to `!canGenerate || (!!user && profileLoading)`

## 2. Guard generatePrompt against null profile

- [x] 2.1 In `generatePrompt`, add an early return at the top of the non-demo branch: `if (user && !profile) return`

## 3. Remove orphaned payment banner effect

- [x] 3.1 Delete the `useEffect` block in `ComplexGenerator` that reads `?payment=success` from `window.location.search` and polls `refreshProfile`
- [x] 3.2 Remove the `paymentBanner` state variable and its setter (`useState(null)`)
- [x] 3.3 Remove the payment banner JSX render block (the green banner shown when `paymentBanner` is set)

## 4. Verification

- [ ] 4.1 Sign in as a new user (0 generations) — generate button is initially disabled briefly, then enables
- [ ] 4.2 Generate a prompt — button immediately changes to "🔒 Upgrade to Generate More"
- [ ] 4.3 Click "🔒 Upgrade to Generate More" — upgrade modal appears with Stripe links
- [ ] 4.4 Refresh the page — on reload the button shows "🔒 Upgrade to Generate More" without allowing a generation
- [ ] 4.5 Confirm no JS errors when returning to `/` from the `/success` page

