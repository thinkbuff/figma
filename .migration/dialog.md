# dialog

2026-10-25 · strategy: transformation engine · verdict: migrated, behavior tests 5/5, VRT unchanged.

## Changed

- `src/components/dialog/dialog.tsx` — `@radix-ui/react-dialog` → `Dialog` (`@base-ui/react/dialog`). `Overlay` → `Backdrop`; `Content` → Portal > Backdrop + Popup. Backdrop/Popup get Base UI starting/ending-style transitions (opacity, popup scale) with `motion-reduce:transition-none`. `className` narrowed to `string`.
- `dialog.stories.tsx`, `dialog.test.tsx` — Trigger/Close `asChild` → `render`. The story's `onPointerDownOutside` toast guard moved to `Root onOpenChange`, which cancels `outside-press` changes on sonner toasts.

Left alone: Header/Footer/Title/Description styling.

Leftover scan: `rg "@radix-ui" src/components/dialog/` → 0.

## API changes (for CHANGELOG)

- `Trigger`/`Close` `asChild` → `render`.
- `Content` no longer takes `onPointerDownOutside` / `onInteractOutside` / `onEscapeKeyDown` / `onOpenAutoFocus` / `onCloseAutoFocus`. Use `Root onOpenChange(open, eventDetails)` (`eventDetails.reason`, `eventDetails.cancel()`) and `Content` `initialFocus` / `finalFocus`.
- `modal` also accepts `'trap-focus'`.

## Behavior changes

- None observed in tests: focus moves into the popup on open and returns to the trigger on close; Escape closes.

## Re-baselined

- None.

## Manual QA

- Open/close via trigger, Close button, Escape, backdrop click.
- Clicking a sonner toast while the dialog is open does not close it (story).
