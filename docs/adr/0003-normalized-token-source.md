# Theme tokens come from a normalized JSON source, not the raw Design file export

Theme token values are taken from the Design file's variables, but the raw DTCG export (one file per mode, ~15k lines each, mostly `com.figma.*` metadata) is not committed. `pnpm tokens:import <dir>` normalizes an export into compact per-mode JSON under `packages/theme/tokens/` (name → value or alias, plus description; letter spacing converted from Figma's percent to em). That JSON is the only hand-maintained token source; every TS map and CSS file in the theme is generated from it. Because the source is small and readable, it can be edited by hand or fed from any route (native "Export modes", a Plugin API script, the runtime `#figma-style` dump), so updates never depend on a particular Figma seat or plan.

Primitive colors (the Design file's raw palette) are resolved at generation time and never published as CSS variables or utilities: the editor does not inject them at runtime, so a component using one would stop following the live Editor theme.

## Considered Options

- Commit the raw export: rejected, unreviewable diffs and noise.
- Keep hand-written TS maps: rejected, every Design file update becomes manual transcription across eight modes.
