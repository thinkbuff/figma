# tooltip

2026-10-25 · strategy: transformation engine · verdict: clean; 2 open-state screenshots re-baselined (unavoidable positioner geometry delta); 2 `// Base UI:` test updates.

## Changed

- `src/components/tooltip/tooltip.tsx` — `@radix-ui/react-tooltip` → `Tooltip` (`@base-ui/react/tooltip`): Provider, Root, Trigger, Portal, **Positioner**, Popup, Arrow.
  - `TooltipContent` now renders `Portal > Positioner(side, align, sideOffset=4, alignOffset, collisionPadding) > Popup`; arrow stays inside the popup.
  - `TooltipTrigger asChild` → `render={children}` (composed `Tooltip`'s `children` is the trigger element).
  - `delayDuration` → `delay`, `skipDelayDuration` → `timeout` (Provider); `delay`/`closeDelay` on Trigger; `disableHoverableContent` → `disableHoverablePopup` (Root).
  - `className` narrowed to `string` on all wrappers.
- `tooltip.test.tsx` — `aria-describedby` assertions → `data-popup-open` on the trigger (`// Base UI:` comments; Base UI doesn't link trigger↔popup via aria-describedby).
- `tooltip.stories.tsx` + `tooltip.test.tsx` — `delayDuration` → `delay`; `avoidCollisions` arg/argType removed (not a Base UI Positioner prop in 1.9).
- `slider.stories.tsx` — `delayDuration` → `delay`, `updatePositionStrategy="always"` removed (floating-ui-specific, no Base UI equivalent).
- `input.stories.tsx`, `toggle-group.stories.tsx` — `delayDuration` → `delay`.
- `tests/visual/overlays.vrt.test.tsx` — tooltip `open()` now waits for the popup to be fully settled (`data-open` present, no `data-starting-style`/`data-ending-style`, bounding rect stable across two animation frames).

Leftover scan: `rg "@radix-ui" src/components/tooltip/` → 0.

## Left alone

- `index.ts`; radix dep stays until step 7.
- Tooltip had no animation classes (per `.migration/animations.md`) — no `data-[starting-style]` transitions added.

## API changes (for CHANGELOG)

- `delayDuration` → `delay`; `skipDelayDuration` → `timeout`; `disableHoverableContent` → `disableHoverablePopup`; `delay`/`closeDelay` on trigger.
- `avoidCollisions`, `updatePositionStrategy` removed (no Base UI equivalent on Positioner).
- `onOpenChange(open)` → `onOpenChange(open, eventDetails)`; `onOpenChangeComplete` available.
- Trigger: `asChild` → `render`.

## Behavior changes

- Trigger emits `data-popup-open`/`data-base-ui-tooltip-trigger` instead of `aria-describedby`.
- `data-open`, `data-side`, `data-align`, `data-activation-direction` on popup/positioner; `data-uncentered` on the arrow when it can't center on the anchor.

## Re-baselined screenshots

- `tooltip-open-figma-light` + `tooltip-open-figjam` — the popup box is 5px shorter (Base UI's arrow is absolutely positioned vs Radix's in-flow SVG inside Content) and shifts ~5px right (Base UI `collisionPadding` default). Unavoidable positioning-engine delta; content/text identical.

## Verify by hand

- Hover shows tooltip after `delay`; focus shows it; Escape closes; moving off hides it (hoverable-content tracking still works without the pointer-move hack — the `expect.poll` handles it).
- Arrow renders at the correct side; `withArrow={false}` hides it.
