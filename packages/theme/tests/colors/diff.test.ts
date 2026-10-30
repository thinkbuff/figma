import { describe, expect, it } from 'vitest';

import * as colors from '../../src/colors/index';

describe('@thinkbuff/figma-theme ./colors compat exports', () => {
  it('exports every pre-Tailwind named export', () => {
    expect(colors.FigmaLightThemeCSSVariables).toBeDefined();
    expect(colors.FigmaDarkThemeCSSVariables).toBeDefined();
    expect(colors.FigJamLightThemeCSSVariables).toBeDefined();
    expect(colors.FigJamDarkThemeCSSVariables).toBeDefined();
    expect(colors.DevModeLightThemeCSSVariables).toBeDefined();
    expect(colors.DevModeDarkThemeCSSVariables).toBeDefined();
    expect(colors.SlidesLightThemeCSSVariables).toBeDefined();
    expect(colors.SlidesDarkThemeCSSVariables).toBeDefined();
    expect(typeof colors.getCSSPreflights).toBe('function');
    expect(typeof colors.generateCSSVariables).toBe('function');
    expect(typeof colors.generateThemeVariablesCSS).toBe('function');
  });

  it('keeps the old generateCSSVariables output shape', () => {
    const figma = colors.generateCSSVariables('figma');
    const figjam = colors.generateCSSVariables('figjam');

    expect(figma).toContain('html, html.figma-light, .figma-light');
    expect(figma).toContain('html.figma-dark, .figma-dark');
    expect(figma).toContain('--color-bg-brand: var(--figma-color-bg-brand,');
    expect(figjam).toContain('html.figjam, .figjam');
    expect(figjam).toContain('--color-bg-brand: var(--figma-color-bg-brand,');
  });
});
