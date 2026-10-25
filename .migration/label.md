# label

2026-10-25 · strategy: transformation engine (no Base UI counterpart — native `<label>` per migration guide) · verdict: clean migration, zero VRT diffs, all tests pass unchanged.

## Changed

- `packages/react/src/components/label/label.tsx` — `@radix-ui/react-label` → native `<label>`. Same classes (`text-figma-sm leading-figma-sm font-medium cursor-default disabled:* peer-disabled:*`), `htmlFor`/`ref` pass through natively.

Leftover scan: `rg "@radix-ui" packages/react/src/components/label/` → 0 matches.

## Left alone

- `label.test.tsx`, `index.ts` — unchanged; tests pass as-is.
- Consumers (`checkbox`, `radio`, `switch`, `dialog`, `popover`, `sheet` stories/tests) — import `Label` from `../label`, unchanged.
- `@radix-ui/react-label` stays in `dependencies` until step 7.
- The `disabled:`/`peer-disabled:` classes remain — `peer-disabled` still hooks the sibling form control's `disabled` state, same as before.

## API changes (for CHANGELOG)

- None on the public surface: `<Label htmlFor className>` is unchanged.

## Behavior changes

- **Text selection on double-click**: Radix Label called `preventDefault` on `onMouseDown` with `detail > 1`, so double-clicking the label did not select its text. A native `<label>` has no such behavior — double-click now selects the label text and focuses/activates the control per platform defaults. Not re-implemented (per decision); flagged as an accepted delta.
- Otherwise none: `htmlFor` association, `peer-disabled` styling, cursor, and font are unchanged (test-verified).

## Re-baselined screenshots

- None — `pnpm test:visual` 207/207 with zero changed baselines.

## Verify by hand

- Click a `<Label htmlFor=…>` next to a checkbox/radio/switch → native label association activates the control.
- Disabled control → `peer-disabled:*` dims the label (cursor + `text-figma-disabled`).
- Double-click a label → text now selects (accepted delta vs Radix).
