# toggle

2026-10-25 · strategy: transformation engine · verdict: clean migration, zero VRT diffs (one stale-cache flake resolved by clearing `node_modules/.vite`), all tests pass unchanged.

## Changed

- `packages/react/src/components/toggle/toggle.tsx` — `@radix-ui/react-toggle` → `Toggle` from `@base-ui/react/toggle`. `data-[state=on]` classes → `data-[pressed]`; `className` narrowed to `className?: string` per the button review rule; `displayName` literal.

Leftover scan: `rg "@radix-ui" packages/react/src/components/toggle/` → 0 matches.

## Left alone

- `toggle.stories.tsx`, `toggle.test.tsx`, `index.ts` — unchanged; `onPressedChange(pressed)` first arg is compatible.
- `@radix-ui/react-toggle` stays in `dependencies` until step 7.
- `toggle-group` untouched — its own handoff.

## API changes (for CHANGELOG)

- `onPressedChange(pressed)` → `onPressedChange(pressed, eventDetails)` — second param added, first unchanged.
- `className` narrowed to `string` (function form unsupported).
- New passthrough props from Base UI Toggle: `render`.

## Behavior changes

- None observed.

## Re-baselined screenshots

- None — `pnpm test:visual` 207/207 with zero changed baselines (after clearing a stale `node_modules/.vite` dep-optimize cache that initially produced 9 phantom diffs).

## Verify by hand

- Click toggle → `data-pressed` + `aria-pressed` flip; brand styling applies when pressed, `bg-figma-disabled` when pressed+disabled.
