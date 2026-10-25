# UI3 restyle: slider

Reference: figma-kit beta @4366bb0 `src/components/slider/slider.css` (.fp-Slider*, "large" size).

## Value changes (old → new)
| Aspect | Old | New |
|---|---|---|
| root | h-3 | h-6 (24px) + `border-x-8 border-transparent` thumb-inset (figma-kit's `border-width: 0 8px`); `thumbAlignment="center"` added on Root (internal Base UI prop — centers thumb on the value point) |
| track | h-0.5 `bg-figma-tertiary`, overflow-hidden, rounded-full | h-4 (16px) `bg-figma-secondary` + `outline` 1px `#0000001a` (dark `#ffffff1a`), `overflow-visible`, `-mx-2` (-8px inset margins) |
| range (Indicator) | h-full `bg-figma-brand`, disabled `icon-disabled` | h-4 `bg-figma-brand`, disabled `bg-figma-disabled`; extension is **padding-based**: `box-content px-2 -ml-2` (v: `py-2 -mt-2`) — Base UI sets `left`+`width` inline, so `margin-right` can't extend; content-box padding adds the 8px under each thumb |
| thumb | transparent border + `after:` 8px inner dot + outline-2 ring | 16px circle: 4px `border-figma-icon-onbrand` + transparent center + `shadow-figma-elevation-200`; disabled = solid `bg-figma-disabled-secondary`, no border/shadow; focus-visible 1px `border-selected` |

`thumbAlignment="center"` (noted per handoff): positions the thumb centered on the value
point, matching figma-kit; without it Base UI edge-aligns the thumb.
figma-kit's negative-margin range extends ~8px under each thumb (its own Range span sets
`left`+`right`, unlike Base UI's `left`+`width` Indicator — hence the padding trick).
New browser test: indicator left edge ≤ first thumb center, right edge ≥ last thumb center.

## Not ported
figma-kit's small size variant, `fp-SliderHint` (tick marks), `baseValue` styling — we have
no such props/stories.

## VRT
Re-baselined 5 story shots ×3 = 15 files. Old/diff images: `/tmp/ui3-vrt/slider/`.
