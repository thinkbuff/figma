import typography from '../../../tokens/typography.json';
import {
  DarkElevationCSSVariables,
  LegacyElevationShadowVariables,
  LightElevationCSSVariables,
} from '../elevation-variables';
import { SharedFoundationVariables } from '../shared-foundation-variables';
import { DevModeDarkThemeCSSVariables, DevModeLightThemeCSSVariables } from './devmode';
import { FigJamLightThemeCSSVariables, FigJamDarkThemeCSSVariables } from './figjam';
import { FigmaLightThemeCSSVariables, FigmaDarkThemeCSSVariables } from './figma';
import { SlidesDarkThemeCSSVariables, SlidesLightThemeCSSVariables } from './slides';
import type { ThemeCSSVariableKey } from './types';

function extractSharedScale(prefix: string, compareFn?: (left: string, right: string) => number) {
  const scale = Object.keys(SharedFoundationVariables)
    .filter((key) => key.startsWith(prefix))
    .map((key) => key.replace(prefix, '').replace('\\.', '.'));

  return compareFn ? scale.sort(compareFn) : scale;
}

function escapeThemeVariableSuffix(value: string) {
  return value.replace(/\./g, '\\.');
}

function getSharedFoundationValue(variableName: keyof typeof SharedFoundationVariables) {
  return SharedFoundationVariables[variableName];
}

function getSharedFoundationAliases() {
  const fontWeightScale = extractSharedScale('--figma-font-weight-', (left, right) => {
    return left.localeCompare(right);
  });
  // Style names come from tokens/typography.json, not a hardcoded list, so new
  // Design file styles get utilities automatically.
  const typographyScale = Object.keys(typography.styles);
  const semanticTypographyScale = Object.keys(typography.styles);
  // Non-default-weight styles get a --font-weight alias on their text utility.
  const weightedTypographyScale = Object.entries(typography.styles)
    .filter(([, style]) => style.fontWeight !== typography.weight.default)
    .map(([name, style]) => [name, String(style.fontWeight)] as const);
  const radiusScale = extractSharedScale('--figma-radius-', (left, right) => {
    return left.localeCompare(right);
  });
  const spacingScale = extractSharedScale('--figma-space-', (left, right) => {
    return parseFloat(left) - parseFloat(right);
  });
  const borderWidthScale = extractSharedScale('--figma-border-width-', (left, right) => {
    return parseFloat(left) - parseFloat(right);
  });
  const durationScale = extractSharedScale('--figma-duration-', (left, right) => {
    return parseFloat(left) - parseFloat(right);
  });
  const opacityScale = extractSharedScale('--figma-opacity-', (left, right) => {
    return left.localeCompare(right);
  });
  const zIndexScale = extractSharedScale('--figma-z-index-', (left, right) => {
    return left.localeCompare(right);
  });

  return {
    '--font-figma': getSharedFoundationValue('--figma-font-family-default'),
    '--font-figma-code': getSharedFoundationValue('--figma-font-family-code'),
    ...Object.fromEntries(
      fontWeightScale.map((suffix) => {
        const escapedSuffix = escapeThemeVariableSuffix(suffix);
        return [
          `--font-weight-figma-${escapedSuffix}`,
          getSharedFoundationValue(
            `--figma-font-weight-${escapedSuffix}` as keyof typeof SharedFoundationVariables,
          ),
        ];
      }),
    ),
    ...Object.fromEntries(
      typographyScale.map((suffix) => {
        const escapedSuffix = escapeThemeVariableSuffix(suffix);
        return [
          `--text-figma-${escapedSuffix}`,
          getSharedFoundationValue(
            `--figma-font-size-${escapedSuffix}` as keyof typeof SharedFoundationVariables,
          ),
        ];
      }),
    ),
    ...Object.fromEntries(
      typographyScale.map((suffix) => {
        const escapedSuffix = escapeThemeVariableSuffix(suffix);
        return [
          `--leading-figma-${escapedSuffix}`,
          getSharedFoundationValue(
            `--figma-line-height-${escapedSuffix}` as keyof typeof SharedFoundationVariables,
          ),
        ];
      }),
    ),
    ...Object.fromEntries(
      typographyScale.map((suffix) => {
        const escapedSuffix = escapeThemeVariableSuffix(suffix);
        return [
          `--text-figma-${escapedSuffix}--line-height`,
          getSharedFoundationValue(
            `--figma-line-height-${escapedSuffix}` as keyof typeof SharedFoundationVariables,
          ),
        ];
      }),
    ),
    ...Object.fromEntries(
      typographyScale.map((suffix) => {
        const escapedSuffix = escapeThemeVariableSuffix(suffix);
        return [
          `--tracking-figma-${escapedSuffix}`,
          getSharedFoundationValue(
            `--figma-letter-spacing-${escapedSuffix}` as keyof typeof SharedFoundationVariables,
          ),
        ];
      }),
    ),
    ...Object.fromEntries(
      semanticTypographyScale.map((suffix) => {
        return [
          `--text-figma-${suffix}--letter-spacing`,
          getSharedFoundationValue(
            `--figma-letter-spacing-${suffix}` as keyof typeof SharedFoundationVariables,
          ),
        ];
      }),
    ),
    ...Object.fromEntries(
      weightedTypographyScale.map(([suffix, weight]) => {
        return [`--text-figma-${suffix}--font-weight`, weight];
      }),
    ),
    ...Object.fromEntries(
      radiusScale.map((suffix) => {
        const escapedSuffix = escapeThemeVariableSuffix(suffix);
        return [
          `--radius-figma-${escapedSuffix}`,
          getSharedFoundationValue(
            `--figma-radius-${escapedSuffix}` as keyof typeof SharedFoundationVariables,
          ),
        ];
      }),
    ),
    ...Object.fromEntries(
      spacingScale.map((suffix) => {
        const escapedSuffix = escapeThemeVariableSuffix(suffix);
        return [
          `--spacing-figma-${escapedSuffix}`,
          getSharedFoundationValue(
            `--figma-space-${escapedSuffix}` as keyof typeof SharedFoundationVariables,
          ),
        ];
      }),
    ),
    ...Object.fromEntries(
      borderWidthScale.map((suffix) => {
        const escapedSuffix = escapeThemeVariableSuffix(suffix);
        return [
          `--border-figma-${escapedSuffix}`,
          getSharedFoundationValue(
            `--figma-border-width-${escapedSuffix}` as keyof typeof SharedFoundationVariables,
          ),
        ];
      }),
    ),
    ...Object.fromEntries(
      durationScale.map((suffix) => {
        const escapedSuffix = escapeThemeVariableSuffix(suffix);
        return [
          `--transition-duration-figma-${escapedSuffix}`,
          getSharedFoundationValue(
            `--figma-duration-${escapedSuffix}` as keyof typeof SharedFoundationVariables,
          ),
        ];
      }),
    ),
    ...Object.fromEntries(
      opacityScale.map((suffix) => {
        const escapedSuffix = escapeThemeVariableSuffix(suffix);
        return [
          `--opacity-figma-${escapedSuffix}`,
          getSharedFoundationValue(
            `--figma-opacity-${escapedSuffix}` as keyof typeof SharedFoundationVariables,
          ),
        ];
      }),
    ),
    ...Object.fromEntries(
      zIndexScale.map((suffix) => {
        const escapedSuffix = escapeThemeVariableSuffix(suffix);
        return [
          `--z-index-figma-${escapedSuffix}`,
          getSharedFoundationValue(
            `--figma-z-index-${escapedSuffix}` as keyof typeof SharedFoundationVariables,
          ),
        ];
      }),
    ),
  };
}

