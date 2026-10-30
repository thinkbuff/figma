import figmaDarkTokens from '../../../tokens/colors/figma-dark.json';
import figmaLightTokens from '../../../tokens/colors/figma-light.json';
import { toThemeTokenMap } from './from-tokens';

// Derived from tokens/colors/figma-{light,dark}.json — the normalized import of
// the Design file's `Light`/`Dark` modes. Complete per-mode maps (the former
// mode-invariant shared block is folded in).
export const FigmaLightThemeCSSVariables = toThemeTokenMap(figmaLightTokens);
export const FigmaDarkThemeCSSVariables = toThemeTokenMap(figmaDarkTokens);

export type FigmaThemeCSSVariables = typeof FigmaLightThemeCSSVariables &
  typeof FigmaDarkThemeCSSVariables;
export type FigmaThemeCSSVariableKey = keyof FigmaThemeCSSVariables;
