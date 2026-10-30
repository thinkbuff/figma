import { readFileSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

import { describe, expect, it } from 'vitest';

const tokensDirectory = fileURLToPath(new URL('../../tokens', import.meta.url));

type ColorFile = Record<string, { value: string; description?: string }>;

function readColorFile(name: string): ColorFile {
  return JSON.parse(readFileSync(path.join(tokensDirectory, 'colors', name), 'utf8'));
}

const COLOR_FILES = [
  'figma-light.json',
  'figma-dark.json',
  'figjam-light.json',
  'figjam-dark.json',
  'devmode-light.json',
  'devmode-dark.json',
  'slides-light.json',
  'slides-dark.json',
];

const OLD_TOKEN_NAMES = readFileSync(
  path.join(tokensDirectory, '../tests/fixtures/old-token-names.txt'),
  'utf8',
)
  .split('\n')
  .map((line) => line.trim())
  .filter(Boolean);

describe('normalized color tokens', () => {
  it('publishes identical key sets across all eight modes', () => {
    const [first, ...rest] = COLOR_FILES.map((name) => Object.keys(readColorFile(name)).sort());
    for (const keys of rest) {
      expect(keys).toEqual(first);
    }
  });

  it('keeps every token from the previous 268-name set', () => {
    const light = readColorFile('figma-light.json');
    for (const name of OLD_TOKEN_NAMES) {
      expect(light, `--figma-color-${name}`).toHaveProperty(name);
    }
  });
});

describe('generated css', () => {
  const cssDirectory = path.join(tokensDirectory, '../src/css');
  const indexCss = readFileSync(path.join(cssDirectory, 'index.css'), 'utf8');
  const figmaThemeCss = readFileSync(path.join(cssDirectory, 'figma-theme.css'), 'utf8');
  const figjamThemeCss = readFileSync(path.join(cssDirectory, 'figjam-theme.css'), 'utf8');

  it('imports the figjam theme from index.css', () => {
    expect(indexCss).toContain("@import './figjam-theme.css';");
  });

  it('declares figma light under :root', () => {
    const lightBlock = figmaThemeCss
      .split(':root, html.figma-light, .figma-light {')[1]
      .split('}')[0];
    expect(lightBlock).toContain('--figma-color-bg-brand: #0d99ff;');
  });

  it('does not claim :root in the figjam block', () => {
    expect(figjamThemeCss).not.toContain(':root');
    expect(figjamThemeCss).toContain(
      '.figjam, .figma-light .figjam, .figjam .figma-light, .figjam.figma-light {',
    );
  });
});
