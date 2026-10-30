import devModeDarkTokens from '../../../tokens/colors/devmode-dark.json';
import devModeLightTokens from '../../../tokens/colors/devmode-light.json';
import { toThemeTokenMap } from './from-tokens';

export const DevModeLightThemeCSSVariables = toThemeTokenMap(devModeLightTokens);
export const DevModeDarkThemeCSSVariables = toThemeTokenMap(devModeDarkTokens);

export type DevModeThemeCSSVariables = typeof DevModeLightThemeCSSVariables &
  typeof DevModeDarkThemeCSSVariables;
export type DevModeThemeCSSVariableKey = keyof DevModeThemeCSSVariables;
