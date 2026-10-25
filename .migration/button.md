# button (+ action-icon)

2026-10-25 · strategy: transformation engine (non-shadcn repo) · verdict: clean migration, zero VRT diffs, all tests pass unchanged.

## Changed

- `packages/react/src/components/button/button.tsx` — `@radix-ui/react-slot` `Slot` → `Button` from `@base-ui/react/button`. `asChild` removed; Base UI `render`, `nativeButton`, `focusableWhenDisabled`, `disabled` props pass through natively. `ButtonProps = Omit<React.ComponentPropsWithRef<typeof BaseButton>, 'color'> & ButtonVariantsProps`.
- `packages/react/src/components/action-icon/action-icon.tsx` — `Slot` → `useRender` (`@base-ui/react/use-render`) + `mergeProps` (`@base-ui/react/merge-props`), `defaultTagName: 'button'`; `asChild` → `render?: React.ReactElement`.
- `pnpm-workspace.yaml` + `packages/react/package.json` — `@base-ui/react` 1.9.0 catalog entry (done under separator).

Leftover scan: `rg "@radix-ui" packages/react/src/components/{button,action-icon}/` → 0 matches.

## Left alone

- `input.tsx` — its `InputSlot` is a local component name, not `@radix-ui/react-slot` (verified imports).
- All `asChild` usages in stories/tests belong to still-Radix primitives (`Dialog.Trigger`, `Popover.Trigger`, `Select.*`, `Sheet.*`, `Tooltip.*`, `AlertDialog.*`, `DropdownMenu.Trigger`, checkbox indicator) — those own `asChild` until their own handoffs.
- `.storybook/preview.tsx` excludes an `asChild` arg control — harmless, cleans up with the last trigger.
- No consumer of `<Button asChild>` or `<ActionIcon asChild>` existed.

## API changes (for CHANGELOG)

- `Button`: `asChild?: boolean` removed → `render?: ReactElement` (Base UI). For non-button elements: `<Button render={<a />} nativeButton={false}>`. New passthrough props: `nativeButton`, `focusableWhenDisabled`.
- `ActionIcon`: `asChild` → `render?: React.ReactElement`.
- `disabled` buttons remain **not** focusable by default (`focusableWhenDisabled` opt-in) — same as Radix.

## Behavior changes

- `data-[state=open]:*` classes on ActionIcon still target Radix `data-state` emitted by still-Radix triggers; they keep working until the overlays migrate (Base UI will emit `data-open` then — update those selectors at that handoff).
- None observed in tests or VRT.

## Re-baselined screenshots

- None — `pnpm test:visual` 207/207 with zero changed baselines.

## Verify by hand

- `<Button>` click/focus/disabled states unchanged; `<Button render={<a/>} nativeButton={false}>` renders an anchor with button styling.
- `<ActionIcon>` renders `<button>` by default, custom element via `render`.
