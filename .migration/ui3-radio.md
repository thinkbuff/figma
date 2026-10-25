# UI3 restyle: radio

Reference: figma-kit beta @4366bb0 `src/components/radio-group/radio-group.css` (.fp-RadioGroup*).

## Value changes (old → new)
| Aspect | Old | New |
|---|---|---|
| item size | size-3.5 (14px) | size-4 (16px) |
| ring | 1px `border-figma-icon` | 4px transparent border + `outline-figma-icon` 1px @ -1 (figma-kit box model) |
| dot | `after:` pseudo 6px inside indicator (**off-center ~2px — fixed**) | root `data-checked:bg-figma-icon` + `data-checked:border-figma-bg` — 8px padding box is the dot, 4px border is the bg-colored gap (figma-kit box model, geometrically centered); `Radio.Indicator` removed |
| checked | — | dot `bg-figma-icon`; (border stays transparent, figma-kit uses border-color bg — equivalent) |
| focus | any focus: border+outline selected | focus-visible: outline `border-selected` |
| disabled | border/text disabled vars | outline `icon-disabled`; checked dot `icon-disabled` |
| group gaps | gap-2 both | vertical gap-2 (8px), inline/horizontal gap-5 (20px, --space-5) |

New browser test: checked root computes `background-color` = `--figma-color-icon` and
`border-color` = `--figma-color-bg`; unchecked computes `background-color` = `--figma-color-bg`.
(The earlier indicator-centering test was replaced: with the border-gap structure there is no
indicator element to measure.)

## VRT
Re-baselined 3 story shots ×3 = 9 files. Diffs + actuals: `/tmp/ui3-vrt/radio/`.
