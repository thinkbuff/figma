import extensions from '../../tokens/extensions.json';
import sizing from '../../tokens/sizing.json';
import typography from '../../tokens/typography.json';

// The committed token JSON under ../../tokens/ is the only source; this map
// (and everything downstream) is derived from it. See ADR 0003.

function pxToRem(px: number) {
  if (px === 0) {
    return '0';
  }
  const rem = Number((px / 16).toFixed(5));
  return `${rem}`.replace(/^(-?)0\./, '$1.') + 'rem';
}

/**
 * Absolute letter-spacing (rem) for a style whose tracking is an em fraction.
 */
function letterSpacingRem(letterSpacingEm: number, fontSizePx: number) {
  const rem = Number(((letterSpacingEm * fontSizePx) / 16).toFixed(5));
  if (rem === 0) {
    return '0';
  }
  return `${rem}`.replace(/^(-?)0\./, '$1.') + 'rem';
}

const RADIUS_NAME_TO_SUFFIX: Record<string, string> = {
  none: 'none',
  small: 'sm',
  medium: 'md',
  large: 'lg',
  full: 'full',
};

function spaceKey(suffix: string) {
  return `--figma-space-${suffix.replace(/\./g, '\\.')}` as const;
}

export const SharedFoundationVariables: Record<string, string> = {
  '--figma-font-family-default': extensions['font-family'].default.value,
  '--figma-font-family-code': extensions['font-family'].code.value,
  '--figma-font-family-display': extensions['font-family'].display.value,
  ...Object.fromEntries(
    Object.entries(typography.weight).map(([name, weight]) => [
      `--figma-font-weight-${name}`,
      String(weight),
    ]),
  ),
  ...Object.fromEntries(
    Object.entries(typography.styles).flatMap(([name, style]) => [
      [`--figma-font-size-${name}`, pxToRem(style.fontSize)],
      [`--figma-line-height-${name}`, pxToRem(style.lineHeight)],
      [`--figma-letter-spacing-${name}`, letterSpacingRem(style.letterSpacing, style.fontSize)],
    ]),
  ),
  ...Object.fromEntries(
    Object.entries(sizing.radius).map(([name, px]) => [
      `--figma-radius-${RADIUS_NAME_TO_SUFFIX[name] ?? name}`,
      name === 'full' ? `${px}px` : pxToRem(px),
    ]),
  ),
  ...Object.fromEntries(
    [
      ...Object.entries(sizing.space).map(([name, px]) => [name, pxToRem(px)] as const),
      ...Object.entries(extensions.space).map(([name, entry]) => [name, entry.value] as const),
    ]
      .sort(([left], [right]) => parseFloat(left) - parseFloat(right))
      .map(([name, value]) => [spaceKey(name), value]),
  ),
  ...Object.fromEntries(
    Object.entries(extensions['border-width']).map(([name, entry]) => [
      `--figma-border-width-${name}`,
      entry.value,
    ]),
  ),
  ...Object.fromEntries(
    Object.entries(extensions.duration).map(([name, entry]) => [
      `--figma-duration-${name}`,
      entry.value,
    ]),
  ),
  ...Object.fromEntries(
    Object.entries(extensions.opacity).map(([name, entry]) => [
      `--figma-opacity-${name}`,
      entry.value,
    ]),
  ),
  ...Object.fromEntries(
    Object.entries(extensions['z-index']).map(([name, entry]) => [
      `--figma-z-index-${name}`,
      entry.value,
    ]),
  ),
  '--figma-shadow-slider': extensions['shadow-slider'].value,
  '--figma-shadow-hud': extensions['shadow-hud'].value,
};

export type SharedFoundationVariableKey = keyof typeof SharedFoundationVariables;
