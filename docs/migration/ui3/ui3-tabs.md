# UI3 restyle: tabs

Reference: figma-kit beta @4366bb0 `src/components/tabs/tabs.css` (.fp-TabsList/.fp-TabsTrigger).

## Value changes (old → new)
| Aspect | Old | New |
|---|---|---|
| list | inline-flex center + `border-b border-figma` | `flex gap-1 overflow-y-auto` (no border) |
| trigger | px-3, no height/radius | h-6 (24px) px-2 (8px), `rounded-figma-md`, `whitespace-nowrap`, `shrink-0` |
| colors | text-secondary, hover→text-figma | text-secondary + `fill-figma-icon-secondary`; hover → `bg-figma-secondary` only |
| active | text-figma + font-bold | `font-figma-strong` (550) + text-figma + `fill-figma-icon` + `bg-figma-secondary` chip |
| disabled | pointer-events-none | `text-figma-disabled` (hover suppressed via `not-data-disabled`) |

Not ported: nothing — figma-kit has no extra variants. Root/Content `bg-figma` kept (ours-only).

## VRT
Re-baselined 3 story shots ×3 = 9 files (30 total incl. any listed above). Old/diff images: `/tmp/ui3-vrt/tabs/`.
