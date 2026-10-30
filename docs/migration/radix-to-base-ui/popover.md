# popover

2026-10-25 · strategy: transformation engine · verdict: migrated, all tests and 207/207 VRT green.

## Changed

- `src/components/popover/popover.tsx` — `@radix-ui/react-popover` → `Popover` (`@base-ui/react/popover`): Root, Trigger, Portal, Positioner (`z-50`, side/align/offset props), Popup (starting/ending-style transitions + `motion-reduce:transition-none`), Arrow (custom 14×7 SVG via `render`, side-dependent placement/rotation), Close. `asChild` → `render` on Trigger/Close. `PopoverAnchor` = inert passthrough `<div>` (Base UI has no Anchor — flagged).
- `popover.stories.tsx`, `popover.test.tsx` — `asChild` → `render`; `avoidCollisions` arg removed; story `sideOffset` 4 → 11 (see API changes).
- `src/components/tooltip/tooltip.tsx` — follow-up fix to the tooltip migration: Base UI's Arrow renders an empty element, so the tooltip arrow was invisible. It now renders the 10×5 SVG with side-dependent placement; the composed `Tooltip` defaults `sideOffset` to 9 with an arrow (4 without). Tooltip story no longer pins `sideOffset: 4`.
- `action-icon.tsx`, `button-variants.tsx` — open-trigger styling `data-[state=open]:` → `aria-expanded:`. Both Radix and Base UI set `aria-expanded` on popover/menu/select/dialog triggers, while tooltip triggers are excluded (Base UI tooltip triggers also carry `data-popup-open`, which would wrongly highlight them). ActionIcon story `WithDataState` → `Expanded` (`aria-expanded`), baselines renamed.
- `tests/visual/vrt.setup.ts` — motion frozen (`transition/animation: none`) for deterministic overlay screenshots.

Leftover scan: `rg "@radix-ui" src/components/popover/` → 0.

## API changes (for CHANGELOG)

- `asChild` → `render`; `modal` passthrough; `onOpenChange(open, eventDetails)`; `avoidCollisions`/`updatePositionStrategy` removed.
- `sideOffset` now measures to the popup edge; Radix added the arrow height automatically. With `<Popover.Arrow />`, pass `sideOffset={11}` to keep the previous gap.
- Open-trigger styling uses `aria-expanded` instead of `data-state=open`.

## Behavior changes

- Base UI moves focus into the popup on open and returns it to the trigger on close.
- Initial focus no longer selects the text of a focused input (Radix did).

## Re-baselined

- `popover-open-{figma-light,figma-dark,figjam}`, `tooltip-open-{figma-light,figjam}`: popup ~5px further from the viewport edge because Base UI's default `collisionPadding` is 5 (Radix 0); popover input text no longer selected. Tooltip baselines were restored to the pre-migration Radix captures first, so the only remaining delta is the collision padding. `tooltip-open-figma-dark` matches the Radix capture.

## Manual QA

- Open/close via trigger click, Escape, outside click; focus returns to trigger.
- Arrow points at trigger for all four sides.
- ActionIcon/Button triggers show pressed look while popover is open, not while a tooltip is shown.
