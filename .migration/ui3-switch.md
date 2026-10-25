# UI3 restyle: switch

Reference: figma-kit beta @4366bb0 `src/components/switch/switch.css` (.fp-switchRoot/.fp-switchThumb).

## Value changes (old → new)
| Aspect | Old | New |
|---|---|---|
| size | w-6 h-3 (24×12) | w-8 h-4 (32×16) |
| track | 1px border + bg on root (`bg-icon-tertiary`/`bg-brand`/`bg-disabled`) | `::before` carries 1px `border-[#00000033]` (dark `#ffffff33`) + state bg: unchecked `bg-secondary`, unchecked:active `bg-tertiary`, checked `bg-brand`, checked:active `bg-brand-pressed`, disabled `bg-disabled`/`bg-tertiary` |
| thumb | 10px circle, translate-x-3 | 12×8 (w-3 h-2) absolute top-1 left-1 → `data-checked:left-[calc(100%-16px)]`, `outline` 1px `#00000033`→checked `#0000001a`, bg `icon-onbrand`, disabled `icon-ondisabled` |
| focus | none | focus-visible: 1px `border-selected-strong` @ -1 + `before:inset-0.5` (gap between outline and track, as in Figma) |

Path-local rgba literals + `dark:` variants (decision b — no theme change).
`data-disabled:cursor-not-allowed` removed (figma-kit sets no disabled cursor), `transition` 80ms.

## VRT
Re-baselined 4 story shots ×3 = 12 files. Old/diff images: `/tmp/ui3-vrt/switch/`.
Verified: checked = filled brand pill + thumb right; unchecked = secondary track + thumb left.
