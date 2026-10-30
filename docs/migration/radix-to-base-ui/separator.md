# separator

2026-10-25 · strategy: transformation engine (non-shadcn repo, no golden pair) · verdict: clean migration, zero VRT diffs, all behavior tests pass unchanged.

## Changed

- `packages/react/src/components/separator/separator.tsx` — `@radix-ui/react-separator` → `Separator as BaseSeparator` from `@base-ui/react/separator`. Same classes, same DOM shape (`<div>` with `data-orientation`).
- `packages/react/package.json` — `@base-ui/react` `catalog:` (1.9.0) added to `dependencies`.
- `pnpm-workspace.yaml` — `@base-ui/react: 1.9.0` added to the default catalog.

Leftover scan: `rg "@radix-ui" packages/react/src/components/separator/` → 0 matches.

## Left alone

- `separator.stories.tsx`, `separator.test.tsx`, `index.ts` — unchanged; stories/tests pass as-is.
- `dropdown-menu.tsx`, `select.tsx` — their `DropdownMenuPrimitive.Separator`/`SelectPrimitive.Separator` are menu-scoped Radix parts, migrated in their own handoffs.
- `@radix-ui/react-separator` stays in `dependencies` until step 7 removes all Radix packages.

## API changes (for CHANGELOG)

- None on the public surface: `<Separator decorative orientation className>` is unchanged. `ref` is a normal React 19 prop either way.
- Implementation note: Base UI's `Separator` has no `decorative` prop — ours is preserved as a component-level prop mapped to `role="none"` (decorative) vs `role="separator"` (semantic). Explicit `role` is required because a passed `role={undefined}` would otherwise suppress Base UI's internal role.

## Behavior changes

- None observed. `aria-orientation` still emitted when non-decorative (test-verified); `data-orientation` now comes from Base UI.

## Re-baselined screenshots

- None — `pnpm test:visual` 207/207 with zero changed baselines.

## Verify by hand

- Render `<Separator decorative />` → no role in a11y tree; `<Separator decorative={false} orientation="vertical" />` → `role=separator`, `aria-orientation=vertical`.
- In the Separator story, both orientations render as a 1px `bg-figma-border` line — identical to before.
