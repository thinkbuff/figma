import { execFileSync } from 'node:child_process';
import { createHash } from 'node:crypto';
import { cpSync, existsSync, mkdirSync, readdirSync, readFileSync, rmSync } from 'node:fs';
import { tmpdir } from 'node:os';
import path from 'node:path';

// Snapshot baselines, re-run the screenshot update, report which shots changed.
// Extra args are forwarded to vitest, e.g. `pnpm vrt:diff -- -t Checkbox`.
const root = path.resolve(import.meta.dirname, '..');
const baselines = path.join(root, 'packages/react/tests/visual/__screenshots__');
const before = path.join(tmpdir(), 'figma-vrt-diff', 'before');

rmSync(path.dirname(before), { recursive: true, force: true });
mkdirSync(before, { recursive: true });
cpSync(baselines, before, { recursive: true });
console.log(`snapshot -> ${before}`);

const extra = process.argv.slice(2);
if (extra[0] === '--') {
  extra.shift();
}
execFileSync('pnpm', ['-F', '@thinkbuff/figma-react', 'test:visual:update', ...extra], {
  cwd: root,
  stdio: 'inherit',
});

function hash(file: string) {
  return createHash('sha256').update(readFileSync(file)).digest('hex');
}
const changed: string[] = [];
const added: string[] = [];
for (const file of readdirSync(baselines).filter((f) => f.endsWith('.png'))) {
  if (!existsSync(path.join(before, file))) {
    added.push(file);
  } else if (hash(path.join(baselines, file)) !== hash(path.join(before, file))) {
    changed.push(file);
  }
}

if (changed.length === 0 && added.length === 0) {
  console.log('no baseline changes');
} else {
  for (const file of changed) {
    console.log(`changed  ${file}  (before: ${path.join(before, file)})`);
  }
  for (const file of added) {
    console.log(`added    ${file}`);
  }
}
