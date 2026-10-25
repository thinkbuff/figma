import { glob } from 'glob';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { defineConfig } from 'vite-plus';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const entries = Object.fromEntries(
  glob
    .sync('src/**/*.ts', {
      ignore: ['src/**/*.test.ts'],
    })
    .map(file => [
      path.relative('src', file.slice(0, file.length - path.extname(file).length)),
      path.resolve(__dirname, file),
    ]),
);

export default defineConfig({
  test: {
    environment: 'node',
    include: ['src/**/*.test.ts'],
  },
  pack: {
    entry: entries,
    format: ['esm'],
    dts: true,
    unbundle: true,
    target: 'esnext',
  },
});