function getInlineShadowAliases() {
  const elevationLevels = ['100', '200', '300', '400', '500'] as const;
  return {
    ...Object.fromEntries(
      elevationLevels.map((level) => [
        `--shadow-figma-elevation-${level}`,
        `var(--figma-elevation-${level})`,
      ]),
    ),
    '--shadow-figma-tooltip': 'var(--figma-elevation-300)',
    '--shadow-figma-menu': 'var(--figma-elevation-400)',
    '--shadow-figma-modal': 'var(--figma-elevation-500)',
    '--shadow-figma-slider': getSharedFoundationValue('--figma-shadow-slider'),
    '--shadow-figma-hud': getSharedFoundationValue('--figma-shadow-hud'),
  };
}

export function serializeThemeColorPreflightDeclarations(
  theme: Record<ThemeCSSVariableKey, string>,
) {
  return Object.entries(theme)
    .filter(([name]) => name.startsWith('--figma-color-'))
    .map(([name, value]) => {
      return `${name.replace('--figma-color', '--color')}: var(${name}, ${value})`;
    })
    .join(';');
}

export function serializeCSSVariableDeclarations(theme: Record<string, string>) {
  return Object.entries(theme)
    .map(([name, value]) => {
      return `  ${name}: ${value};`;
    })
    .join('\n');
}

export type ThemeVariablesType = 'figma' | 'figjam' | 'devmode' | 'slides';

const EDITOR_MODES: Record<
  Exclude<ThemeVariablesType, 'figma'>,
  { light: Record<string, string>; dark: Record<string, string> }
> = {
  figjam: { light: FigJamLightThemeCSSVariables, dark: FigJamDarkThemeCSSVariables },
  devmode: { light: DevModeLightThemeCSSVariables, dark: DevModeDarkThemeCSSVariables },
  slides: { light: SlidesLightThemeCSSVariables, dark: SlidesDarkThemeCSSVariables },
};

/**
 * Selector model (docs/architecture.md §3.3): the editor adds figma-light /
 * figma-dark to <html>; the consumer adds the editor-type class. `:root` only
 * appears on the standalone entry's light block.
 */
export function generateThemeVariablesCSS(type: ThemeVariablesType, standalone = false) {
  const sharedFoundationVariablesCSS = `@theme {
${serializeCSSVariableDeclarations({ ...SharedFoundationVariables, ...getSharedFoundationAliases() })}
}

@theme inline {
${serializeCSSVariableDeclarations(getInlineShadowAliases())}
}`;

  const lightElevation = { ...LightElevationCSSVariables, ...LegacyElevationShadowVariables };
  const darkElevation = { ...DarkElevationCSSVariables, ...LegacyElevationShadowVariables };

  if (type === 'figma') {
    return `${sharedFoundationVariablesCSS}

:root, html.figma-light, .figma-light {
${serializeCSSVariableDeclarations({
  ...FigmaLightThemeCSSVariables,
  ...lightElevation,
})}
}

html.figma-dark, .figma-dark {
${serializeCSSVariableDeclarations({
  ...FigmaDarkThemeCSSVariables,
  ...darkElevation,
})}
}`;
  }

  const { light, dark } = EDITOR_MODES[type];
  const lightSelectors = standalone
    ? `:root, .${type}, .figma-light .${type}, .${type} .figma-light, .${type}.figma-light`
    : `.${type}, .figma-light .${type}, .${type} .figma-light, .${type}.figma-light`;

  return `${sharedFoundationVariablesCSS}

${lightSelectors} {
${serializeCSSVariableDeclarations({ ...light, ...lightElevation })}
}

.figma-dark .${type}, .${type} .figma-dark, .${type}.figma-dark {
${serializeCSSVariableDeclarations({ ...dark, ...darkElevation })}
}`;
}
