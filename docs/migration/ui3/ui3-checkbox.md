# UI3 restyle: checkbox

Reference: figma-kit beta @4366bb0 `src/components/checkbox/checkbox.css` (.fp-Checkbox*).

## Value changes (old → new)
| Aspect | Old | New |
|---|---|---|
| size | size-3 (12px) | size-4 (16px) + my-1 (4px vertical margin in 24px row) |
| radius | rounded-figma-sm | rounded-figma-md |
| unchecked | border-figma-icon + bg-figma | border-figma-border-strong + bg-transparent |
| checked | bg-brand + border-bg-brand | bg-brand + border-transparent |
| focus | border + outline selected-strong (any focus) | focus-visible only: outline `border-selected`; checked+focus: border icon-onbrand + outline `border-selected-strong` |
| disabled | border-bg-disabled; checked bg-disabled | border `border-disabled-strong`; checked border transparent + bg `border-disabled-strong` |
| indicator | onbrand always / minus -mt-px | checked icon-onbrand; indeterminate `icon` (icon-disabled when disabled) |

Not ported: figma-kit's grid Root/Label/Description wrapper (ours is the control only);
`cursor-not-allowed` on disabled removed for consistency with the batch.

## VRT
Re-baselined 5 story shots ×3 = 15 files. Diffs + actuals: `/tmp/ui3-vrt/checkbox/`.
