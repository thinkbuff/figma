import { readFileSync } from 'node:fs';

import { describe, expect, it } from 'vitest';

import {
  generateThemeVariablesCSS,
  FigJamLightThemeCSSVariables,
  FigmaDarkThemeCSSVariables,
  FigmaLightThemeCSSVariables,
  SharedFoundationVariables,
} from '../../src/theme/index';
import { docsThemeTokenSource } from '../../src/theme/tokens';

describe('@thinkbuff/figma-theme', () => {
  it('keeps complete per-mode token maps', () => {
    expect(docsThemeTokenSource.themes['figma-light']['--figma-color-bg']).toBeDefined();
    expect(docsThemeTokenSource.themes['figma-light']['--figma-color-bg-menu']).toBe('#1e1e1e');
    expect(docsThemeTokenSource.themes['figma-light']['--figma-color-text-tooltip']).toBeDefined();
    expect(docsThemeTokenSource.themes['figjam']['--figma-color-bg-menu-selected']).toBeDefined();
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
    expect(css).toContain('html.figjam, .figjam');
    expect(css).not.toContain(':root, html.figjam');
    expect(css).toContain(
      `--figma-color-bg-brand: ${FigJamLightThemeCSSVariables['--figma-color-bg-brand']};`,
    );
  });

  it('ships css entry files with matching imports and generated token values', () => {
    const figmaCss = readFileSync(new URL('../../src/css/figma.css', import.meta.url), 'utf8');
    const figjamCss = readFileSync(new URL('../../src/css/figjam.css', import.meta.url), 'utf8');
    const indexCss = readFileSync(new URL('../../src/css/index.css', import.meta.url), 'utf8');
    const figmaThemeCss = readFileSync(
      new URL('../../src/css/figma-theme.css', import.meta.url),
      'utf8',
    );
    const figjamThemeCss = readFileSync(
      new URL('../../src/css/figjam-theme.css', import.meta.url),
      'utf8',
    );
    const utilitiesCss = readFileSync(
      new URL('../../src/css/utilities.css', import.meta.url),
      'utf8',
    );

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

describe('UI3 theme tokens', () => {
  it('exposes semantic typography foundation variables and aliases', () => {
    const css = generateThemeVariablesCSS('figma');

    const expected: Record<string, [string, string, string]> = {
      'body-small': ['.5625rem', '.875rem', '.00281rem'],
      'body-medium': ['.6875rem', '1rem', '.00344rem'],
      'body-large': ['.8125rem', '1.375rem', '-.00203rem'],
      'heading-small': ['.8125rem', '1.375rem', '-.00203rem'],
      'heading-medium': ['.9375rem', '1.5625rem', '-.00469rem'],
      'heading-large': ['1.5rem', '2rem', '-.0255rem'],
      'heading-display': ['3rem', '3.5rem', '-.09rem'],
    };

    for (const [name, [size, lineHeight, letterSpacing]] of Object.entries(expected)) {
      expect(css).toContain(`--figma-font-size-${name}: ${size};`);
      expect(css).toContain(`--figma-line-height-${name}: ${lineHeight};`);
      expect(css).toContain(`--figma-letter-spacing-${name}: ${letterSpacing};`);
      expect(css).toContain(`--text-figma-${name}: ${size};`);
      expect(css).toContain(`--text-figma-${name}--line-height: ${lineHeight};`);
      expect(css).toContain(`--text-figma-${name}--letter-spacing: ${letterSpacing};`);
      expect(css).toContain(`--leading-figma-${name}: ${lineHeight};`);
      expect(css).toContain(`--tracking-figma-${name}: ${letterSpacing};`);
    }
  });

  it('sets font-weight aliases on non-default-weight styles only', () => {
    const css = generateThemeVariablesCSS('figma');

    for (const name of [
      'heading-small',
      'heading-medium',
      'heading-large',
      'body-small-strong',
      'body-medium-strong',
      'body-large-strong',
    ]) {
      expect(css).toContain(`--text-figma-${name}--font-weight: 550;`);
    }
    for (const name of ['body-small', 'body-medium', 'body-large', 'heading-display']) {
      expect(css).not.toContain(`--text-figma-${name}--font-weight`);
    }
  });

  it('renumbers the spacing scale', () => {
    const css = generateThemeVariablesCSS('figma');

    expect(css).toContain('--figma-space-5: 2rem;');
    expect(css).toContain('--figma-space-6: 2.5rem;');
    expect(css).not.toContain('--figma-space-7');
    expect(css).toContain('--spacing-figma-5: 2rem;');
    expect(css).toContain('--spacing-figma-6: 2.5rem;');
    expect(css).not.toContain('--spacing-figma-7');
  });

  it('emits per-theme elevation variables outside @theme', () => {
    const css = generateThemeVariablesCSS('figma');

    const plainTheme = css.split('@theme {')[1].split('}')[0];
    expect(plainTheme).not.toContain('--figma-elevation-');

    const lightBlock = css.split(':root, html.figma-light, .figma-light {')[1].split('}')[0];
    expect(lightBlock).toContain('--figma-elevation-100:');
    expect(lightBlock).toContain('--figma-elevation-500:');
    expect(lightBlock).not.toContain('inset');

    const darkBlock = css.split('html.figma-dark, .figma-dark {')[1].split('}')[0];
    expect(darkBlock).toContain('--figma-elevation-100:');
    expect(darkBlock).toContain('--figma-elevation-500:');
    expect(darkBlock).toContain('inset');

    const figjamCss = generateThemeVariablesCSS('figjam');
    const figjamBlock = figjamCss.split('html.figjam, .figjam {')[1].split('}')[0];
    expect(figjamBlock).toContain('--figma-elevation-100:');
    expect(figjamBlock).toContain('--figma-elevation-500:');
    expect(figjamBlock).not.toContain('inset');
  });

  it('emits shadow aliases only inside @theme inline', () => {
    const css = generateThemeVariablesCSS('figma');

    const plainTheme = css.split('@theme {')[1].split('}')[0];
    expect(plainTheme).not.toContain('--shadow-figma-');

    const inlineTheme = css.split('@theme inline {')[1].split('}')[0];
    for (const level of ['100', '200', '300', '400', '500']) {
      expect(inlineTheme).toContain(
        `--shadow-figma-elevation-${level}: var(--figma-elevation-${level});`,
      );
    }
    expect(inlineTheme).toContain('--shadow-figma-tooltip: var(--figma-elevation-300);');
    expect(inlineTheme).toContain('--shadow-figma-menu: var(--figma-elevation-400);');
    expect(inlineTheme).toContain('--shadow-figma-modal: var(--figma-elevation-500);');
    expect(inlineTheme).toContain('--shadow-figma-slider:');

    const lightBlock = css.split(':root, html.figma-light, .figma-light {')[1].split('}')[0];
    expect(lightBlock).toContain('--figma-shadow-tooltip: var(--figma-elevation-300);');
    expect(lightBlock).toContain('--figma-shadow-menu: var(--figma-elevation-400);');
    expect(lightBlock).toContain('--figma-shadow-modal: var(--figma-elevation-500);');
  });
});
