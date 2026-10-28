import slidesDarkTokens from '../../../tokens/colors/slides-dark.json';
import slidesLightTokens from '../../../tokens/colors/slides-light.json';
import { toThemeTokenMap } from './from-tokens';

export const SlidesLightThemeCSSVariables = toThemeTokenMap(slidesLightTokens);
export const SlidesDarkThemeCSSVariables = toThemeTokenMap(slidesDarkTokens);

export type SlidesThemeCSSVariables = typeof SlidesLightThemeCSSVariables &
  typeof SlidesDarkThemeCSSVariables;
export type SlidesThemeCSSVariableKey = keyof SlidesThemeCSSVariables;
