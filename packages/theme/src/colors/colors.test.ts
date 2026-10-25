import { describe, expect, it } from 'vitest';

import { BaseThemeCSSVariables } from './base';
import { FigJamLightThemeCSSVariables } from './figjam';
import { FigmaDarkThemeCSSVariables, FigmaLightThemeCSSVariables } from './figma';
import { generateCSSVariables } from './index';

function expectedVariableDeclarations(theme: Record<string, string>) {
  return Object.entries(theme).map(
    ([name, value]) => `${name.replace('--figma-color', '--color')}: var(${name}, ${value})`,
  );
}

describe('generateCSSVariables', () => {
  it('emits every figma variable under light and dark selectors', () => {
    const css = generateCSSVariables('figma');

    expect(css).toContain('html.figma-light');
    expect(css).toContain('.figma-light');
    expect(css).toContain('html.figma-dark');
    expect(css).toContain('.figma-dark');

    for (const declaration of expectedVariableDeclarations({
      ...BaseThemeCSSVariables,
      ...FigmaLightThemeCSSVariables,
    })) {
      expect(css).toContain(declaration);
    }

    for (const declaration of expectedVariableDeclarations({
      ...BaseThemeCSSVariables,
      ...FigmaDarkThemeCSSVariables,
    })) {
      expect(css).toContain(declaration);
    }
  });

  it('emits every figjam variable under the figjam selector', () => {
    const css = generateCSSVariables('figjam');

    expect(css).toContain('html.figjam');
    expect(css).toContain('.figjam');
    expect(css).not.toContain('figma-dark');

    for (const declaration of expectedVariableDeclarations({
      ...BaseThemeCSSVariables,
      ...FigJamLightThemeCSSVariables,
    })) {
      expect(css).toContain(declaration);
    }
  });
});
