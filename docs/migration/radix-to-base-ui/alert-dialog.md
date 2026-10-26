# alert-dialog

2026-10-25 · strategy: transformation engine · verdict: migrated, behavior tests 4/4, VRT unchanged.

## Changed

- `src/components/alert-dialog/alert-dialog.tsx` — `@radix-ui/react-alert-dialog` → `AlertDialog` (`@base-ui/react/alert-dialog`). `Overlay` → `Backdrop`; `Content` → Portal > Backdrop + Popup with starting/ending-style transitions. Base UI has no Action/Cancel parts, so both `Action` and `Cancel` are `AlertDialog.Close` (both close the dialog, same as Radix). `className` narrowed to `string`.
- `alert-dialog.stories.tsx`, `alert-dialog.test.tsx` — `asChild` → `render`.

Leftover scan: `rg "@radix-ui" src/components/alert-dialog/` → 0.

## API changes (for CHANGELOG)

- `Trigger`/`Action`/`Cancel` `asChild` → `render`.
- `Content` focus/dismiss callbacks moved to `Root onOpenChange(open, eventDetails)` and `initialFocus`/`finalFocus`, same as Dialog.

## Behavior changes

- None observed: `role="alertdialog"`, outside press does not close, Escape closes, Action/Cancel close.

## Re-baselined

- None.

## Manual QA

- Open, Cancel, Action, Escape; focus returns to the trigger.
