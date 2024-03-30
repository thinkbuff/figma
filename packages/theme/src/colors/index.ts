import { BaseThemeCSSVariables, type BaseThemeCSSVariableKey } from './base';
import { FigmaLightThemeCSSVariables, FigmaDarkThemeCSSVariables, type FigmaThemeCSSVariableKey } from './figma';
import { FigJamLightThemeCSSVariables, type FigJamThemeCSSVariableKey } from './figjam';

export * from './base';
export * from './figma';
export * from './figjam';

export type ThemeCSSVariableKey = BaseThemeCSSVariableKey | FigmaThemeCSSVariableKey | FigJamThemeCSSVariableKey;

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
    return `html.figma-light, .figma-light {
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
