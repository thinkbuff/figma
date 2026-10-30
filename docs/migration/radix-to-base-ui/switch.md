# switch

2026-10-25 · strategy: transformation engine · verdict: clean, zero VRT diffs, tests pass unchanged.

## Changed

- `src/components/switch/switch.tsx` — `@radix-ui/react-switch` → `Switch` (`@base-ui/react/switch`, Root + Thumb). `data-[state=checked]` → `data-[checked]`, `data-[state=unchecked]` → `data-[unchecked]`; `className` narrowed; `displayName` literal.

Leftover scan: `rg "@radix-ui" src/components/switch/` → 0.

## Left alone

- Tests, stories, index.ts; radix dep stays until step 7.

## API changes (for CHANGELOG)

- `onCheckedChange(checked)` → `onCheckedChange(checked, eventDetails)`; `render` passthrough; `className` narrowed to `string`.

## Behavior changes

- DOM: `<button>` → `<span role="switch">` + hidden input — roles/aria unchanged (test-verified). None else.

## Re-baselined screenshots

- None — 207/207, zero diffs.

## Verify by hand

- Click/Space toggles; brand track + thumb slide; disabled dims.
