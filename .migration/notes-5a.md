# 5a WIP notes (sidekick)

## Done so far
- Collected used utility classes → `.migration/used-classes.txt` (460 tokens, 164 figma-*).
- Copied platform theme generator → `packages/theme/src/theme/` (tokens.ts, utilities.ts, utility-contract.ts, shared-foundation-variables.ts, local-theme-tokens.ts, generate-css-files.ts, colors/*, index.ts).

## Still to do
1. Adapt `src/theme/colors/{figma,figjam,shared,helpers,types,index}.ts` to THIS repo's color data (`src/colors/{base,figma,figjam,index}.ts`, keyed `--figma-color-*`). Old files to consult then delete: `src/colors/`, `src/unocss/`, `scripts/generate-css-files.ts`, `src/constants.ts` (THEME_BASE_CSS → `src/css/preflight.css`).
2. Generated CSS must live at `src/css/`: figma-theme.css, figjam-theme.css, utilities.css, figma.css, figjam.css, index.css (imports both themes + utilities + `@custom-variant dark (&:where(.figma-dark, .figma-dark *));` + preflight in layer(base)). Build copies src/css → dist/css; keep `./css/*` export.
3. Cross-scope semantic utilities needed by components (from used-classes.txt): `bg-figma-{icon,icon-disabled,icon-onbrand,icon-tertiary,text,text-secondary}`, `fill-figma-{bg,bg-menu,bg-tooltip,icon*,icon-danger,icon-disabled,icon-hover,icon-onbrand,icon-ondisabled,icon-secondary,icon-tertiary,icon-tooltip}`, `outline-figma-{icon,text,text-brand,text-danger,text-disabled,text-success}`, `text-figma-border`, `border-figma-icon`, `data-*:` variants. Implement as general family mapping `<prop>-figma-<scope>[-suffix]` → `var(--figma-color-<scope>[-suffix])`.
4. packages/react: tailwindcss + @tailwindcss/vite (catalog), remove unocss plugin/config/`virtual:uno.css`; CSS entry `@import 'tailwindcss'; @import '@thinkbuff/figma-theme/css/index.css';` + `@source`; fix preview.css `var(--color-bg)`→`var(--figma-color-bg)`; published `styles.css` (`@import '@thinkbuff/figma-theme/css/index.css'; @source './dist';`) added to files+exports.
5. Class rewrite in components (DO NOT touch .test/.stories except story icon classes): (a) expand `x:(a b)`; (b) `font-size-11`→`text-figma-sm leading-figma-sm`, `font-size-12`→`text-xs` (no tracking); (c) `rounded-0.5`→`rounded-figma-sm`, `rounded-1`→`rounded` (4px), `rounded-1.5`→`rounded-md` (6px); (d) keep px-N spacing; (e) `!x`→`x!`, `animate-*` etc → TW4.
6. Remove `unocss-preset-animations` classes; record per-component enter/exit in `.migration/animations.md`.
7. Icons: `i-mdi-*`/`i-tabler-*` in components → `src/icons/*.tsx` inline SVG (Apache-2.0/MIT attribution, currentColor, 1em default). Stories switch to `@iconify/tailwind4` plugin + `@iconify-json/{mdi,tabler}`.
8. `cn`: extendTailwindMerge config {text: figma-xs/sm/md/lg, font: figma/figma-code, font-weight group} + tests.
9. playground: @tailwindcss/vite, CSS `@import 'tailwindcss'; @import '@thinkbuff/figma-react/styles.css';`; verify dist CSS contains a `bg-figma-*-pressed` util.
10. README react rewrite (Tailwind v4 + styles.css).
11. theme package.json: drop unocss dep, keep ./colors exports (FigmaLightThemeCSSVariables etc + new generator exports), drop ./unocss export; port platform tests/theme.test.ts replacing colors.test.ts.
12. Verify: install/build/typecheck/check(0 err)/test(NO behavior test edits)/test:visual 0 diffs/storybook dev.

## Key facts
- vitest 5.0.5 browser+VRT (207 baselines `-chromium-darwin` under packages/react/tests/visual/__screenshots__); SB 10.6.2.
- Config files: root vite.config.ts (lint/fmt/staged), packages/*/vite.config.ts (pack+test), react plugins unocss→swap to tailwind.
- Platform cn.ts: platform/packages/figma/ui/src/utils/cn.ts.
- Platform preflight gets swapped in 5b — for now preflight.css = THEME_BASE_CSS from src/constants.ts.
- theme class selectors: `figma-light` (default on html), `figma-dark`, `figjam`.
