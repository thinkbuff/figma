import type { SharedFoundationVariableKey } from '../shared-foundation-variables';
import type { FigmaThemeCSSVariableKey } from './figma';
import type { SharedThemeCSSVariableKey } from './shared';

export type ThemeCSSVariableKey =
  | SharedFoundationVariableKey
  | SharedThemeCSSVariableKey
  | FigmaThemeCSSVariableKey;

export type { ThemeColorScope } from '../tokens';
