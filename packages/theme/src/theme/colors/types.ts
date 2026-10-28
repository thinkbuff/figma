import type { ThemeColorScope } from '../tokens';
import type { FigmaThemeCSSVariableKey } from './figma';

// All eight mode files publish the same key set, so the union collapses to one.
export type ThemeCSSVariableKey = FigmaThemeCSSVariableKey;

export type { ThemeColorScope };
