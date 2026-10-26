/**
 * Adapted from figma-kit. MIT License
 * Copyright (c) 2024 Tigran Petrossian
 * https://github.com/tigranpetrossian/figma-kit/blob/beta/LICENSE
 */

import { readFileSync } from 'node:fs';
import { createRequire } from 'node:module';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

import { compile } from 'tailwindcss';
import { describe, expect, it } from 'vitest';

const require = createRequire(import.meta.url);
const __dirname = path.dirname(fileURLToPath(import.meta.url));
const TEST_STYLES = path.resolve(__dirname, 'test-utils/styles.css');
const TAILWIND_INDEX = path.join(
  path.dirname(require.resolve('tailwindcss/package.json')),
  'index.css',
);

/**
 * Compile the test stylesheet (same imports as the real bundle) with a set of
 * class candidates and extract the declarations Tailwind emitted for each.
 *
 * This is a contract check for utilities our components rely on: a class that
 * fails to compile returns {} and fails the assertion.
 */
async function buildUtilities(candidates: string[]) {
  const compiler = await compile(readFileSync(TEST_STYLES, 'utf8'), {
    base: path.dirname(TEST_STYLES),
    loadStylesheet,
    loadModule,
  });
  return compiler.build(candidates);
}

async function loadStylesheet(id: string, base: string) {
  const file =
    id === 'tailwindcss'
      ? TAILWIND_INDEX
      : id.startsWith('.')
        ? path.resolve(base, id)
        : require.resolve(id, { paths: [base, __dirname] });
  return { path: file, base: path.dirname(file), content: readFileSync(file, 'utf8') };
}

async function loadModule(id: string, base: string) {
  const file = require.resolve(id, { paths: [base, __dirname] });
  const module = await import(file);
  return { path: file, base: path.dirname(file), module: module.default ?? module };
}

function escapeCssSelector(className: string) {
  return className.replace(/[^a-zA-Z0-9-_]/g, (char) => `\\${char}`);
}

function declarationsOf(css: string, className: string) {
  const declarations: Record<string, string> = {};
  const selector = escapeCssSelector(className).replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  const pattern = new RegExp(`\\.${selector}(?::[^{}]+)?\\s*\\{([^}]*)\\}`, 'g');

  for (const match of css.matchAll(pattern)) {
    for (const declaration of match[1].split(';')) {
      const [property, ...rest] = declaration.split(':');
      const value = rest.join(':').trim();
      if (property?.trim() && value) {
        declarations[property.trim()] = value;
      }
    }
  }

  return declarations;
}

describe('utility contract', () => {
  it('compiles icon-figma-* utilities to --color-icon context variables', async () => {
    const css = await buildUtilities([
      'icon-figma',
      'icon-figma-secondary',
      'icon-figma-disabled',
      'icon-figma-text-secondary',
      'icon-figma-bg-brand',
      'icon-figma-border-selected',
    ]);

    expect(declarationsOf(css, 'icon-figma')).toEqual({
      '--color-icon': 'var(--figma-color-icon)',
    });
    expect(declarationsOf(css, 'icon-figma-secondary')).toEqual({
      '--color-icon': 'var(--figma-color-icon-secondary)',
    });
    expect(declarationsOf(css, 'icon-figma-disabled')).toEqual({
      '--color-icon': 'var(--figma-color-icon-disabled)',
    });
    expect(declarationsOf(css, 'icon-figma-text-secondary')).toEqual({
      '--color-icon': 'var(--figma-color-text-secondary)',
    });
    expect(declarationsOf(css, 'icon-figma-bg-brand')).toEqual({
      '--color-icon': 'var(--figma-color-bg-brand)',
    });
    expect(declarationsOf(css, 'icon-figma-border-selected')).toEqual({
      '--color-icon': 'var(--figma-color-border-selected)',
    });
  });

  it('keeps the iconify icon-[set--name] family compiling separately from icon-figma-*', async () => {
    const css = await buildUtilities(['icon-[tabler--x]', 'icon-figma-secondary']);

    expect(css).toContain('.icon-\\[tabler--x\\]');
    expect(declarationsOf(css, 'icon-figma-secondary')).toEqual({
      '--color-icon': 'var(--figma-color-icon-secondary)',
    });
  });

  it('compiles the value-field structural variants', async () => {
    const css = await buildUtilities([
      'empty:absolute',
      'empty:inset-y-0',
      'empty:left-0',
      'empty:z-figma-1',
      'empty:w-1',
      'not-empty:-mr-2',
      '[label>&]:last:w-5',
      'not-first:border-l',
      'has-[>label:hover]:after:border-figma-border',
      'mt-2.25!',
    ]);

    expect(declarationsOf(css, 'empty:absolute')).toMatchObject({ position: 'absolute' });
    expect(declarationsOf(css, 'empty:inset-y-0')).toMatchObject({ 'inset-block': '0px' });
    expect(declarationsOf(css, 'empty:z-figma-1')).toMatchObject({
      'z-index': 'var(--z-index-figma-1)',
    });
    expect(declarationsOf(css, 'empty:w-1')).toMatchObject({ width: 'var(--spacing)' });
    expect(declarationsOf(css, 'not-empty:-mr-2')).toMatchObject({
      'margin-right': 'calc(var(--spacing) * -2)',
    });
    expect(declarationsOf(css, 'not-first:border-l')).toMatchObject({ 'border-left-width': '1px' });
    expect(declarationsOf(css, 'has-[>label:hover]:after:border-figma-border')).toMatchObject({
      'border-color': 'var(--figma-color-border)',
    });
    expect(declarationsOf(css, 'mt-2.25!')).toMatchObject({
      'margin-top': 'calc(var(--spacing) * 2.25) !important',
    });
  });

  it('emits the variant selectors the value-field css translation depends on', async () => {
    const css = await buildUtilities([
      '[label>&]:last:w-5',
      'has-[>label:hover]:after:border-figma-border',
    ]);

    // A Label that is the last direct child of a Root (<label>) shrinks to w-5.
    expect(css).toContain('label > .\\[label\\>\\&\\]\\:last\\:w-5:last-child');
    // NumericSelect moves its hover ring to the Multi frame when a field is hovered.
    expect(css).toContain(':has( > label:hover)');
  });
});
