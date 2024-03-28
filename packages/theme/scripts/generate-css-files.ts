import fs from 'node:fs/promises';
import { existsSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

import { generateCSSVariables } from '../src/colors';
import { THEME_BASE_CSS } from '../src/constants';

const __dirname = dirname(fileURLToPath(import.meta.url));
const output = resolve(__dirname, '../dist/css');
const styles = ['figma', 'figjam'] as const;

if (!existsSync(output)) {
  await fs.mkdir(output, { recursive: true });
}

for (const file of styles) {
  await fs.writeFile(`${output}/${file}.css`, `${generateCSSVariables(file)}\n${THEME_BASE_CSS}`);
}
