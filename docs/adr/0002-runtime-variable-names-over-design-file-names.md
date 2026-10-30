# Theme tokens keep the runtime `--figma-color-*` names, not the Design file's `--color-*`

The Design file's exported variables declare their web names as `--color-*` (e.g. `var(--color-text)`), while the Figma editor injects the same colors into a plugin iframe as `--figma-color-*` when the plugin calls `figma.showUI(html, { themeColors: true })`. We take token values from the Design file but publish them under the runtime names, so a plugin built on this library follows the live editor theme for free: the injected variables simply override ours.

## Considered Options

- Adopt the Design file's `--color-*` names: rejected, the editor never injects them, so plugins would freeze on our build-time values and drift from the editor.
- Publish both names: rejected, doubles the public surface for no consumer.

## Consequences

- The token generator maps every `--color-<name>` to `--figma-color-<name>`; a Design file variable with no runtime counterpart still gets the `--figma-color-` prefix and simply never receives a runtime override.
