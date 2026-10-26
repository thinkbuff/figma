# radio

2026-10-25 · strategy: transformation engine · verdict: clean after one styling fix; 207/207 VRT.

## Changed

- `src/components/radio/radio.tsx` — `@radix-ui/react-radio-group` → `RadioGroup` (`@base-ui/react/radio-group`) + `Radio.Root`/`Radio.Indicator` (`@base-ui/react/radio`). Item classes: `disabled:*` → `data-[disabled]:*`, `not-disabled:focus:*` → `not-data-[disabled]:focus:*`, indicator `group-disabled:*` → `group-data-[disabled]:*` (span renders `data-disabled`, not a native `disabled` attr).
- `src/components/label/label.tsx` — **belongs to this handoff**: added `peer-data-[disabled]:cursor-not-allowed peer-data-[disabled]:text-figma-disabled` alongside `peer-disabled:*`. Base UI radio/checkbox roots are `<span>`s emitting `data-disabled`; `peer-disabled` only matches native `disabled` attrs. Without it the Radio-Disabled story's paired labels were not dimmed (the 3 VRT diffs).

Leftover scan: `rg "@radix-ui" src/components/radio/` → 0.

## Left alone

- Tests (incl. arrow-key nav via synthetic keydown — passes as-is; Base UI arrow keys move focus AND select, matching the old assertions), stories, index.ts, radix dep.

## API changes (for CHANGELOG)

- `onValueChange(value)` → `onValueChange(value, eventDetails)`; `render` passthrough; `className` narrowed to `string`; `RadioGroupItem` maps to `Radio.Root` + `Radio.Indicator`.

## Behavior changes

- DOM: item `<button>` → `<span role="radio">` + hidden `<input type="radio">`; `data-disabled`/`aria-disabled` replace native `disabled`; `data-checked`/`data-unchecked` added.
- `data-composite` attribute now present on items (Base UI composite item metadata) — non-visual.

## Re-baselined screenshots

- None — 207/207 after the `peer-data-[disabled]` fix (3 earlier diffs on Radio-Disabled across themes were the label-dimming regression, fixed not re-baselined).

## Verify by hand

- Arrow keys move focus + select (matches old assertions).
- Group `disabled` dims items AND their peer Labels.
