import { FigJamLightThemeCSSVariables } from '../theme/colors/figjam';
import { FigmaDarkThemeCSSVariables, FigmaLightThemeCSSVariables } from '../theme/colors/figma';
import type { FigmaThemeCSSVariableKey } from '../theme/colors/figma';
import { SharedThemeCSSVariables } from '../theme/colors/shared';
import type { SharedThemeCSSVariableKey } from '../theme/colors/shared';

export { SharedThemeCSSVariables as BaseThemeCSSVariables };
export type { SharedThemeCSSVariableKey as BaseThemeCSSVariableKey };
export { FigmaLightThemeCSSVariables, FigmaDarkThemeCSSVariables, FigJamLightThemeCSSVariables };
export type { FigmaThemeCSSVariables, FigmaThemeCSSVariableKey } from '../theme/colors/figma';
export type { FigJamThemeCSSVariables, FigJamThemeCSSVariableKey } from '../theme/colors/figjam';
export { generateThemeVariablesCSS } from '../theme/colors';

export type ThemeCSSVariableKey = SharedThemeCSSVariableKey | FigmaThemeCSSVariableKey;

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
      ${getCSSPreflights({ ...SharedThemeCSSVariables, ...FigmaLightThemeCSSVariables })}
    }
    html.figma-dark, .figma-dark {
      ${getCSSPreflights({ ...SharedThemeCSSVariables, ...FigmaDarkThemeCSSVariables })}
    }`;
  }

  return `html.figjam, .figjam {
    ${getCSSPreflights({ ...SharedThemeCSSVariables, ...FigJamLightThemeCSSVariables })}
  }`;
}
