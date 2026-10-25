# scroll-area

2026-10-25 · strategy: transformation engine · verdict: clean after two fixes; 207/207 VRT.

## Changed

- `src/components/scroll-area/scroll-area.tsx` — `@radix-ui/react-scroll-area` → `ScrollArea` (`@base-ui/react/scroll-area`: Root, Viewport, Scrollbar, Thumb, Corner). `className` narrowed to `string`.
- Two fixes to keep visuals identical:
  1. Removed `[&>div]:!block` from the viewport — it was a Radix hack for its `display:table` inner wrapper; Base UI renders no inner div, so the selector was hitting consumer content (the story's `flex flex-col` container) and breaking layout (the 3 ScrollArea-Default diffs).
  2. Added `opacity-0 transition-all data-[hovering]:opacity-100 data-[scrolling]:opacity-100` on `ScrollBar` — Radix `type="hover"` hid the scrollbar at rest; Base UI renders it visible. Base UI emits `data-hovering`/`data-scrolling` on the scrollbar during hover/scroll, matching the old show-on-hover semantics.

Leftover scan: `rg "@radix-ui" src/components/scroll-area/` → 0.

## Left alone

- Test, story, index.ts; radix dep stays until step 7.

## API changes (for CHANGELOG)

- `type` (`"always"|"hover"|"scroll"|"auto"`) and `scrollHideDelay` removed — no Base UI equivalent; Base UI's hover/scroll visibility is now styled via `data-hovering`/`data-scrolling`.
- `className` narrowed to `string`; `render` passthrough on parts.

## Behavior changes

- Scrollbar shows on `data-hovering` (pointer over the scroll area) / `data-scrolling` — equivalent to Radix `type="hover"` minus the hide delay (Base UI drops it immediately when hover ends; accepted delta).
- `aria-hidden="true"` on the scrollbar track — same as Radix.

## Re-baselined screenshots

- None — 207/207 after the two fixes.

## Verify by hand

- Scroll the list → scrollbar appears during hover/scroll, hides at rest; track width and thumb color unchanged.
