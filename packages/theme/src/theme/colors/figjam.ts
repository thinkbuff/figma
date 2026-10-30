import figjamDarkTokens from '../../../tokens/colors/figjam-dark.json';
import figjamLightTokens from '../../../tokens/colors/figjam-light.json';
import { toThemeTokenMap } from './from-tokens';

export const FigJamLightThemeCSSVariables = toThemeTokenMap(figjamLightTokens);
export const FigJamDarkThemeCSSVariables = toThemeTokenMap(figjamDarkTokens);

export type FigJamThemeCSSVariables = typeof FigJamLightThemeCSSVariables &
  typeof FigJamDarkThemeCSSVariables;
export type FigJamThemeCSSVariableKey = keyof FigJamThemeCSSVariables;
