# Step 5a — UnoCSS → Tailwind CSS v4 migration

## Class mapping table

| UnoCSS | Tailwind v4 | Notes |
|---|---|---|
| `x:(a b)` variant groups | `x:a x:b` | expanded everywhere |
| `font-size-11` | `text-figma-sm leading-figma-sm` | old rule also set lh 16px |
| `font-size-12` | `text-xs` | 12px |
| `font-size-13` | `text-figma-lg` | 13px |
| `font-size-14` | `text-sm leading-4` | 14px + lh 16px |
| `rounded-0.5` | `rounded-figma-sm` | 2px |
| `rounded-1` | `rounded` | 4px |
| `rounded-1.5` | `rounded-md` | 6px |
| `flex-grow` | `grow` | |
| `flex-shrink-0` | `shrink-0` | |
| `left-unset` | `left-auto` | |
| `translate-x-2/5` / `-translate-y-2/5` | `translate-x-[40%]` / `-translate-y-[40%]` | |
| `backdrop-blur-2` | `backdrop-blur` | |
| `Npx` (e.g. `h-1px`, `-mt-1px`) | `N-px` (e.g. `h-px`, `-mt-px`) | |
| `will-change-(a,b)` | `will-change-[a,b]` | |
| `i-mdi-*` / `i-tabler-*` (components) | inline SVG in `src/icons/` | exact path data, license comments |
| `i-mdi-*` / `i-tabler-*` (stories) | `icon-[mdi--*]` / `icon-[tabler--*]` | `@iconify/tailwind4` |
| `animate-in/out`, `fade-*`, `zoom-*`, `slide-*`, `animate-duration-*` | removed | inventory in `.migration/animations.md`; reimplemented in step 6 |

## Root causes fixed during verification

1. **Label line-height collapse**: old `font-size-11` emitted font-size + line-height 16px and beat `leading-none`; under Tailwind, `leading-none` won → 11px labels. Fixed by removing `leading-none` in `label.tsx` (keeps `text-figma-sm leading-figma-sm`). Also added `--text-figma-*--line-height` paired theme keys so `text-figma-*` emits its paired leading.
2. **Unexpanded variant group**: `slider.tsx` retained `after:(block size-2 shrink-0 rounded-full content-[""] bg-figma-icon)` — expanded to separate `after:` utilities; swept all sources for remaining `x:(` groups (none).
3. **Leftover empty `''` entries** in cn()/cva arrays after animation removal — cleaned in dialog, alert-dialog, popover, sheet, dropdown-menu.
4. **Root font-size**: old preflight put `font-size: 11px` on `html`; under rem-based tokens this shrank everything to 11/16. Moved to `body` only so rem anchors at 16px.

## Re-baselined screenshots (22 files)

### (a) FigJam palette now applies (old preset emitted no figjam vars)
- overlays: `dialog-open-figjam`, `dropdown-menu-open-figjam`, `dropdown-menu-submenu-open-figjam`, `popover-open-figjam`, `select-open-figjam`, `sheet-open-figjam`
- stories: `Components-ActionIcon-WithDataState-figjam`, `Components-Button-Primary-figjam`, `Components-Button-WithIcon-figjam`, `Components-Button-WithSpinner-figjam`, `Components-Sheet-Default-figjam`, `Components-Slider-Default-figjam`, `Components-Slider-WithValueTooltip-figjam`, `Components-Toast-Default-figjam`, `Components-Toggle-Pressed-figjam`

### (b) Select highlighted item — UA focus ring removed (TW4 `outline-0` vs UnoCSS width-only)
- overlays: `select-open-figma-light`, `select-open-figma-dark`

### (c) Slider CustomStyle track 2px → 1px (`h-px` now wins, story's intent)
- stories: `Components-Slider-CustomStyle-figma-light`, `Components-Slider-CustomStyle-figma-dark`, `Components-Slider-CustomStyle-figjam`

### (d) Preflight-related story-shell changes (`h3` size, root padding/font stack)
- overlays: `popover-open-figma-light`, `popover-open-figma-dark` (story-only `h3` at 11px)

No unclassified diffs: `pnpm test:visual` passes 207/207 with these updated baselines, verified twice consecutively.

## Follow-up review fixes

- `./colors` export kept source-compatible: `BaseThemeCSSVariables`, `FigmaLightThemeCSSVariables`, `FigmaDarkThemeCSSVariables`, `FigJamLightThemeCSSVariables`, `FigmaThemeCSSVariables`/`FigmaThemeCSSVariableKey`, `FigJamThemeCSSVariables`/`FigJamThemeCSSVariableKey`, `BaseThemeCSSVariableKey`, `ThemeCSSVariableKey`, `ThemeColorScope`, `getCSSPreflights` and `generateCSSVariables` (old `--color-*` alias output format preserved verbatim). Covered by a compat test in `src/colors/diff.test.ts`.
- Variable-map diff old vs new: **Base +0/-0/~0, FigmaLight +0/-0/~0, FigmaDark +0/-0/~0, FigJam +0/-0/~0** — all keys and values identical.
- `@thinkbuff/figma-theme` moved to `dependencies` (`workspace:^`) in `@thinkbuff/figma-react` — consumers no longer install it separately; removed from peerDependencies/devDependencies.
- `files` dedup: `styles.css` covered by `*.css`.
- package.json keywords: `unocss*` → `tailwindcss*`; `unocss.config.ts` dropped from tsconfig.node.json include. Remaining `unocss` mentions exist only in `docs/adr/0001-figma-theme-single-source.md` (historical decision record).
