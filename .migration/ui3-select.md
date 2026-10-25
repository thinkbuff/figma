# UI3 restyle: select

Reference: figma-kit beta @4366bb0 `src/components/select/select.css` (trigger) + menu.base (popup).

## Value changes (old → new)
| Aspect | Old | New |
|---|---|---|
| trigger | `h-7`, transparent border, `rounded-figma-sm`, hover border | `h-6` (24px), always `border-figma-border` (1px), `rounded-figma-md`, no hover border |
| trigger disabled | `text-figma-disabled` | + `border-figma-border-disabled` |
| popup | `rounded-figma-sm`, no shadow, List `py-2` | `rounded-figma-lg`, `shadow-figma-menu` (elevation-400), List `p-2` |
| item | `pl-8 pr-4`, `data-highlighted:bg-figma-menu-selected` | `pl-6 pr-2`, `rounded-figma-md`, `data-highlighted:bg-figma-selected-strong` (figma-kit selected), indicator `left-1` |
| label | `px-8 py-1 text-menu-secondary` | `h-6 px-2 text-menu-tertiary` |
| scroll arrows | bare | `bg-figma-menu hover:bg-figma-menu-hover`, `rounded-t/b-figma-lg` |

Same note as dropdown-menu: figma-kit's highlighted bg is `bg-selected-strong`, not our
`bg-menu-selected`. Kept `data-popup-open` trigger outline + focus-visible `border-selected`
(figma-kit defines no focus/open ring for the trigger — ours retained).

## VRT
Re-baselined `select` open ×3 + 6 story shots ×3 = 21 files.
Old/diff images: `/tmp/ui3-vrt/select/`.
