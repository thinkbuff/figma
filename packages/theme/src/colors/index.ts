import { BaseThemeCSSVariables, type BaseThemeCSSVariableKey } from './base';
import { FigJamLightThemeCSSVariables } from './figjam';
import {
  FigmaLightThemeCSSVariables,
  FigmaDarkThemeCSSVariables,
  type FigmaThemeCSSVariableKey,
} from './figma';

export * from './base';
export * from './figma';
export * from './figjam';

export type ThemeCSSVariableKey = BaseThemeCSSVariableKey | FigmaThemeCSSVariableKey;

export type ThemeColorScope = 'bg' | 'border' | 'icon' | 'text';

export function getCSSPreflights(theme: Record<ThemeCSSVariableKey, string>) {
  return Object.entries(theme)
    .map(([name, value]) => {
      return `${name.replace('--figma-color', '--color')}: var(${name}, ${value})`;
    })
    .join(';');
}

export function generateCSSVariables(type: 'figma' | 'figjam') {
  if (type === 'figma') {
    return `html, html.figma-light, .figma-light {
      ${getCSSPreflights({ ...BaseThemeCSSVariables, ...FigmaLightThemeCSSVariables })}
    }
    html.figma-dark, .figma-dark {
      ${getCSSPreflights({ ...BaseThemeCSSVariables, ...FigmaDarkThemeCSSVariables })}
    }`;
  }

  return `html.figjam, .figjam {
    ${getCSSPreflights({ ...BaseThemeCSSVariables, ...FigJamLightThemeCSSVariables })}
  }`;
}
