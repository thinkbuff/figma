# checkbox

2026-10-25 · strategy: transformation engine · verdict: clean migration, zero VRT diffs, all tests pass unchanged.

## Changed

- `packages/react/src/components/checkbox/checkbox.tsx` — `@radix-ui/react-checkbox` → `Checkbox` (`@base-ui/react/checkbox`, Root + Indicator). `data-[state=checked]` → `data-[checked]`; `className` narrowed to `string`; `checked="indeterminate"` mapping removed (Base UI has a native `indeterminate` boolean).
- `packages/react/vite.config.ts` — `optimizeDeps.include` now derives every exported `@base-ui/react/*` subpath from the installed package's `exports` map (`fs.readFileSync` + filter), fixing the stale dep-optimize cache that caused phantom VRT diffs after each dependency swap (the bare `@base-ui/react` name did not cover deep imports). `./package.json` filtered out (not a module).

Leftover scan: `rg "@radix-ui" packages/react/src/components/checkbox/` → 0 matches.

## Left alone

- `checkbox.test.tsx`, `checkbox.stories.tsx`, `index.ts` — unchanged; all tests pass as-is including the Label `htmlFor` association test (Base UI forwards the checkbox `id` to the hidden `<input>`, so `<Label htmlFor>` still toggles it).
- `@radix-ui/react-checkbox` stays in `dependencies` until step 7.
- `checkbox.tsx:62` `asChild` was on `Indicator` (renders the icon directly); Base UI `Indicator` renders children inline — same result, no `render` needed.

## API changes (for CHANGELOG)

- `checked: boolean | 'indeterminate'` → `checked: boolean` + `indeterminate: boolean` (public `indeterminate` prop already existed on our wrapper — now maps 1:1 to Base UI).
- `onCheckedChange(checked)` → `onCheckedChange(checked, eventDetails)` — second param added.
- `className` narrowed to `string`; `render` prop available.

## Behavior changes

- DOM shape: `<button>` → `<span role="checkbox">` + hidden `<input>` (Base UI). `role`, `aria-checked` (incl. `mixed`), keyboard Space toggle, disabled suppression all verified by tests. `peer` class preserved for `peer-disabled` label dimming.
- None else observed.

## Re-baselined screenshots

- None — `pnpm test:visual` 207/207 zero diffs (the `optimizeDeps` fix held; no manual cache clear was needed this run).

## Verify by hand

- Click/Space toggles check + indeterminate icon swaps (`MdiMinusThick`/`MdiCheckBold`).
- `<Label htmlFor>` association toggles the checkbox.
- Disabled checkbox ignores input and dims via `data-checked` states.
