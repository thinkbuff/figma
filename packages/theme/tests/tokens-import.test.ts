import { readFileSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

import { describe, expect, it } from 'vitest';

import {
  importColorFile,
  importSizingFile,
  importTypographyFile,
} from '../scripts/tokens-import.ts';

const fixtures = fileURLToPath(new URL('./fixtures/import', import.meta.url));

function loadFixture(name: string) {
  return JSON.parse(readFileSync(path.join(fixtures, name), 'utf8'));
}

describe('tokens-import', () => {
  const colorRoot = loadFixture('Light.tokens.json');

  it('resolves alias chains through primitives', () => {
    const result = importColorFile(colorRoot);
    expect(result['text']).toEqual({
      value: '#000000e6',
      description: 'Alias form of default text.',
    });
  });

  it('dedupes web names and keeps the first non-empty description', () => {
    const result = importColorFile(colorRoot);
    // _text/text-default and text/default/default both publish `text`
    expect(Object.keys(result).filter((key) => key === 'text')).toHaveLength(1);
  });

  it('excludes fullscreen, desktop, special/code and special/*inspect* paths', () => {
    const result = importColorFile(colorRoot);
    expect(result['code']).toBeUndefined();
    expect(result['inspector-accent']).toBeUndefined();
    expect(result['bg-desktop-panel']).toBeUndefined();
    expect(result['border-fs-selected']).toBeUndefined();
  });

  it('does not publish primitives (ramp) as colors', () => {
    const result = importColorFile(colorRoot);
    expect(Object.keys(result)).not.toContain('black-800');
  });

  it('keeps alpha as an 8-digit hex and drops ff', () => {
    const result = importColorFile(colorRoot);
    expect(result['icon-overlay']).toEqual({ value: '#ffffffe6' });
  });

  it('throws on conflicting duplicate web names', () => {
    const conflicting = JSON.parse(JSON.stringify(colorRoot));
    conflicting['✦']._text['text-default'].$value = '#ffffff';
    expect(() => importColorFile(conflicting)).toThrow(/Conflicting values/);
  });

  it('imports spacer and radius numbers', () => {
    const result = importSizingFile(loadFixture('Default.tokens.json'));
    expect(result.space).toEqual({ '0': 0, '2': 8 });
    expect(result.radius).toEqual({ medium: 5, full: 9999 });
  });

  it('imports typography with alias-resolved weights and em letter spacing', () => {
    const result = importTypographyFile(loadFixture('Mode 1.tokens.json'));
    expect(result.family).toEqual({ default: 'Inter', mono: 'Roboto Mono' });
    expect(result.weight).toEqual({ default: 450, strong: 550 });
    expect(result.styles['body-medium']).toEqual({
      fontSize: 11,
      lineHeight: 16,
      letterSpacing: 0.005,
      fontWeight: 450,
    });
    expect(result.styles['body-medium-strong'].fontWeight).toBe(550);
  });
});
