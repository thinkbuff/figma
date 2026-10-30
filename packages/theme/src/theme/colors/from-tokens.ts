import type { ThemeTokenMap } from '../tokens';

type NormalizedColorFile = Record<string, { value: string }>;

type PrefixedThemeTokenMap<T> = {
  [K in keyof T & string as `--figma-color-${K}`]: string;
};

/**
 * `<web name> → --figma-color-<web name>` (ADR 0002: runtime names, not --color-*).
 */
export function toThemeTokenMap<T extends NormalizedColorFile>(
  tokens: T,
): PrefixedThemeTokenMap<T> {
  return Object.fromEntries(
    Object.entries(tokens).map(([name, token]) => [`--figma-color-${name}`, token.value]),
  ) as PrefixedThemeTokenMap<T>;
}

export type { ThemeTokenMap };
