# UI3 restyle: tooltip

Reference: figma-kit beta @4366bb0 `src/components/tooltip/tooltip.css` (.fp-tooltip).

## Value changes (old → new)
| Aspect | Old | New |
|---|---|---|
| padding | px-3 py-2 | `px-2 py-1` (4px 8px) + `min-h-6` (24px) |
| radius | rounded-figma-sm (2px) | `rounded-figma-md` (5px) |
| shadow | none | `shadow-figma-tooltip` (= elevation-300, figma-kit `--shadow-tooltip`) |
| text wrap | default | `whitespace-pre-wrap break-words` (figma-kit) |
| arrow | 10×5 polygon | 14×7 (figma-kit `--space-3_5`×7px); side offsets scaled (-1.5 tip overlap; ±10.5 for left/right) |

bg-figma-tooltip / text-figma-tooltip / fill-figma-icon-tooltip unchanged — our tokens
already match figma-kit's `--color-bg-tooltip` #1e1e1e / `--color-text-tooltip` #fff.

## VRT
Re-baselined `tooltip-open` ×3. Old/diff images: `/tmp/ui3-vrt/tooltip/`.
Verified open state in the new baseline: dark box, 14×7 arrow below, tighter padding.
