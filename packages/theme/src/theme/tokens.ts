import { FigJamLightThemeCSSVariables } from './colors/figjam';
import { FigmaDarkThemeCSSVariables, FigmaLightThemeCSSVariables } from './colors/figma';
import { SharedThemeCSSVariables } from './colors/shared';

const THEME_COLOR_SCOPES = ['bg', 'border', 'icon', 'text'] as const;

export type ThemeColorScope = (typeof THEME_COLOR_SCOPES)[number];

export type ThemeTokenName = `--figma-color-${string}`;

export type ThemeTokenMap = Record<ThemeTokenName, string>;

export type ThemeVariant = 'figma' | 'figjam';

export type RuntimeThemeVariant = 'figma-light' | 'figma-dark' | 'figjam';

export type ThemeTokenSource = {
  shared: ThemeTokenMap;
  themes: Record<RuntimeThemeVariant, ThemeTokenMap>;
};

export type ParsedThemeTokenName = {
  path: string[];
  scope: ThemeColorScope;
  suffix: string;
};

export function isThemeColorScope(value: string): value is ThemeColorScope {
  return THEME_COLOR_SCOPES.includes(value as ThemeColorScope);
}

export function isThemeTokenName(value: string): value is ThemeTokenName {
  return value.startsWith('--figma-color-');
}

export function parseThemeTokenName(value: string): ParsedThemeTokenName | null {
  if (!isThemeTokenName(value)) {
    return null;
  }

  const path = value.replace('--figma-color-', '').split('-').filter(Boolean);
  const [scope, ...suffixSegments] = path;

  if (!scope || !isThemeColorScope(scope)) {
    return null;
  }

  return {
    path,
    scope,
    suffix: suffixSegments.join('-'),
  };
}

/**
 * Theme source backed by this package's checked-in color data.
 * The shared tokens are the local menu/toolbar/tooltip scale.
 */
export const docsThemeTokenSource: ThemeTokenSource = {
  shared: {},
  themes: {
    'figma-light': FigmaLightThemeCSSVariables as ThemeTokenMap,
    'figma-dark': FigmaDarkThemeCSSVariables as ThemeTokenMap,
    figjam: FigJamLightThemeCSSVariables as ThemeTokenMap,
  },
};

export const localThemeTokenSource: ThemeTokenSource = {
  shared: SharedThemeCSSVariables as ThemeTokenMap,
  themes: {
    'figma-light': {},
    'figma-dark': {},
    figjam: {},
  },
};

export const themeTokenSource: ThemeTokenSource = {
  shared: SharedThemeCSSVariables as ThemeTokenMap,
  themes: docsThemeTokenSource.themes,
};
