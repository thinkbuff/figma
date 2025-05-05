import type { Rule } from '@unocss/core';

import {
  BaseThemeCSSVariables,
  FigmaLightThemeCSSVariables,
  type ThemeCSSVariableKey,
  type ThemeColorScope,
} from '../colors';

const variables = Object.keys({
  ...BaseThemeCSSVariables,
  ...FigmaLightThemeCSSVariables,
}) as ThemeCSSVariableKey[];

/**
 * Generates a theme suffix based on the given scope and prefix.
 *
 * @param scope - The color scope for the theme.
 * @param prefix - The prefix to be added to the theme suffix.
 * @return The generated theme suffix.
 */
export function getThemeSuffix(scope: ThemeColorScope, prefix = '') {
  const variablePrefix = `--figma-color-${scope}`;
  return variables
    .filter(variable => variable !== variablePrefix && variable.startsWith(variablePrefix))
    .map(variable => `${prefix}${variable.slice(variablePrefix.length + 1)}`)
    .join('|');
}

export const rules: Rule[] = [
  [
    /^font-size-(\d+|\d+\/\d+)$/,
    ([, value]) => {
      const [size, leading] = value.split('/');
      return ({
        'font-size': `${size}px`,
        'line-height': `${leading || 16}px`,
      });
    },
    { autocomplete: 'font-size-(<num>|<num>/<num>)' },
  ],
  [
    /^(bg|border|text)-figma?(.*)$/,
    ([, scope, color]) => {
      if (color?.startsWith?.(scope, 1)) {
        // ignore `bg-figma-bg-*`
        return '';
      }

      const scopes = ['bg', 'border', 'text', 'icon'];
      const suffix = scopes.some(s => color?.startsWith?.(s, 1)) ? `${color || ''}` : `-${scope}${color}`;

      if (color && !variables.includes(`--figma-color${suffix}` as ThemeCSSVariableKey)) {
        return '';
      }

      const properties = {
        bg: 'background-color',
        border: 'border-color',
        text: 'color',
      };
      return {
        [properties[scope as keyof typeof properties]]: `var(--color${suffix})`,
      };
    },
    {
      autocomplete: [
        `border-figma-(${getThemeSuffix('border')}|${getThemeSuffix('text', 'text-')}|${getThemeSuffix('icon', 'icon-')}|${getThemeSuffix('bg', 'bg-')})`,
        `text-figma-(${getThemeSuffix('text')}|${getThemeSuffix('border', 'border-')}|${getThemeSuffix('icon', 'icon-')}|${getThemeSuffix('bg', 'bg-')})`,
        `bg-figma-(${getThemeSuffix('bg')}|${getThemeSuffix('border', 'border-')}|${getThemeSuffix('icon', 'icon-')}|${getThemeSuffix('text', 'text-')})`,
      ],
    },
  ],
  [
    /^(fill|stroke|outline)-figma(.*)$/,
    ([, scope, color]) => {
      if (color && !variables.includes(`--figma-color${color}` as ThemeCSSVariableKey)) {
        return '';
      }

      const properties = {
        fill: 'fill',
        outline: 'outline-color',
        stroke: 'stroke',
      };
      return {
        [properties[scope as keyof typeof properties]]: `var(--color${color || ''})`,
      };
    },
    {
      autocomplete: `(fill|stroke|outline)-figma-(${getThemeSuffix('bg', 'bg-')}|${getThemeSuffix('border', 'border-')}|${getThemeSuffix('text', 'text-')}|${getThemeSuffix('icon', 'icon-')})`,
    },
  ],
];
