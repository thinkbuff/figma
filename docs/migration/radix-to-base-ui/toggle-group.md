# toggle-group

2026-10-25 · strategy: transformation engine · verdict: clean migration, zero VRT diffs, tests pass with API-driven updates only.

## Changed

- `packages/react/src/components/toggle-group/toggle-group.tsx` — `@radix-ui/react-toggle-group` → `ToggleGroup` from `@base-ui/react/toggle-group` + `Toggle` from `@base-ui/react/toggle` for `ToggleGroupItem`. `data-[state=on]` → `data-[pressed]`; `className` narrowed to `string` on both; `displayName` literals.
- `toggle-group.test.tsx` — API updates only: `type="single"` → default, `type="multiple"` → `multiple`, `defaultValue="center"` → `['center']`, `firstArg` assertion `'right'` → `['right']` (equally strong).
- `toggle-group.stories.tsx` — `type` arg/argTypes removed; `multiple` for the multi stories; `useArgs` value `string` → `string[]`; `defaultValue="horizontal"` → `['horizontal']`; removed the `if (selected)` deselect guard (array is always defined).

Leftover scan: `rg "@radix-ui" packages/react/src/components/toggle-group/` → 0 matches.

## Left alone

- `index.ts`, `@radix-ui/react-toggle-group` dep (step 7).
- Styling unchanged; `disabled:` item selectors still work (native disabled attr).

## API changes (for CHANGELOG)

- `type="single"|"multiple"` → `multiple?: boolean` (single is the default).
- `value`/`defaultValue` are now always `string[]`; `onValueChange(value)` → `onValueChange(value, eventDetails)`.
- `rovingFocus`/`loop` → `loopFocus` (passes through).
- `className` narrowed to `string`; `render` prop available.

## Behavior changes

- None observed — single mode still allows deselecting the pressed item, same as Radix.

## Re-baselined screenshots

- None — `pnpm test:visual` 207/207 zero diffs (cleared `node_modules/.vite` dep-optimize cache after the edit; the earlier "no tests" run was that stale cache).

## Verify by hand

- Single: click items → exclusive selection + deselect allowed; `data-pressed` styling applies.
- Multiple: independent toggles; disabled item/group inert.
