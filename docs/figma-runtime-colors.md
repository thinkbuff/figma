# Figma runtime colors

`@thinkbuff/figma-theme` mirrors the `--figma-color-*` variables that Figma
injects into a plugin iframe when the plugin calls
`figma.showUI(html, { themeColors: true })`. The editor owns the values, not
this repo — the official docs
(<https://developers.figma.com/docs/plugins/css-variables/>) only publish the
light set, so dark and FigJam values must be extracted from a running editor.

Naming: `--figma-color-{type}-{role}-{prominence}-{interaction}`.

## Extract current values

Open devtools on a plugin iframe running with `themeColors: true` and run:

```js
document.getElementById('figma-style').innerHTML;
```

This returns the injected stylesheet with every `--figma-color-*` declaration
for the current mode. Run it once per mode (Figma light, Figma dark, FigJam by
opening a FigJam file and toggling the editor theme). If `#figma-style` is
absent, look for other `<style>` elements Figma injected into `<head>`.

New variables (e.g. `bg-slot`, `border-slot`) belong in
`packages/theme/src/theme/colors/` for all three theme variants.

## Reading the design file via MCP

Figma desktop exposes a Dev Mode MCP at `http://127.0.0.1:3845/mcp`. Add it to
`.devin/mcp_config.local.json` (gitignored):

```json
{ "mcpServers": { "figma": { "type": "http", "url": "http://127.0.0.1:3845/mcp" } } }
```

It only responds while the active Figma tab is a design or FigJam file, needs a
paid seat, and Devin may need a session restart to pick up the server. When it
is unavailable, use user-provided screenshots as design evidence.
