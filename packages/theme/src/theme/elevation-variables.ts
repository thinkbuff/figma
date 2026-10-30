import elevation from '../../tokens/elevation.json';
import extensions from '../../tokens/extensions.json';

// UI3 elevation scale. Emitted inside the per-theme blocks (NOT @theme) so
// `var(--figma-elevation-*)` resolves against the nearest
// .figma-light/.figma-dark/.figjam scope. Values live in tokens/elevation.json
// because a variables export does not contain effect styles (ADR 0003).

function prefixed<T extends Record<string, string>>(variables: T, prefix: string) {
  return Object.fromEntries(
    Object.entries(variables).map(([name, value]) => [`${prefix}${name}`, value]),
  ) as Record<string, string>;
}

export const LightElevationCSSVariables = prefixed(elevation.light, '--figma-elevation-');

export const DarkElevationCSSVariables = prefixed(elevation.dark, '--figma-elevation-');

// Legacy shadow vars stay theme-scoped so var(--figma-elevation-*) resolves per theme.
export const LegacyElevationShadowVariables = prefixed(
  Object.fromEntries(
    Object.entries(extensions['shadow-aliases']).map(([name, entry]) => [name, entry.value]),
  ),
  '--figma-shadow-',
);
