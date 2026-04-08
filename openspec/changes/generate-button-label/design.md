## Context

The generate button in `ComplexGenerator.jsx` has three label states controlled by a ternary:

```jsx
{!withinLimit
  ? "🔒 Upgrade to Generate More"
  : promptGenerated ? "↻ Regenerate Prompt" : "→ Generate Prompt"}
```

## Goals / Non-Goals

**Goals:** Change the middle branch label only.

**Non-Goals:** Changing button behaviour, icons, or the other two label states.

## Decisions

Replace `"↻ Regenerate Prompt"` with `"→ Generate New Prompt"`. Keep the `→` arrow for visual consistency with the first-time label.
