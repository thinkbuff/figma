import { readFileSync } from 'node:fs';

import { describe, expect, it } from 'vitest';

import {
  generateThemeVariablesCSS,
  FigJamLightThemeCSSVariables,
  FigmaDarkThemeCSSVariables,
  FigmaLightThemeCSSVariables,
  SharedFoundationVariables,
} from './index';
import { docsThemeTokenSource, localThemeTokenSource } from './tokens';
import { isExposedLocalThemeToken } from './utility-contract';

describe('@thinkbuff/figma-theme', () => {
  it('splits theme tokens from local shared theme tokens', () => {
    expect(Object.keys(docsThemeTokenSource.shared)).toHaveLength(0);
    expect(docsThemeTokenSource.themes['figma-light']['--figma-color-bg']).toBeDefined();
    expect(localThemeTokenSource.shared['--figma-color-bg-menu']).toBe('#1e1e1e');
    expect(localThemeTokenSource.shared['--figma-color-text-tooltip-warning']).toBeDefined();
  });

  it('uses an explicit contract for locally exposed utility tokens', () => {
    expect(isExposedLocalThemeToken('--figma-color-bg-menu')).toBe(true);
    expect(isExposedLocalThemeToken('--figma-color-border-tooltip-selected-strong')).toBe(true);
    expect(isExposedLocalThemeToken('--figma-color-bg-brand')).toBe(false);
  });

  it('generates figma variables for light and dark scopes', () => {
    const css = generateThemeVariablesCSS('figma');

    expect(css).toContain('@theme {');
    expect(css).toContain(':root, html.figma-light, .figma-light');
    expect(css).toContain('html.figma-dark, .figma-dark');
    expect(css).toContain(
      `--figma-color-bg-brand: ${FigmaLightThemeCSSVariables['--figma-color-bg-brand']};`,
    );
    expect(css).toContain(
      `--figma-color-text: ${FigmaDarkThemeCSSVariables['--figma-color-text']};`,
    );
    expect(css).toContain(`--figma-radius-md: ${SharedFoundationVariables['--figma-radius-md']};`);
    expect(css).toContain(
      `--font-figma: ${SharedFoundationVariables['--figma-font-family-default']};`,
    );
    expect(css).toContain(
      `--font-weight-figma-default: ${SharedFoundationVariables['--figma-font-weight-default']};`,
    );
    expect(css).toContain(`--text-figma-sm: ${SharedFoundationVariables['--figma-font-size-sm']};`);
    expect(css).toContain(
      `--leading-figma-sm: ${SharedFoundationVariables['--figma-line-height-sm']};`,
    );
    expect(css).toContain(
      `--tracking-figma-sm: ${SharedFoundationVariables['--figma-letter-spacing-sm']};`,
    );
    expect(css).toContain(`--radius-figma-md: ${SharedFoundationVariables['--figma-radius-md']};`);
    expect(css).toContain(`--spacing-figma-0: ${SharedFoundationVariables['--figma-space-0']};`);
    expect(css).toContain(`--text-figma-xs: ${SharedFoundationVariables['--figma-font-size-xs']};`);
    expect(css).toContain(
      `--font-figma-code: ${SharedFoundationVariables['--figma-font-family-code']};`,
    );
  });

  it('generates figjam variables for the figjam scope', () => {
    const css = generateThemeVariablesCSS('figjam');

    expect(css).toContain('@theme {');
    expect(css).toContain(':root, html.figjam, .figjam');
    expect(css).toContain(
      `--figma-color-bg-brand: ${FigJamLightThemeCSSVariables['--figma-color-bg-brand']};`,
    );
  });

  it('ships css entry files with matching imports and generated token values', () => {
    const figmaCss = readFileSync(new URL('../css/figma.css', import.meta.url), 'utf8');
    const figjamCss = readFileSync(new URL('../css/figjam.css', import.meta.url), 'utf8');
    const indexCss = readFileSync(new URL('../css/index.css', import.meta.url), 'utf8');
    const figmaThemeCss = readFileSync(new URL('../css/figma-theme.css', import.meta.url), 'utf8');
    const figjamThemeCss = readFileSync(
      new URL('../css/figjam-theme.css', import.meta.url),
      'utf8',
    );
    const utilitiesCss = readFileSync(new URL('../css/utilities.css', import.meta.url), 'utf8');

    expect(figmaCss).toContain(`@import './figma-theme.css';`);
    expect(figmaCss).toContain(`@import './utilities.css';`);
    expect(figmaCss).toContain(`@import './preflight.css' layer(base);`);
    expect(figjamCss).toContain(`@import './figjam-theme.css';`);
    expect(figjamCss).toContain(`@import './utilities.css';`);
    expect(indexCss).toContain(`@import './figma-theme.css';`);
    expect(indexCss).toContain(`@import './figjam-theme.css';`);
    expect(indexCss).toContain('@custom-variant dark (&:where(.figma-dark, .figma-dark *));');
    expect(figmaThemeCss).toContain(
      `--figma-color-bg-brand: ${FigmaLightThemeCSSVariables['--figma-color-bg-brand']};`,
    );
    expect(figjamThemeCss).toContain(
      `--figma-color-bg-brand: ${FigJamLightThemeCSSVariables['--figma-color-bg-brand']};`,
    );
    expect(utilitiesCss).toContain('@utility text-figma-icon {');
    expect(utilitiesCss).toContain('@utility border-figma-bg-brand {');
    expect(utilitiesCss).toContain('@utility text-figma-menu {');
    expect(utilitiesCss).toContain('@utility bg-figma-elevated {');
    expect(utilitiesCss).toContain('@utility bg-figma-overlay {');
    expect(utilitiesCss).toContain('@utility fill-figma-elevated {');
    expect(utilitiesCss).toContain('@utility fill-figma-inverse {');
    expect(utilitiesCss).toContain('@utility bg-figma-icon {');
    expect(utilitiesCss).toContain('@utility fill-figma-bg-tooltip {');
    expect(utilitiesCss).toContain('@utility outline-figma-icon {');
    expect(utilitiesCss).toContain('@utility text-figma-border {');
    expect(utilitiesCss).toContain('@utility bg-figma-text {');
    expect(utilitiesCss).not.toContain('@utility font-figma {');
    expect(utilitiesCss).not.toContain('@utility font-figma-default {');
    expect(utilitiesCss).not.toContain('@utility text-figma-sm {');
    expect(utilitiesCss).not.toContain('@utility leading-figma-sm {');
    expect(utilitiesCss).not.toContain('@utility tracking-figma-sm {');
    expect(utilitiesCss).not.toContain('@utility rounded-figma-md {');
    expect(utilitiesCss).not.toContain('@utility p-figma-1 {');
    expect(utilitiesCss).not.toContain('@utility shadow-figma-menu {');
  });
});
