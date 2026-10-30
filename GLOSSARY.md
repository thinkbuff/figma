# Thinkbuff Figma

Libraries for building Figma and FigJam plugin and widget UIs that look native to the host editor.

## Language

**Editor theme**:
The visual language of a host editor: Figma, FigJam, Dev Mode, or Slides, each with a light and a dark mode.
_Avoid_: skin, palette

**Design file**:
Figma's published UI3 community file of components, styles, and variables; private copies of it are working copies, not separate references. It is the single reference for every Theme token value and for component appearance.
_Avoid_: UI Kit, Figma Kit, figma-kit, design system

**Theme token**:
A named design value (color, font size, radius, spacing) taken from the host editor's own design system.
_Avoid_: design variable, CSS variable (that is how a token is delivered, not what it is)

**Elevation**:
A shadow level (100 to 500) expressing how far an element floats above the surface beneath it, from shapes up to modals. Each level has its own light and dark mode value.
_Avoid_: shadow size, depth

**Primitive color**:
A raw palette value in the Design file (e.g. blue 300) that semantic Theme tokens alias. It is never a Theme token itself.
_Avoid_: base color, palette token

**Core component**:
A component that corresponds one-to-one to a component set in the Design file.
_Avoid_: base component, primitive

**Pattern component**:
An editor-specific component with no component set of its own in the Design file, composed from Core components and matched against the screens that use it.
_Avoid_: composite, widget, business component

**Color scope**:
The role a color token plays: background, text, border, or icon. The same name in two scopes is two different tokens.
_Avoid_: color category, color type

**Utility contract**:
The set of class names the theme package guarantees to consumers, shared by the React and Vue component libraries.
_Avoid_: preset, class API
