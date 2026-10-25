# UI3 restyle: action-icon

Reference: figma-kit beta @4366bb0 `src/components/icon-button/icon-button.css` (.fp-IconButton).

## Value changes (old → new)
| Aspect | Old | New |
|---|---|---|
| radius | `rounded-figma-sm` (2px) | `rounded-figma-md` (5px) |
| hover | bg-hover + icon-hover color | `hover:bg-figma-pressed` only |
| focus-visible | 2px outline `border-brand-strong` @ -2 | 1px `outline-figma-border-selected` @ -1 |
| disabled | `text-figma-disabled` | `text-figma-icon-disabled` (icon color, like --color-icon) |
| open (aria-expanded) | solid: bg-brand + icon-onbrand | **subtle**: `bg-figma-selected` + `text/fill-figma-icon-brand` |

figma-kit offers `fp-active-appearance-subtle` and `fp-active-appearance-solid`; we have no such
prop — applied **subtle** per direction. Solid would be `bg-figma-selected-strong` + `icon-onbrand`.

## VRT
Re-baselined ×3 themes: `Components-ActionIcon-Expanded` (open-state look changed).
Pre-update diffs + actuals saved: `/tmp/ui3-vrt/action-icon/` (6 pngs).
All other ActionIcon stories passed within threshold (radius 2→5px is sub-threshold at story size).
