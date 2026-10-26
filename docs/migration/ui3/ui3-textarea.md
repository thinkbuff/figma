# UI3 restyle: textarea

Reference: figma-kit beta @4366bb0 `src/components/textarea/textarea.css` (.fp-textarea).

## Value changes
Inherits `inputVariants` (see ui3-input.md): bg-figma-secondary, rounded-figma-md,
outline-only hover/focus/disabled, h governed by content. Added `break-words`
(word-break: break-word). Padding already `px-2 py-1` = figma-kit 4px/8px; `resize-none` kept.

## Figma-kit variants not ported
None.

## VRT
Re-baselined 4 story shots ×3 = 12 files. Diffs + actuals: `/tmp/ui3-vrt/textarea/`.
