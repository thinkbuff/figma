import { mkdir, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

import { generateThemeVariablesCSS } from './colors';
import { THEME_PREFLIGHT_CSS } from './preflight';
import { generateThemeUtilitiesCSS } from './utilities';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const cssDirectory = path.resolve(__dirname, '../css');

async function writeCSSFile(fileName: string, contents: string) {
  await mkdir(cssDirectory, { recursive: true });
  await writeFile(path.join(cssDirectory, fileName), `${contents}\n`);
}

async function main() {
  await Promise.all([
    writeCSSFile('utilities.css', generateThemeUtilitiesCSS()),
    writeCSSFile('figma-theme.css', generateThemeVariablesCSS('figma')),
    writeCSSFile('figjam-theme.css', generateThemeVariablesCSS('figjam')),
    writeCSSFile('devmode-theme.css', generateThemeVariablesCSS('devmode')),
    writeCSSFile('slides-theme.css', generateThemeVariablesCSS('slides')),
    writeCSSFile('preflight.css', THEME_PREFLIGHT_CSS),
    // Standalone entries duplicate their editor's light block under :root.
    writeCSSFile(
      'figma.css',
      `@import './preflight.css' layer(base);\n@import './figma-theme.css';\n@import './utilities.css';`,
    ),
    writeCSSFile('figjam.css', editorEntry('figjam')),
    writeCSSFile('devmode.css', editorEntry('devmode')),
    writeCSSFile('slides.css', editorEntry('slides')),
    writeCSSFile(
      'index.css',
      `@import './preflight.css' layer(base);\n@import './figma-theme.css';\n@import './figjam-theme.css';\n@import './devmode-theme.css';\n@import './slides-theme.css';\n@import './utilities.css';\n@custom-variant dark (&:where(.figma-dark, .figma-dark *));`,
    ),
  ]);
}

// Standalone entries embed a :root variant of their editor's light block so an
// unthemed plugin gets that editor's light mode. Imports come first (CSS rule).
function editorEntry(type: 'figjam' | 'devmode' | 'slides') {
  return `@import './preflight.css' layer(base);\n@import './utilities.css';\n${generateThemeVariablesCSS(type, true)}`;
}

await main();
