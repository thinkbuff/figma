# UI3 restyle: dropdown-menu

Reference: figma-kit beta @4366bb0 `src/components/menu.base/menu.base.css` + `dropdown-menu/dropdown-menu.tsx`.

## Value changes (old → new)
| Aspect | Old | New |
|---|---|---|
| popup | `py-2`, `rounded-figma-sm`, `shadow-md` | `p-2`, `rounded-figma-lg` (13px), `shadow-figma-menu` (elevation-400), `text-figma-sm` |
| item | `pl-8 pr-4`, hover/focus `bg-menu-selected` | `px-2`, `rounded-figma-md`, `data-highlighted:bg-figma-selected-strong` (figma-kit maps `--color-bg-menu-selected` → `--figma-color-bg-selected-strong`, **not** our `bg-menu-selected` #0c8ce9 — followed figma-kit) |
| disabled item | `text-menu-disabled` | `text-figma-menu-tertiary` (figma-kit `--color-text-menu-tertiary`) |
| checkbox/radio items | shared item padding, indicator `left-2` | `pl-6` (24px) + indicator `left-1` (4px) |
| label | `px-8 py-1 text-menu-secondary font-medium` | `h-6 px-2 text-menu-tertiary` flex row |
| separator | `border-t border-figma-menu` | `my-2 h-px bg-figma-border-menu` |
| group | bare passthrough | `py-2 first:pt-0 last:pb-0 not-first:border-t border-figma-border-menu` |
| sub-trigger caret | `size-2 rotate-90` | + `ml-auto pl-6 -mr-2` (figma-kit spacing) |

Not ported: `:has()` label left-pad when a menu contains check/radio items (no Tailwind-native
equivalent for ancestor-conditional padding); figma-kit MenuItemIndicator absolute-at-4px covered.
Arrow kept (ours-only part; figma-kit menus have none).

## VRT
Re-baselined `dropdown-menu` + `dropdown-menu-submenu` open ×3 = 6 files.
Old/diff images: `/tmp/ui3-vrt/dropdown-menu/`.
