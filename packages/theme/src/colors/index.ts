import { FigJamLightTheme, type FigJamTheme } from './figjam';
import { FigmaLightTheme, FigmaDarkTheme, type FigmaTheme } from './figma';

export * from './figma';
export * from './figjam';

export type ThemeCSSVariables = keyof FigmaTheme & keyof FigJamTheme;

export type ThemeColorScope = 'bg' | 'border' | 'text' | 'icon';

export function getCSSPreflights(theme: Record<ThemeCSSVariables, string>) {
  return Object.entries(theme)
    .map(([name, value]) => {
      return `${name.replace('figma-', '')}: var(${name}, ${value})`;
    })
    .join(';');
}

export function generateCSSVariables(type: 'figma' | 'figjam') {
  if (type === 'figma') {
    return `html {${getCSSPreflights(FigmaLightTheme)}}\nhtml.figma-dark {${getCSSPreflights(FigmaDarkTheme)}}`;
  }

  return `html.figjam {${getCSSPreflights(FigJamLightTheme)}}`;
}
