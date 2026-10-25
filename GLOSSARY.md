# Thinkbuff Figma

Libraries for building Figma and FigJam plugin and widget UIs that look native to the host editor.

## Language

**Editor theme**:
The visual language of a host editor, either the Figma theme or the FigJam theme, each with a light and a dark mode.
_Avoid_: skin, palette

**UI Kit**:
Figma's published UI3 design file of components and styles. It is the reference for typography, radius, spacing, shadow, and component appearance, but not for colors, which come from the Editor theme.
_Avoid_: design system, design, Figma file

**Theme token**:
A named design value (color, font size, radius, spacing) taken from the host editor's own design system.
_Avoid_: design variable, CSS variable (that is how a token is delivered, not what it is)

**Elevation**:
A shadow level (100 to 500) expressing how far an element floats above the surface beneath it, from shapes up to modals. Each level has its own light and dark mode value.
_Avoid_: shadow size, depth

**Color scope**:
The role a color token plays: background, text, border, or icon. The same name in two scopes is two different tokens.
_Avoid_: color category, color type

**Utility contract**:
The set of class names the theme package guarantees to consumers, shared by the React and Vue component libraries.
_Avoid_: preset, class API
