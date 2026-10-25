# tabs

2026-10-25 · strategy: transformation engine · verdict: clean, zero VRT diffs, one `// Base UI:` test update for the disabled-tab focus delta.

## Changed

- `src/components/tabs/tabs.tsx` — `@radix-ui/react-tabs` → `Tabs` (`@base-ui/react/tabs`). `TabsTrigger` → `Tabs.Tab`, `TabsContent` → `Tabs.Panel`; `data-[state=active]` → `data-[active]`, `disabled:pointer-events-none` → `data-[disabled]:pointer-events-none` (Tab is a `<button>` but emits `aria-disabled`/`data-disabled`, not a native `disabled` attr); `className` narrowed on all four wrappers. Export names unchanged (`Root`/`List`/`Trigger`/`Content`).
- `tabs.test.tsx` — "cannot select a disabled tab" updated (see below).

Leftover scan: `rg "@radix-ui" src/components/tabs/` → 0.

## Left alone

- Stories, index.ts; radix dep stays until step 7. No `Tabs.Indicator` added (not needed visually — no underline indicator in the design).

## API changes (for CHANGELOG)

- `onValueChange(value)` → `onValueChange(value, eventDetails)`.
- `forceMount` → `keepMounted` (Base UI prop name).
- `activationMode` → `activateOnFocus` on `Tabs.List` (Base UI prop name; see behavior delta).
- `className` narrowed to `string`; `render` passthrough.
- Panel state attrs: `data-hidden`, `data-active`; Tab: `data-active`, `data-disabled`, `data-orientation`, `data-index`, `data-activation-direction`.

## Behavior changes

- **`activateOnFocus` default differs**: Radix's default `activationMode="automatic"` activated tabs on focus; Base UI `Tabs.List` defaults `activateOnFocus` to false — arrow keys move focus WITHOUT selecting until Enter/Space. Left at Base UI default (not imitated). No existing test asserted auto-activation.
- **Disabled tabs stay in arrow-key order**: Radix skipped disabled tabs in roving focus; Base UI keeps them focusable (`aria-disabled`, `tabindex` still managed) but non-selectable. Test updated: assert `aria-disabled="true"` + `aria-selected="false"` on Tab C and that Tab A remains selected — same "cannot select" semantics, flagged with `// Base UI:`.

## Re-baselined screenshots

- None — 207/207, zero diffs.

## Verify by hand

- Arrow keys move focus between tabs without selecting (Enter/Space activates); disabled Tab C is reachable by arrows but never selects.
- Active tab styling via `data-active` (bold + `text-figma`); panel switches correctly.
