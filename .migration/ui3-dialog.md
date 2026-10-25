# UI3 restyle: dialog
Ref: figma-kit @4366bb0 dialog.base/dialog.base.css + dialog/dialog.css.
- Overlay `bg-black/50` → `bg-figma-overlay` (same rgba(0,0,0,.5) as --color-overlay-dialog).
- Content `rounded-figma-sm`→`rounded-figma-lg` (13px), `shadow-lg`→`shadow-figma-modal` (elevation-500).
- Title `text-sm leading-4 font-medium` → `text-figma-sm font-figma-strong` (DialogBaseTitle = strong weight 550).
Not ported: figma-kit placement/size variants (fp-size-1/2/3, fp-placement-top), Header/Section/Controls composition. VRT: dialog-open ×3 re-baselined; diffs /tmp/ui3-vrt/dialog/.
