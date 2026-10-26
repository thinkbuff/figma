# UI3 restyle: toggle-group

Reference: figma-kit beta @4366bb0 `src/components/segmented-control/segmented-control.css` (.fp-SegmentedControl*).

## Value changes (old → new)
| Aspect | Old | New |
|---|---|---|
| root | flex center, bg-figma, transparent border + hover:border | `inline-flex bg-figma-secondary rounded-figma-md` (segmented container) |
| item size | size-6 fixed | h-6 min-w-6 w-fit `flex-[1_0_auto]` (figma-kit: min-width 24px, flex 1 0 auto) |
| item | no radius, text-figma/fill-icon | `rounded-figma-md`, font-figma-default, `fill-figma-icon-secondary`, whitespace-nowrap |
| pressed | `data-pressed:bg-figma-tertiary` | `data-pressed:bg-figma` + `inset 0 0 0 1px border` ring + `fill-figma-icon` |
| focus | none | focus-visible: 1px `border-selected` @ -1 |
| disabled | pointer-events-none + ondisabled variants | `text-figma-disabled`/`fill-figma-icon-disabled` (icon-disabled) |

Not ported: figma-kit `fp-full-width` (we have no such prop). `disabled` on the group no longer
shows cursor-not-allowed (figma-kit sets none).

## VRT
Re-baselined 4 story shots ×3 = 12 files. Old/diff images: `/tmp/ui3-vrt/toggle-group/`.
