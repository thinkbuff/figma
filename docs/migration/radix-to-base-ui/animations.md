# Animations removed in step 5a (UnoCSS preset-animations → Base UI transitions in step 6)

All `animate-in/out`, `fade-*`, `zoom-*`, `slide-*`, `animate-duration-*` utility classes were removed from components. Step 6 reimplements these as Base UI `data-starting-style` / `data-ending-style` transitions.

## alert-dialog
- open: `animate-in fade-in-0 zoom-in-95 slide-in-from-left-1/2 slide-in-from-top-12/25` (duration 200ms)
- closed: `animate-out fade-out-0 zoom-out-95 slide-out-to-left-1/2 slide-out-to-top-12/25` (duration 200ms)

## dialog
- open: `animate-in fade-in-0 zoom-in-95 slide-in-from-left-1/2 slide-in-from-top-12/25` (duration 200ms)
- closed: `animate-out fade-out-0 zoom-out-95 slide-out-to-left-1/2 slide-out-to-top-12/25` (duration 200ms)

## dropdown-menu
- open: `animate-in fade-in-0 zoom-in-95` + `data-[side=*]:slide-in-from-{top|bottom|left|right}-2`
- closed: `animate-out fade-out-0 zoom-out-95`

## popover
- open: `animate-in fade-in zoom-in-95` + `data-[side=*]:slide-in-from-{top|bottom|left|right}-1`
- closed: `animate-out fade-out zoom-out-95`

## sheet
- open: `animate-in fade-in-0` (duration 240ms) + `data-[side=*]:slide-in-from-{top|bottom|left|right}`
- closed: `animate-out fade-out-0` (duration 120ms) + `data-[side=*]:slide-out-to-{top|bottom|left|right}`

Not animated before / unchanged: checkbox, radio, select, slider, switch, tabs, toast (sonner-driven), tooltip, scroll-area, separator, label, input, textarea, toggle, toggle-group, button, action-icon.
