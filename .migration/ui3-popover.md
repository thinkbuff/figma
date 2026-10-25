# UI3 restyle: popover

Reference: figma-kit beta @4366bb0 `src/components/popover/popover.tsx` — its Popup reuses
`dialog.base/dialog.base.css` `.fp-DialogBaseContent`.

## Value changes (old → new)
| Aspect | Old | New |
|---|---|---|
| radius | rounded-figma-sm (2px) | `rounded-figma-lg` (13px, --radius-large) |
| border | `outline-1 outline-figma-border` | removed (`outline: 0` in figma-kit) |
| shadow | `shadow-md` | `shadow-figma-elevation-500` (DialogBaseContent uses --elevation-500) |
| overflow | — | `overflow-y-auto` |
| text | inherited | `text-figma text-figma-sm leading-figma-sm` |

Transitions, Positioner `z-50`, side/align/offset props, Arrow part unchanged.
figma-kit popover has no arrow — ours kept (ours-only part, still `fill-figma-bg` + border stroke).
DialogBaseHeader/Section/Title/Controls structure is a figma-kit-only composition — not ported
(we compose popover content in stories).

## VRT
Re-baselined `popover-open` ×3 — caught a stale-cache false-pass: the first `-t "popover"`
run reported green against the old baseline while rendering old classes; a forced re-capture
confirmed the diff. Old light/dark/figjam baselines saved at `/tmp/ui3-vrt/popover/*-OLD.png`.
New baseline verified: 13px corner curve, no border, elevation-500 shadow edge.
