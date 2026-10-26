# select

2026-10-25 · strategy: transformation engine · verdict: migrated, behavior tests 6/6, VRT green.

## Changed

- `src/components/select/select.tsx` — `@radix-ui/react-select` → `Select` (`@base-ui/react/select`). Content = Portal > Positioner (`z-50`, `alignItemWithTrigger`) > Popup > ScrollUpArrow / List / ScrollDownArrow. `Viewport` → `List`; `ScrollUp/DownButton` → `ScrollUp/DownArrow`; `Label` → `GroupLabel`; `Icon`/`ItemIndicator` use `render` for the inline SVGs; Arrow renders the 10×5 SVG. Trigger open styling `data-[state=open]` → `data-[popup-open]`; item highlight `focus:` → `data-[highlighted]:`; Radix CSS vars → `--anchor-width` / `--available-height`. `className` narrowed to `string`.
- `select.stories.tsx` — `position` arg → `alignItemWithTrigger`; `avoidCollisions` removed; every `Root` passes `items`; `OptionWithIcon` labels are React nodes in `items` (no more `Item asChild`); Placeholder story uses `value: null`.
- `select.test.tsx` — Fixture passes `items`; the Escape test now asserts focus returns to the trigger.
- `playground/src/app.tsx` — passes `items`.

Leftover scan: `rg "@radix-ui" src/components/select/` → 0.

## API changes (for CHANGELOG)

- `Root` needs `items` (record or `{ value, label }[]`) for the trigger to show labels instead of raw values. Labels can be React nodes.
- `Content` `position="item-aligned" | "popper"` → `alignItemWithTrigger` (default `true`).
- `Item asChild` removed; put rich content in `items` / children.
- `Label` must be inside `Group`.
- "No value" is `null` (Radix used `''`).
- `onValueChange(value, eventDetails)`; `avoidCollisions` removed.
- `sideOffset` measures to the popup edge; with `withArrow` the default is 9 (was 4 + arrow).

## Behavior changes

- Escape/selection returns focus to the trigger. The Radix wrapper prevented `onCloseAutoFocus`; that suppression is gone.
- Item alignment only applies to mouse input and turns off automatically when there isn't room around the trigger; the list then opens below it.

## Re-baselined

- `select-open-{figma-light,figma-dark,figjam}`: the VRT trigger sits at the top of the viewport, so Base UI falls back from item-aligned to below-trigger placement (Radix overlapped the trigger and could cross the viewport edge). Item content and styling are otherwise identical. All Select story screenshots (incl. OptionWithIcon trigger with icon) are unchanged.

## Manual QA

- Open via click and keyboard; ArrowDown/Enter selects; Escape closes and focuses trigger.
- Item-aligned positioning when the trigger has room above.
- Long list scrolls with the scroll arrows.
