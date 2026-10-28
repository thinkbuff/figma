# Architecture

How the libraries in this repo are layered, where design values come from, and
the rules that keep components aligned with Figma's UI3 Design file. Terms in
**bold** are defined in [GLOSSARY.md](../GLOSSARY.md); decisions with real
trade-offs are recorded in [docs/adr/](./adr/).

## 1. Sources of truth

| What | Source | Notes |
| --- | --- | --- |
| Token values (color, spacing, radius, typography) | **Design file** variables | [UI3: Figma's UI Kit (Community)](https://www.figma.com/community/file/1486123838948777078/ui3-figmas-ui-kit). Work from a private working copy so Dev Mode is available; working-copy links stay local (`docs/figma-ui3-design.md`, gitignored). |
| Elevation | Design file effect styles (`light/elevation-*`, `dark/elevation-*`) | Effect styles are not part of a variables export; see §3.1. |
| Component appearance | Design file component sets, matched by page and set name | Never by node id: ids differ between working copies. |
| Runtime colors | Figma editor (`themeColors: true`) | Overrides our values at runtime under the same names ([ADR 0002](./adr/0002-runtime-variable-names-over-design-file-names.md)). |

Precedence when they disagree: Design file component set > Design file
variables > user screenshots of the live editor. figma-kit is no longer a
reference. When the Design file contradicts itself (e.g. text style
`heading.medium` is 11/25 while its variables say 15/25), variables win and the
conflict is noted in the audit.

## 2. Packages and layers

```
@thinkbuff/figma-theme      Theme layer: tokens, generated CSS, utility contract, preflight
        ▲
@thinkbuff/figma-react      Core components ─▶ Pattern components
        ▲                   (both may use src/utils and src/icons)
consumer plugin UI
@thinkbuff/figma-utils      Plugin-side helpers (no UI); independent of the two above
```

| Layer | Contents | Rule |
| --- | --- | --- |
| Theme | `packages/theme` | Only place that knows token values. Exposes CSS variables and the **Utility contract**; no React. |
| **Core component** | One per Design file component set (Button, Checkbox, Tabs, …) | Appearance and variant/size/state model mirror the component set. Built on a Base UI primitive when one exists. |
| **Pattern component** | Editor-specific compositions with no set of their own (e.g. value-field) | Built from Core components and theme utilities; matched against the screens that use it. |
| Internal | `src/utils`, `src/icons`, shared class modules such as `components/menu` | Not a component; not exported as a subpath. |

Dependency rules: Pattern → Core is allowed, Core → Pattern is not; a component
imports another component only through its `index.ts`; nothing in
`packages/react` hard-codes a color, shadow or font value.

## 3. Tokens

### 3.1 Pipeline

```
Design file ──export / plugin / runtime dump──▶ pnpm tokens:import <dir>
        ▼
packages/theme/tokens/*.json        normalized, hand-editable, committed (the only token source)
        ▼  pnpm generate:css
packages/theme/src/theme/**         generated TS maps
packages/theme/src/css/**           generated CSS (CI fails on drift)
```

- Raw DTCG exports are never committed ([ADR 0003](./adr/0003-normalized-token-source.md)).
  The normalized files hold, per mode, `name → value | {alias}` plus
  `description`; Figma metadata (variable ids, scopes) is dropped.
- Import conversions: Figma letter spacing is a percentage (`0.5` = 0.5% of the
  font size) and becomes `em`; numbers become `rem` except radius `full`
  (`9999px`) and hairlines.
- **Primitive colors** (`🎨` palette) are resolved during generation and never
  emitted.
- Published color tokens: every semantic Design file variable with a web code
  syntax, except the editor-internal families `fullscreen/*`, `*desktop*`,
  `special/code*` and `special/*inspect*`. Where the Design file binds an
  excluded token, components use the published token with identical values in
  all modes (e.g. `border-fs-selected-strong` → `border-selected-strong`).
- Elevation lives in `tokens/elevation.json` (one entry per level and mode),
  maintained by hand or by a Plugin API dump of the effect styles, because a
  variables export does not contain effect styles.

### 3.2 Naming

| Design file | CSS variable | Utility examples |
| --- | --- | --- |
| color `--color-<name>` (code syntax) | `--figma-color-<name>` | `bg-figma-secondary`, `text-figma-brand`, `border-figma-selected` |
| `Spacers/spacer-<n>` (0, 4, 8, 16, 24, 32, 40 px) | `--figma-space-<n>` | `p-figma-2`, `gap-figma-1` |
| `Radius/radius-{small,medium,large,full}` (2, 5, 13, 9999) | `--figma-radius-{sm,md,lg,full}` | `rounded-figma-md` |
| `body.{small,medium,large}[.strong]`, `heading.{small,medium,large}`, `heading.display` | `--figma-font-size-<style>`, `--figma-line-height-<style>`, `--figma-letter-spacing-<style>` | `text-figma-body-medium`, `font-figma-strong` |
| `font.family.{default,mono,display}` | `--figma-font-family-{default,code,display}` | `font-figma`, `font-figma-code` |
| effect style `elevation-<level>-*` | `--figma-elevation-<level>` | `shadow-figma-menu` (= 400) |

Spacing and radius keep short names because the scales match the Design file
one-to-one. The extra spacing steps `0.5`, `1.5`, `2.5` (2, 6, 12 px) are
extension tokens with no Design file counterpart and are marked as such in the
source. Typography uses the Design file names only; the old `xs/sm/md/lg` scale
is removed before 0.1.0 ships.

### 3.3 Editor themes and modes

The editor adds `figma-light` or `figma-dark` to `<html>`; the consumer adds the
editor-type class from `figma.editorType`. Their combination selects one of
eight modes. `:root` is Figma light.

| Mode | Selector | Visual tests |
| --- | --- | --- |
| Figma light / dark | `:root`, `.figma-light` / `.figma-dark` | yes |
| FigJam light / dark | `.figjam` / `.figjam.figma-dark` | yes |
| Dev Mode light / dark | `.devmode` / `.devmode.figma-dark` | no (experimental) |
| Slides light / dark | `.slides` / `.slides.figma-dark` | no (experimental) |

Theme-scoped values (colors, elevation) live in these selector blocks, not in
`@theme`, so nested scopes resolve correctly. `dark:` matches `.figma-dark`.

### 3.4 Usage rules for components

1. Colors, shadows, radii, font sizes come only from Utility contract classes.
2. No arbitrary values that reach into variables
   (`shadow-[0_0_0_1px_var(--figma-color-…)]`, `bg-[var(--…)]`). If a needed
   value has no utility, add the token or utility to the theme first.
3. Geometry (height, padding, gap) uses the Tailwind spacing scale where it
   equals the Design file pixel value (`h-6` = 24px) or the `figma` spacing
   tokens; arbitrary pixel values need a comment naming the Design file layer.
4. Use the token the Design file binds, not a visually similar one
   (`bordertranslucent` is not `border`).
5. New utility families are registered in `packages/react/src/utils/cn.ts`.

## 4. Naming and directory structure

```
packages/react/
├── src/
│   ├── components/<kebab-name>/
│   │   ├── index.ts                 public surface of the component
│   │   ├── <kebab-name>.tsx         component(s)
│   │   ├── <kebab-name>-variants.ts cva definitions, when the component has variants
│   │   └── <kebab-name>.stories.tsx title `Core/<Name>` or `Pattern/<Name>`
│   ├── icons/                       inline SVG icons (`create-icon.tsx`)
│   └── utils/                       cn, addClassName, shared hooks
├── tests/                           mirrors src/ (never colocated)
│   └── visual/__screenshots__/      pixel baselines
└── styles.css                       theme import + @layer components escape hatch
```

- Directories stay flat regardless of layer ([ADR 0004](./adr/0004-flat-component-directories.md));
  each directory is a subpath export (`@thinkbuff/figma-react/<kebab-name>`).
- File names are kebab-case. Component names are PascalCase and keep their
  established names where the Design file uses a different one (Select ↔
  Dropdown, Toast ↔ Notifications); the mapping is in §7.
- Core component props mirror the component set's properties: `Variant` →
  `variant`, `Size` → `size`, `Disabled` → `disabled`, `Icon Lead` → an icon
  slot. Interaction states (`State=Hover/Focused/Active`) are never props; they
  come from `:hover`, `:focus-visible`, `:active`, `aria-*` and Base UI
  `data-*` attributes. Prop values are the property values in kebab-case
  (Button: `variant` = `primary | secondary | destructive |
  secondary-destructive | inverse | success | figjam | link | link-danger |
  ghost`).
- `styles.css` `@layer components` is reserved for what cva cannot express
  (keyframes, third-party DOM such as sonner).

## 5. Reuse and extension

Consumers extend components in exactly four ways:

| Mechanism | Use |
| --- | --- |
| `className` | Merged last through `cn()` (tailwind-merge with the figma groups), so consumer classes win. |
| `render` prop | Base UI element replacement (`<Dialog.Trigger render={<Button />} />`); never `asChild`. |
| Compound parts | `Dialog.Root` / `Dialog.Title` …; each part forwards `ref` and props. |
| Exported variants | `buttonVariants(...)` applies the same styling to a consumer element. |

Theming is done only by overriding `--figma-*` CSS variables in a scope; there
is no JavaScript theme configuration. Inside the library, Pattern components
reuse Core components or their exported variants instead of copying classes.

## 6. Versioning and release

- The three packages are versioned in lockstep and released together with
  changelogen (`pnpm release`). No changesets.
- Public API: `--figma-*` variable names, Utility contract class names,
  component props and compound parts, and subpath exports.
- Before 0.1.0 is published, API changes are made directly. From 0.1.0 on:
  any change to the public API is breaking; while below 1.0 a breaking change
  bumps the minor version, a fix the patch version. A rename keeps the old name
  as a deprecated alias for one minor release, and the CHANGELOG lists old → new.
- Token value changes that follow the Design file are fixes, not breaking
  changes.

## 7. Component inventory

From the component audits (`docs/audit/`, local only). "—" means the Design
file has no component set; such components follow the token rules and the
nearest evidence noted in their audit.

| Component | Layer | Design file page / component set |
| --- | --- | --- |
| avatar | Core | Avatars / Avatar |
| badge | Core | Badges / Badge small, Badge small alt, Badge large, Badge Dot |
| button | Core | Buttons / Button |
| action-icon | Core | Buttons / Button icon |
| toggle | Core | Buttons / Button icon toggle, Button icon dialog toggle |
| checkbox | Core | Checkboxes / Checkbox |
| radio | Core | Radio Buttons / Radio button |
| switch | Core | Switches / Switch |
| select | Core | Dropdowns / Dropdown |
| input | Core | Inputs / Text input (Single Line) |
| textarea | Core | Inputs / Text input (Multi Line) |
| swatch | Core | Inputs / _Chit 24, Color input |
| variable-chip | Core | Inputs / _Chip variable, Variable Cell |
| segmented-control | Core | Segmented Control / Segmented control |
| toggle-group | Core | Segmented Control / Segmented control (multi-select extension) |
| slider | Core | Sliders / Slider |
| tabs | Core | Tabs / Tabs, _Tab |
| tooltip | Core | Tooltips / Tooltip |
| value-field | Pattern | Inputs / Numeric input, Numeric input multi, Color input, Combo input |
| dropdown-menu, context-menu | Pattern | Menus / Menu row/*, Menu example (shared classes in internal `menu`) |
| link-tooltip | Pattern | Tooltips / Tooltip link |
| dialog, alert-dialog | Pattern | Modals, Dialogs / Modal header, Modal footer, Modal body/Row |
| toast | Pattern | Notifications / Notifications |
| visual-bell | Pattern | Visual Bells / Bell |
| sheet, popover, scroll-area, separator, label | — | — |

Design file sets with no component yet: Button icon split, Combo input (as a
standalone input), Numeric input multi, Menu multi-select, Bell Multiplayer,
and the Comments page.

## 8. Remediation roadmap

Phases, each with its own acceptance gate:

| Phase | Scope | Gate |
| --- | --- | --- |
| P1 Token pipeline | `tokens:import`, normalized sources, generator, 8 modes, `:root` = Figma light | `pnpm vrt:diff` shows only the value changes listed in the audits; everything else is pixel-identical. |
| P2 Naming and selectors | Typography rename, editor-type selectors, token gaps closed | Unit tests over the generated CSS; VRT for the four tested modes. |
| P3 Components | Fixes in the order below, one commit per component | Re-baselined screenshots for that component, each changed image reviewed. |

Theme baseline (checked 2026-10-28): all 268 published color tokens match the
Design file in Figma light, Figma dark and FigJam light; spacing, radius,
typography and elevation values match. The Design file defines 674 semantic
color tokens; the gaps components need are `bordertranslucent`,
`bghovertransparent`, `bgtransparent`, `bgtransparentsecondary` (+ `-hover`,
`-pressed`), `texthighlight`, `scrollbar`, `modalbackdrop`, `multiplayer*`,
`textonmultiplayer*`, the `figjam` family (`bg-figjam*`, `text-onfigjam`, …)
and `bg-toolbar`. Known theme defects: without an editor-theme class `:root`
resolves FigJam colors; elevation shadow layers are listed in a different order
than the Design file; `heading.display` is missing.

P3 order, by visible impact and shared fixes (P1 = visible value, P2 = missing
variant/state, P3 = naming only):

| # | Components | P1 / P2 | Main fixes |
| --- | --- | --- | --- |
| 1 | button | 7 / 3 | Secondary = unfilled + `bordertranslucent`; filled focus = `border-selected` + 2px white inset; Ghost hover/active on `bgtransparentsecondary`; Link and Secondary Destruct active fills; FigJam variant; icon-lead slot; drop `warning`, dead `btn-*` |
| 2 | action-icon, toggle | 8 / 5 | Hover `bghovertransparent`, active `bgtransparentsecondary`; Secondary stroke `bordertranslucent`; on-hover `bg-selected-secondary`; split button |
| 3 | dropdown-menu, context-menu, internal menu | 5 / 4 | Highlight `bg-menu-selected`; badge/check trails |
| 4 | select, input, value-field, variable-chip | 4 / 10 | Single focus ring; 24px icon cell; chip 16px tall; large-size icon well; combo input |
| 5 | slider, swatch | 3 / 4 | `bordertranslucent` rings; disabled fill `bg-disabled`; chit types |
| 6 | avatar, badge | 3 / 8 | `multiplayer*` tokens; badge alt/large/dot families |
| 7 | radio, tabs, toast, visual-bell, scroll-area | 6 / 2 | Radio button-variant stroke and focus ring (`border-selected-strong`); tabs focus ring; toast elevation-400; visual bell becomes the light `bg` + elevation-100 bell of the Design file, edge token; scrollbar token |
| 8 | the rest | 0 / ≤2 each | P2/P3 items only |
