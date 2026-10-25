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
    writeCSSFile('preflight.css', THEME_PREFLIGHT_CSS),
    writeCSSFile(
      'figma.css',
      `@import './preflight.css' layer(base);\n@import './figma-theme.css';\n@import './utilities.css';`,
    ),
    writeCSSFile(
      'figjam.css',
      `@import './preflight.css' layer(base);\n@import './figjam-theme.css';\n@import './utilities.css';`,
    ),
    writeCSSFile(
      'index.css',
      `@import './preflight.css' layer(base);\n@import './figma-theme.css';\n@import './figjam-theme.css';\n@import './utilities.css';\n@custom-variant dark (&:where(.figma-dark, .figma-dark *));`,
    ),
  ]);
}

await main();
