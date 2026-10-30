# Changelog


## v0.1.0

### ⚠️ Breaking Changes

#### Styling: UnoCSS → Tailwind CSS v4

- `@thinkbuff/figma-theme/unocss` is removed. The theme now ships Tailwind v4 CSS (`@thinkbuff/figma-theme/css/*`) generated from the Figma tokens; `@thinkbuff/figma-theme/colors` is unchanged.
- `@thinkbuff/figma-react` ships `styles.css`, so consumers only need:
  ```css
  @import 'tailwindcss';
  @import '@thinkbuff/figma-react/styles.css';
  ```
- Utilities follow the theme's utility contract (`text-figma-sm`, `rounded-figma-sm`, `bg-figma-*`, …). Dark mode is `.figma-dark`; FigJam is `.figjam`.
- Components use inline SVG icons, so no icon preset is needed.

#### `Button` API rework

- `variant` + `color` collapsed into a single `variant`: `primary`, `secondary`, `destructive`, `secondary-destructive`, `inverse`, `success`, `figjam`, `link`, `link-danger`, `ghost`. `size="wide"` replaces `fullWidth`; new `icon` slot prop.

| Before | After |
| --- | --- |
| `variant="solid" color="primary"` (default) | `variant="primary"` |
| `variant="solid" color="danger"` | `variant="destructive"` |
| `variant="solid" color="success"` | `variant="success"` |
| `variant="solid" color="inverse"` | `variant="inverse"` |
| `variant="outline"` / `color="secondary"` | `variant="secondary"` |
| `variant="outline" color="danger"` | `variant="secondary-destructive"` |
| `variant="link" color="danger"` | `variant="link-danger"` |
| `variant="link"` | `variant="link"` |
| `variant="ghost"` | `variant="ghost"` |
| `fullWidth` | `size="wide"` |

#### `ActionIconSplit` added

- New compound component for the UI3 `Button icon split` set (41x24 small / 49x32 large): `ActionIconSplit` root plus `Button` (primary action) and `Chevron` (16px trigger half) subparts. Each half supports `render`, `aria-expanded` fills follow the dialog-toggle spec.

#### `ActionIcon` / `Toggle` API rework

- `ActionIcon`: `activeAppearance` removed (the on state now always follows the UI3 dialog-toggle spec); new `variant="secondary"` for the stroked `Button icon` variant.
- `Toggle`: `stroke` replaced by `variant` — `'highlighted'` (default, previous fill behavior), `'default'` (icon-swap only, no pressed fill), `'secondary'` (the former `stroke` look with the `bordertranslucent` token).

#### Menu items: UI3 tokens + `ItemSwitch`

