# UI3 restyle: button

Reference: figma-kit beta @4366bb0 `src/components/button/button.css` (.fp-Button).

## Value changes (old → new)
| Aspect | Old | New |
|---|---|---|
| radius | `rounded-md` (6px) | `rounded-figma-md` (5px, --radius-medium) |
| weight | `font-medium` (500) | `font-figma-default` (450) |
| width/select | — | `w-fit select-none appearance-none` |
| focus outline | 2px @ offset -2 | 1px @ offset -1 (base) |
| focus ring (solids) | none | `shadow-[0_0_0_1px_var(--figma-color-border-*-strong)]` |
| focus outline color (solid) | `border-<color>-strong` | primary/success/warning→`border-on*-strong`, danger→`border-ondanger-strong` |
| hover (solid primary/success/danger) | `hover:bg-*-hover` | removed (figma-kit has none) |
| outline/secondary | outline `text`, hover bg-pressed, focus `border-brand-strong` | outline `border`, no hover, focus `border-selected` |
| outline disabled | outline `text-disabled` | outline `border-disabled` |
| disabled cursor | `cursor-not-allowed` | removed (figma-kit: cursor default) |

Solid secondary + warning keep their look (hover stays); their focus adopts the shared
1px-outline+ring shape. `aria-expanded` pressed backgrounds kept on all (Base UI triggers).

## Figma-kit variants not ported
`inverse`, `text` (we have `link` instead — kept as-is). Ours-only: `warning`, outline×color grid.

## VRT
Re-baselined under the pixel-exact comparator: all 21 `Components-Button-*` shots (radius and
weight), plus downstream shots that render a Button: Dialog, AlertDialog, Popover, Toast stories
and the dialog, alert-dialog, sheet and popover open states. Diffs are confined to the button
outlines and corners. The height stays 32px (figma-kit `size="medium"`) because we have no `size` prop;
figma-kit defaults to 24px `small`. Old baselines: `/tmp/ui3-vrt/button-old/`.
