## Why

After a prompt is generated, the generate button label switches to "↻ Regenerate Prompt". This implies the user would get the same prompt again. The clearer label is "→ Generate New Prompt", which communicates that a new, different prompt will be created.

## What Changes

- Button label: `"↻ Regenerate Prompt"` → `"→ Generate New Prompt"` in `ComplexGenerator.jsx`

## Capabilities

### New Capabilities
*(none)*

### Modified Capabilities
- `generate-button-label`: Label shown on the generate button after a prompt has already been produced.

## Impact

- `src/components/ComplexGenerator.jsx` — one-line label change
