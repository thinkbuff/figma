# UI3 restyle: alert-dialog
Ref: figma-kit @4366bb0 alert-dialog/alert-dialog.css + dialog.base.
- Same overlay/radius/shadow/title changes as dialog (bg-figma-overlay, rounded-figma-lg, shadow-figma-modal, font-figma-strong).
- Content `p-6`→`p-4` (figma-kit space-4 padding + gap-4 column layout).
Not ported: fp-size/placement variants; our Header/Footer paddings kept (ours-only composition). VRT: alert-dialog-open ×3; diffs /tmp/ui3-vrt/alert-dialog/.