- `DropdownMenu.ItemSwitch` and `ContextMenu.ItemSwitch` added: a `menuitemcheckbox` row with a Switch cell on the leading side (the spec's `Menu row/Toggle`). Clicking the row toggles the switch; the menu stays open.
- Menu row highlight now uses `bg-menu-selected` (was `bg-selected-strong` — visibly wrong in FigJam dark). `ItemBadge` uses `bg-toolbar` + `text-onbrand`; `ItemCheck` renders the spec's plain 16px check icon instead of a filled chip. Disabled items unify on `text-menu-disabled` / `icon-menu-disabled`.

#### Fields: UI3 variants and states

- `Select.Trigger`: new `stroke` prop (`Stroke=False` renders borderless on `bg-default`); focus and open states are a single `border-selected` swap (the extra outline ring is removed); the open value shows the spec's `texthighlight` block; the `icon` lead is a flush 24px cell, and on `size="large"` a 32px cell holding the spec's 24px `bg-secondary` well.
- `VariableChip` is 16px tall (was 18px) and uses `border-disabled` when disabled.
- New `VariableCell`: the spec's `Variable Cell` — a 24px bordered row with the variable icon cell plus a label.
- `ValueField.NumericSelect`: the dropdown segment uses `bg-selected` + `border-selected` while open (the spec's selected-chevron state).

#### Slider and Swatch: UI3 spec variants

- `Slider`: new `modified` prop renders the spec's `Stroke (Modified)` thumb (`bg-default` knob, `icon-onbrand` ring, elevation-300). Hue/opacity thumbs now embed the spec's 12px `_Chit 24` square instead of a 6px disc. Disabled thumb uses `bg-disabled` (was `bg-disabled-secondary`); the track and gradient-chit rings use the `bordertranslucent` token (were hardcoded); stepper ticks use `icon-tertiary` / `icon` (were `black/30` / `black/85`).
- `Swatch`: new `type="opacity"` (left half solid, right half at ~24% alpha — the spec's `Type=Opacity`) and `shape="circle"` (the spec's 16px round chit). The inset ring now uses `bordertranslucent` (same values as the previous hardcoded hexes — no visual change).

#### Avatar and Badge: UI3 spec variants

- `Avatar`: initials fills now bind to the `multiplayer*` / `textonmultiplayer*` tokens (were hardcoded light-theme hexes — dark themes were visibly wrong). Colors renamed to spec names (`magenta`→`pink`, `slate`→`grey`); new `overflow-unread` / `overflow-read` colors for "+N" avatars; new `disabled` prop (`bg-tertiary` + `text`); `shape="square"` uses `rounded-figma-sm` at `size="small"` (spec r=2).
- `Badge`: `size="small"` (14px) removed — no such badge in the spec; `size="large"` added (16px with 13px text — the spec's "Badge large"). New `variant="alt"` for the "Badge small alt" subtle-fill family (`default`/`count`/`count-inactive`/`strong`); new colors `figjam`, `menu`, `merged`, `archived`; the `warning` strong fill uses `icon-warning` per spec. New `BadgeDot` (the spec's "Badge Dot": 9px `bg-default` pill + 5px `bg-brand` dot).

#### Radio, Tabs, Toast, Visual Bell, ScrollArea: UI3 tokens and states

- `Radio` button variant: default border now uses `bordertranslucent` (was opaque `border`).
- `Tabs`: trigger gains the spec's `border-selected` focus ring; unselected hover uses `bg-hover` (same values, correct token).
- `Toast`: surface uses `bg-menu` / `text-menu` tokens (same values); shadow upgraded to the spec's "LEGACY - HUD shadow" via new `shadow-figma-hud` utility.
- `VisualBell`: `color="default"` is now the spec's light bell (`bg-default` + `text` + elevation-100) — replaces the dark `#2c2c2c` hardcoded fill. Action/dismiss edges use `bordertranslucent`; hover/active use the secondary-button transparent tokens.
- `ScrollArea`: thumb uses the `scrollbar` token via new `bg-figma-scrollbar` utility (was `text-secondary`).

#### Remaining UI3 audit items

- `Switch`: `indeterminate` renders the spec's `icon.16.mixed` glyph (16px, `icon-onbrand`; `icon-disabled` when disabled) instead of a hand-drawn bar.
- `Input`/`Textarea`: disabled state follows the spec per size — `size="default"` keeps `bg-default` + `border-default` stroke; `size="large"` stays `bg-secondary` with no stroke.
- Disabled colors aligned to the spec's tokens where values are identical: `text-tertiary` on `Select`, `ToggleGroup` items and labels, and all ValueField elements; `border-default` on ValueField outlines.
- `LinkTooltip.Action`: new `strong` prop for the spec's `body.medium.strong` CTA weight (w550).
- `Separator`: documented per-surface divider tokens — menu/tooltip surfaces should pass `bg-figma-border-menu`/`bg-figma-border-tooltip`.
- `AlertDialog` story CTA gap aligned to the Modal footer's 8px rhythm.

#### Tokens: generated from `packages/theme/tokens/`

- `@thinkbuff/figma-theme/colors` no longer exports `BaseThemeCSSVariables`/`BaseThemeCSSVariableKey` — each mode map is complete on its own.
- New exports: `FigJamDarkThemeCSSVariables`, `DevModeLightThemeCSSVariables`, `DevModeDarkThemeCSSVariables`, `SlidesLightThemeCSSVariables`, `SlidesDarkThemeCSSVariables` (+ types).
- Token values are now generated from `packages/theme/tokens/` via `pnpm tokens:import`; the FigJam block no longer claims `:root` (that selector is Figma light only).

#### Primitives: Radix UI → Base UI (`@base-ui/react`)

- `asChild` → `render` everywhere (e.g. `<Dialog.Trigger render={<Button />} />`). Use `nativeButton={false}` when rendering a non-button element through `Button`.
- Change callbacks receive a second `eventDetails` argument (`onValueChange`, `onCheckedChange`, `onPressedChange`, `onOpenChange`). Dismissal is cancelled via `eventDetails.cancel()` instead of `event.preventDefault()` on `onPointerDownOutside` / `onEscapeKeyDown` / `onInteractOutside` (removed).
- State attributes follow Base UI: `data-checked`, `data-unchecked`, `data-pressed`, `data-active`, `data-popup-open`, `data-highlighted`, `data-starting-style` / `data-ending-style`. Open triggers are styled through `aria-expanded`.
- Overlays (`Popover`, `Tooltip`, `DropdownMenu`, `Select`) position through a Base UI Positioner: `avoidCollisions` and `updatePositionStrategy` are removed, `collisionPadding` defaults to 5, and `sideOffset` measures to the popup edge (no automatic arrow height).
- `Checkbox`: `checked="indeterminate"` → `indeterminate` prop.
- `ToggleGroup`: `type="single" | "multiple"` → `multiple`; `value` / `defaultValue` are always arrays.
- `Slider`: `onValueCommit` → `onValueCommitted`; `minStepsBetweenThumbs` → `minStepsBetweenValues`; `inverted` removed; `SliderRoot` wraps a Base UI `Control`.
- `ScrollArea`: `type` / `scrollHideDelay` removed; the scrollbar shows while hovering or scrolling.
- `Tabs`: `activationMode` → `activateOnFocus` (default `false`: arrow keys move focus without selecting); `forceMount` → `keepMounted`; disabled tabs stay focusable.
- `Tooltip`: `delayDuration` → `delay`, `skipDelayDuration` → `timeout`, `disableHoverableContent` → `disableHoverablePopup`; `delay` / `closeDelay` live on the trigger.
- `DropdownMenu`: `Item onSelect` → `onClick`; `Label` must be inside `Group` / `RadioGroup`; checkbox and radio items keep the menu open.
- `Select`: pass `items` to `Root` so the trigger shows labels; `position` → `alignItemWithTrigger`; `Item asChild` removed; the empty value is `null`; `Label` must be inside `Group`; focus returns to the trigger on close.
- `Dialog` / `AlertDialog` / `Sheet`: `Overlay` renders Base UI `Backdrop`; `AlertDialog.Action` and `AlertDialog.Cancel` both close the dialog.
- `Label` is a native `<label>`.
- `react` / `react-dom` peer range is now `^19`: components forward `ref` as a prop, which React 18 cannot pass to function components. Node `>=24.21.0`.

#### Theme tokens: UI3 sync

- Spacing renumbered to the UI3 scale: `--figma-space-5` is now 32px (was 20px), `--figma-space-6` is now 40px (was 28px), and `--figma-space-7` is removed. Utilities such as `p-figma-5` / `gap-figma-6` follow the new values.

#### Components: UI3 look

- Components are restyled to Figma's UI3 against the official [UI3 Design file](https://www.figma.com/community/file/1486123838948777078/ui3-figmas-ui-kit) and its exported variables. Layouts may shift: `Input`, `Select` triggers, `Tabs` and `ToggleGroup` items are 24px tall (were 32px), `Checkbox` and `Radio` are 16px, and `Switch` is 32×16.
- Solid buttons have no hover background; focus is a 1px outline plus a 1px ring. Fields are outline-only on `bg-secondary`. Menus, popovers and dialogs use 13px radius and elevation shadows; menu highlight is `bg-menu-selected`.
- `ActionIcon` open state (`aria-expanded`) is now subtle (`bg-selected`) instead of solid brand.
- Inline `RadioGroup` items are 20px apart (were 8px).

Per-component details, behavior notes and QA checklists live in `docs/migration/`.

### 🚀 Features

- UI3 semantic typography utilities: `text-figma-body-{small,medium,large}` and `text-figma-heading-{small,medium,large}` set size, leading and tracking in one class; the `heading-*` variants also apply `font-weight: 550`. Matching `leading-figma-*` and `tracking-figma-*` utilities are available.
- UI3 elevation shadows: `shadow-figma-elevation-{100..500}` plus semantic `shadow-figma-tooltip` / `shadow-figma-menu` / `shadow-figma-modal` (elevation 300/400/500). Elevations are theme-scoped, so `.figma-dark` gets the dark values (inset highlights) even on nested elements; `shadow-figma-slider` is unchanged.

### 🧹 Chore

- Toolchain moved to Vite+ (`vp check` / `vp test` / `vp pack`), Oxlint and Oxfmt, pnpm catalogs, Storybook 10.
- Added Vitest unit, browser-mode behavior and visual regression tests.

## v0.0.8

[compare changes](https://github.com/thinkbuff/figma/compare/v0.0.7...v0.0.8)

### 🧹 Chore

- Update dependencies and fix type references ([d98b712](https://github.com/thinkbuff/figma/commit/d98b712))

### ❤️ Contributors

- Eleven ([@eteplus](http://github.com/eteplus))

## v0.0.7

[compare changes](https://github.com/thinkbuff/figma/compare/v0.0.6...v0.0.7)

### 🐛 Fixes

- **utils:** Optimize parameter validation logic for `createImageByUrlOrBytes` ([e88c6a7](https://github.com/thinkbuff/figma/commit/e88c6a7))

### 🧹 Chore

- Update dependencies and set packageManager to pnpm@9.1.4 ([93500ed](https://github.com/thinkbuff/figma/commit/93500ed))

### ❤️ Contributors

- Eleven ([@eteplus](http://github.com/eteplus))

## v0.0.6

[compare changes](https://github.com/thinkbuff/figma/compare/v0.0.5...v0.0.6)

### 🚀 Features

- **react:** Optimize styles for `textarea` and `input` components ([516fe6c](https://github.com/thinkbuff/figma/commit/516fe6c))

### ❤️ Contributors

- Eleven ([@eteplus](http://github.com/eteplus))

## v0.0.5

[compare changes](https://github.com/thinkbuff/figma/compare/v0.0.4...v0.0.5)

### 🚀 Features

- **react:** Optimize DOM and styles for `textarea` and `input` components ([94840cd](https://github.com/thinkbuff/figma/commit/94840cd), [f98a41e](https://github.com/thinkbuff/figma/commit/f98a41e))

### 🐛 Fixes

- **storybook:** Fix type error when setting summary value ([40f7c26](https://github.com/thinkbuff/figma/commit/40f7c26))

### 🧹 Chore

- Update dependencies and set packageManager to pnpm@9.1.1 ([42b7567](https://github.com/thinkbuff/figma/commit/42b7567))

### ❤️ Contributors

- Eleven ([@eteplus](http://github.com/eteplus))

## v0.0.4

[compare changes](https://github.com/thinkbuff/figma/compare/v0.0.3...v0.0.4)

### 🚀 Features

- **utils:** Implement MessageChannel ([046721d](https://github.com/thinkbuff/figma/commit/046721d))
- **utils:** Add utilities for image paint and node ([45ff957](https://github.com/thinkbuff/figma/commit/45ff957))
- **utils:** Enhance type definitions ([fa9874b](https://github.com/thinkbuff/figma/commit/fa9874b))

### 🧹 Chore

- **react:** Fix directory value of repository ([0d904b4](https://github.com/thinkbuff/figma/commit/0d904b4))
- Update deps and set `packageManager` to `pnpm@9.0.4` ([2adb5bf](https://github.com/thinkbuff/figma/commit/2adb5bf))

### ❤️ Contributors

- Eleven <eteplus@outlook.com>

## v0.0.3

[compare changes](https://github.com/thinkbuff/figma/compare/v0.0.2...v0.0.3)

### 🚀 Features

- **theme:** Add light theme variables to `html` selector ([e6cab7e](https://github.com/thinkbuff/figma/commit/e6cab7e))
- **react/action-icon:** Add the `asChild` prop for changing the default rendered element ([751881f](https://github.com/thinkbuff/figma/commit/751881f))

### 📖 Documentation

- **react:** Add `content` in `unocss` config ([556fe38](https://github.com/thinkbuff/figma/commit/556fe38))

### ❤️ Contributors

- Eleven ([@eteplus](http://github.com/eteplus))

## v0.0.2

[compare changes](https://github.com/thinkbuff/figma/compare/v0.0.1...v0.0.2)

### 🐛 Fixes

- **react:** Correct `exports` field ([6d093a1](https://github.com/thinkbuff/figma/commit/6d093a1))

### 🧹 Chore

- Update `homepage`, `repository`, `bugs` in package.json ([f2013b3](https://github.com/thinkbuff/figma/commit/f2013b3))
- Udpate deps and set `packageManager` to `pnpm@9.0.1` ([cc7eb8a](https://github.com/thinkbuff/figma/commit/cc7eb8a))

### ❤️ Contributors

- Eleven ([@eteplus](http://github.com/eteplus))

## v0.0.1


### 🚀 Features

- Setup project with storybook and unocss ([2eea160](https://github.com/thinkbuff/figma/commit/2eea160))
- **react:** Add button component and stories ([2eea160](https://github.com/thinkbuff/figma/commit/2eea160))
- **react/button:** Remove ghost variant, add with icon and loading story ([abf3533](https://github.com/thinkbuff/figma/commit/abf3533))
- **react:** Add ActionIcon component and stories ([a22bdf7](https://github.com/thinkbuff/figma/commit/a22bdf7))
- **react:** Add Checkbox component and stories ([731a7e0](https://github.com/thinkbuff/figma/commit/731a7e0))
- **theme:** Add base theme css variables ([437d390](https://github.com/thinkbuff/figma/commit/437d390))
- **react:** Add Tooltip commponent and stories ([b375cc1](https://github.com/thinkbuff/figma/commit/b375cc1))
- **react:** Add Input commponent and stories ([48475ca](https://github.com/thinkbuff/figma/commit/48475ca))
- **react/input:** Add invalid variant ([cb7f1ea](https://github.com/thinkbuff/figma/commit/cb7f1ea))
- **react:** Add Textarea component and stories ([a04e2b6](https://github.com/thinkbuff/figma/commit/a04e2b6))
- **react/tooltip:** Refactor Tooltip component for simplified usage ([e061d72](https://github.com/thinkbuff/figma/commit/e061d72))
- **react:** Add Select component and stories ([c9da673](https://github.com/thinkbuff/figma/commit/c9da673))
- **react:** Optimize styles for Select component and code for Input and Button components ([b2db721](https://github.com/thinkbuff/figma/commit/b2db721))
- **react:** Add Switch, Label components and stories ([128a43b](https://github.com/thinkbuff/figma/commit/128a43b))
- **react:** Add Radio components and stories ([4e5c636](https://github.com/thinkbuff/figma/commit/4e5c636))
- **react/radio:** Add support for setting orientation property ([3a5742e](https://github.com/thinkbuff/figma/commit/3a5742e))
- **react/radio:** Use inline property instead of orientation property to control layout ([70a4205](https://github.com/thinkbuff/figma/commit/70a4205))
- **react:** Add Tabs components and stories ([456249c](https://github.com/thinkbuff/figma/commit/456249c))
- **react:** Add Slider components and stories ([bc2fc3d](https://github.com/thinkbuff/figma/commit/bc2fc3d))
- **react:** Add Toggle, ToggleGroup components and stories ([6d1788e](https://github.com/thinkbuff/figma/commit/6d1788e))
- **react:** Add Popover components and stories ([a4213d7](https://github.com/thinkbuff/figma/commit/a4213d7))
- **react:** Add DropdownMenu components and stories ([4ada875](https://github.com/thinkbuff/figma/commit/4ada875))
- **react:** Add Sheet components and stories, rename text-size-* to font-size-* ([46288ca](https://github.com/thinkbuff/figma/commit/46288ca))
- **react:** Add Separator component and stories ([bbe083c](https://github.com/thinkbuff/figma/commit/bbe083c))
- **react:** Add AlertDialog components and stories, refactor `cn` util usage in component ([900c5ef](https://github.com/thinkbuff/figma/commit/900c5ef))
- **react:** Add Dialog components and stories ([230b25f](https://github.com/thinkbuff/figma/commit/230b25f))
- **react:** Add Toast component and stories ([64cdfd5](https://github.com/thinkbuff/figma/commit/64cdfd5))
- **react/toast:** Custom toast classNames ([9571bcc](https://github.com/thinkbuff/figma/commit/9571bcc))
- **react:** Add ScrollArea components and stories ([d5674c4](https://github.com/thinkbuff/figma/commit/d5674c4))
- **react:** Add Vite build configuration for React component library, adjust directory structure, and remove deprecated files ([363eced](https://github.com/thinkbuff/figma/commit/363eced))
- **react:** Optimize build configuration ([954d025](https://github.com/thinkbuff/figma/commit/954d025))

### 📚 Examples

- Setup playground project ([c1ff37c](https://github.com/thinkbuff/figma/commit/c1ff37c))

### 🔨 Refactors

- **react:** Use dot notation instead of exporting named parts for Select component ([f1be904](https://github.com/thinkbuff/figma/commit/f1be904))
- **theme:** Rename `presetFigma` to `presetFigmaTheme` ([f2bd732](https://github.com/thinkbuff/figma/commit/f2bd732))
- **playground:** Move to root workspace dir ([0d896b6](https://github.com/thinkbuff/figma/commit/0d896b6))

### 📖 Documentation

- **playground:** Update README ([6d93c70](https://github.com/thinkbuff/figma/commit/6d93c70))
- **react:** Update README ([2c7f9a8](https://github.com/thinkbuff/figma/commit/2c7f9a8))

### 📦 Build

- Use `changelogen` to bump version and generate changelog ([fc7a949](https://github.com/thinkbuff/figma/commit/fc7a949))
- **react:** Update build config, modified `exports` field in package.json ([3d2d9fc](https://github.com/thinkbuff/figma/commit/3d2d9fc))

### 🧹 Chore

- Update unocss ([30c2adc](https://github.com/thinkbuff/figma/commit/30c2adc))
- **react/eslint:** Remove `react-hooks/rules-of-hooks` rule ([e6aa4f1](https://github.com/thinkbuff/figma/commit/e6aa4f1))
- **playground:** Update dev script ([b9f038d](https://github.com/thinkbuff/figma/commit/b9f038d))
- **react:** Remove unused scripts ([197b210](https://github.com/thinkbuff/figma/commit/197b210))

### ❤️ Contributors

- Eleven ([@eteplus](http://github.com/eteplus))

