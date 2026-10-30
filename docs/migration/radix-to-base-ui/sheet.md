# sheet

2026-10-25 · strategy: transformation engine · verdict: migrated, behavior tests green, VRT unchanged.

## Changed

- `src/components/sheet/sheet.tsx` — still Dialog-based, now on `@base-ui/react/dialog`. `Overlay` → `Backdrop` (opacity transition); `Content` → Portal > Backdrop + Popup. Each `side` variant slides in and out via `data-[starting-style]` / `data-[ending-style]` translate classes (200ms, `motion-reduce:transition-none`). `className` narrowed to `string` on the Base UI parts.
- `sheet.stories.tsx`, `sheet.test.tsx` — Trigger/Close `asChild` → `render`.
- `src/components/dialog/dialog.stories.tsx` — the Toaster decorator replaced `@radix-ui/react-portal` with `react-dom`'s `createPortal(…, document.body)`. This was the last Radix import in the package.

Leftover scan: `rg "@radix-ui" packages/react/src playground/src` → 0.

## API changes (for CHANGELOG)

- Same as Dialog: `asChild` → `render`; dismiss/focus callbacks go through `Root onOpenChange(open, eventDetails)` and `initialFocus`/`finalFocus`.

## Behavior changes

- None observed in tests.

## Re-baselined

- None.

## Manual QA

- All four sides slide in and out; Escape, backdrop click and Close dismiss the sheet.
