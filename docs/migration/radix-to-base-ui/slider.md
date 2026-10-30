# slider

2026-10-25 · strategy: transformation engine · verdict: clean, zero VRT diffs, tests pass with two `// Base UI:` assertion updates.

## Changed

- `src/components/slider/slider.tsx` — `@radix-ui/react-slider` → `Slider` (`@base-ui/react/slider`). `SliderRoot` now wraps `Slider.Root` + `Slider.Control` (children = Track + thumbs land inside Control, matching story composition). `SliderRange` → `Slider.Indicator`; `SliderThumb` → `Slider.Thumb` (composed Slider passes `index`). Root props pass through untouched (Base UI types); composed `Slider` counts thumbs via a local `toArray` only.
- `slider.stories.tsx` — removed `inverted` arg/argType (no Base UI equivalent), `minStepsBetweenThumbs` → `minStepsBetweenValues`, thumbs get `index={index}`.
- `slider.test.tsx` — two assertions marked `// Base UI:` (see below).

Leftover scan: `rg "@radix-ui" src/components/slider/` → 0.

## Left alone

- `index.ts`, radix dep (step 7). WithValueTooltip story still composes with still-Radix `Tooltip` — `render` composition unchanged.
- `data-[orientation]`/`data-[disabled]`/`data-[checked]` class hooks already use Base UI attributes.

## API changes (for CHANGELOG)

- `onValueCommit` → `onValueCommitted`; `onValueChange(value)` → `onValueChange(value, eventDetails)` — **no compat layer**: value/defaultValue/callbacks pass straight through with Base UI types (Base UI returns the same shape you pass in: number for number, array for array). The composed `Slider` only uses `toArray` locally to count thumbs.
- `inverted` removed (no Base UI equivalent).
- `minStepsBetweenThumbs` → `minStepsBetweenValues`.
- `className` narrowed to `string`; `render` passthrough on parts.
- New `SliderControl` exists inside `SliderRoot` (not exported separately — composition transparent to consumers).

## Behavior changes

- DOM: thumb `<button>` → `<span>` + hidden `<input type="range">` per thumb; `role=slider` moves to the hidden input (aria-valuenow/valuetext on it; native `min`/`max` attrs instead of `aria-valuemin`/`aria-valuemax`).
- Disabled state: `data-disabled` on parts + `disabled` on the hidden input (was `aria-disabled`).

## Re-baselined screenshots

- None — 207/207, zero diffs (pixel-identical incl. WithValueTooltip + 1px CustomStyle track).

## Verify by hand

- Drag/arrow keys/Home/End change value; range slider has two thumbs (`index` prop).
- Disabled slider ignores pointer input; WithValueTooltip shows on hover.
