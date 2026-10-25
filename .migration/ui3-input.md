# UI3 restyle: input

Reference: figma-kit beta @4366bb0 `src/components/input/input.css` (.fp-Input).

## Value changes (old → new)
| Aspect | Old | New |
|---|---|---|
| height | h-8 (32px) | h-6 (24px, --space-6) |
| padding | px-2 | py-1 pl-2 pr-0 (4px 0 4px 8px) |
| background | bg-figma | bg-figma-secondary |
| radius | rounded-figma-sm (2px) | rounded-figma-md (5px) |
| border | `border` utility + 1px outline @ -2 | no border; 1px outline @ -1 |
| default rest | border-transparent | outline-transparent |
| default hover | hover:border-figma | `not-disabled:not-focus:hover:outline-figma-border` |
| focus | border-selected + outline border-selected | outline `border-selected` |
| disabled | transparent/disabled borders | bg-figma + outline `border-disabled` + text-disabled |

Kept ours-only: `variant='border'` (now `outline-figma-border` at rest), `invalid`
(outline `border-danger`; focus keeps danger outline — restyled consistently since
figma-kit has no invalid state).

## Figma-kit variants not ported
None applicable (figma-kit input has no variants).

## VRT
Re-baselined 8 story shots ×3 = 24 files. Downstream re-baselines (diffs confirmed
inside the input's region / layout reflow from 32→24px): dialog-open, sheet-open,
popover-open ×3 each = 9 files.
Diffs + actuals saved: `/tmp/ui3-vrt/input/`.
