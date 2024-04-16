import fs from 'node:fs';
import { glob } from 'glob';

import { version } from '../package.json';

const files = glob.sync(['packages/*/package.json', 'playground/package.json']);

for (const file of files) {
  const pkg = JSON.parse(fs.readFileSync(file, 'utf8'));
  pkg.version = version;
  fs.writeFileSync(file, JSON.stringify(pkg, null, 2), 'utf8');
}
