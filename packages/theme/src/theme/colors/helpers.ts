import { SharedFoundationVariables } from '../shared-foundation-variables';
import { FigJamLightThemeCSSVariables } from './figjam';
import { FigmaLightThemeCSSVariables, FigmaDarkThemeCSSVariables } from './figma';
import { SharedThemeCSSVariables } from './shared';
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
  const typographyScale = ['xs', 'sm', 'md', 'lg'] as const;
  const radiusScale = extractSharedScale('--figma-radius-', (left, right) => {
    return left.localeCompare(right);
  });
  const shadowScale = extractSharedScale('--figma-shadow-', (left, right) => {
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
      shadowScale.map((suffix) => {
        const escapedSuffix = escapeThemeVariableSuffix(suffix);
        return [
          `--shadow-figma-${escapedSuffix}`,
          getSharedFoundationValue(
            `--figma-shadow-${escapedSuffix}` as keyof typeof SharedFoundationVariables,
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

export function generateThemeVariablesCSS(type: 'figma' | 'figjam') {
  const sharedFoundationVariablesCSS = `@theme {
${serializeCSSVariableDeclarations({ ...SharedFoundationVariables, ...getSharedFoundationAliases() })}
}`;

  if (type === 'figma') {
    return `${sharedFoundationVariablesCSS}

:root, html.figma-light, .figma-light {
${serializeCSSVariableDeclarations({ ...SharedThemeCSSVariables, ...FigmaLightThemeCSSVariables })}
}

html.figma-dark, .figma-dark {
${serializeCSSVariableDeclarations({ ...SharedThemeCSSVariables, ...FigmaDarkThemeCSSVariables })}
}`;
  }

  return `${sharedFoundationVariablesCSS}

:root, html.figjam, .figjam {
${serializeCSSVariableDeclarations({ ...SharedThemeCSSVariables, ...FigJamLightThemeCSSVariables })}
}`;
}
