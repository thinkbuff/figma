import { FigJamLightThemeCSSVariables } from '../theme/colors/figjam';
import { FigmaDarkThemeCSSVariables, FigmaLightThemeCSSVariables } from '../theme/colors/figma';
import type { ThemeCSSVariableKey } from '../theme/colors/types';

export { FigmaLightThemeCSSVariables, FigmaDarkThemeCSSVariables, FigJamLightThemeCSSVariables };
export { FigJamDarkThemeCSSVariables } from '../theme/colors/figjam';
export {
  DevModeLightThemeCSSVariables,
  DevModeDarkThemeCSSVariables,
} from '../theme/colors/devmode';
export { SlidesLightThemeCSSVariables, SlidesDarkThemeCSSVariables } from '../theme/colors/slides';
export type { FigmaThemeCSSVariables, FigmaThemeCSSVariableKey } from '../theme/colors/figma';
export type { FigJamThemeCSSVariables, FigJamThemeCSSVariableKey } from '../theme/colors/figjam';
export type { DevModeThemeCSSVariables, DevModeThemeCSSVariableKey } from '../theme/colors/devmode';
export type { SlidesThemeCSSVariables, SlidesThemeCSSVariableKey } from '../theme/colors/slides';
export { generateThemeVariablesCSS } from '../theme/colors';

export type { ThemeCSSVariableKey };

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
      ${getCSSPreflights(FigmaLightThemeCSSVariables)}
    }
    html.figma-dark, .figma-dark {
      ${getCSSPreflights(FigmaDarkThemeCSSVariables)}
    }`;
  }

  return `html.figjam, .figjam {
    ${getCSSPreflights(FigJamLightThemeCSSVariables)}
  }`;
}
