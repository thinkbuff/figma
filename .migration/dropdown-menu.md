# dropdown-menu

2026-10-25 · strategy: transformation engine · verdict: migrated, behavior tests 8/8, VRT green.

## Changed

- `src/components/dropdown-menu/dropdown-menu.tsx` — `@radix-ui/react-dropdown-menu` → `Menu` (`@base-ui/react/menu`). Root/Trigger/Group/RadioGroup map directly; `Sub` → `SubmenuRoot`; `SubTrigger` → `SubmenuTrigger`; `Content`/`SubContent` → Portal > Positioner (`z-50`) > Popup (starting/ending-style transitions); `ItemIndicator` → `CheckboxItemIndicator` / `RadioItemIndicator`; `Label` → `GroupLabel`; Arrow renders the 10×5 SVG with side-dependent placement. `className` narrowed to `string`.
- `dropdown-menu.stories.tsx` — Trigger `asChild` → `render={<ActionIcon />}`; `Label` moved inside `RadioGroup`; `avoidCollisions` removed; `sideOffset` 4 → 9 (arrow height no longer added automatically).
- `dropdown-menu.test.tsx` — `onSelect` → `onClick` (API change only; assertions unchanged).

Left alone: inline SVG icons, item styling.

Leftover scan: `rg "@radix-ui" src/components/dropdown-menu/` → 0.

## API changes (for CHANGELOG)

- `Item`'s `onSelect` → `onClick`; `closeOnClick` controls whether the menu closes.
- `Trigger asChild` → `render`.
- `Label` must be rendered inside `Group` or `RadioGroup` (Base UI throws otherwise).
- `Sub` props follow `Menu.SubmenuRoot`; `onOpenChange(open, eventDetails)`.
- `sideOffset` measures to the popup edge; with `<DropdownMenu.Arrow />`, add 5px to keep the old gap.
- `avoidCollisions`, `loop`, `forceMount` removed (Base UI: `loopFocus`, `keepMounted`).

## Behavior changes

- `CheckboxItem` / `RadioItem` no longer close the menu on click (Base UI `closeOnClick` defaults to false for them; Radix closed). Plain items still close. Not patched.
- Submenu opens on hover after Base UI's default delay.

## Re-baselined

- `dropdown-menu-open-*`, `dropdown-menu-submenu-open-*` (×3 themes): menu ~5px further from the viewport edge (Base UI default `collisionPadding` 5 vs Radix 0). Content, arrow and submenu placement otherwise identical.

## Manual QA

- Open via click and keyboard (Enter/ArrowDown); Escape closes and returns focus.
- Submenu via hover and ArrowRight; ArrowLeft closes it.
- Checkbox/radio items toggle and keep the menu open.
