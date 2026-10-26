import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite-plus';

import tailwindcss from '@tailwindcss/vite';
import { playwright } from '@vitest/browser-playwright';
import { glob } from 'glob';

import { dependencies } from './package.json';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const vitePlugins = [react(), tailwindcss()];

const viteResolve = {
  alias: {
    '~': path.resolve(__dirname, 'src'),
  },
};

// Every exported @base-ui/react subpath must be pre-optimized: the bare
// package name in `dependencies` does not cover deep imports, and a
// partially-optimized dep graph leaves stale Radix chunks in the browser
// test cache after a dependency swap (phantom VRT diffs).
const baseUiSubpaths = Object.keys(
  JSON.parse(
    fs.readFileSync(path.resolve(__dirname, 'node_modules/@base-ui/react/package.json'), 'utf8'),
  ).exports as Record<string, unknown>,
)
  .filter((key) => key !== '.' && !key.includes('*') && key !== './package.json')
  .map((key) => `@base-ui/react/${key.slice(2)}`);

const optimizeDeps = {
  include: [
    'react',
    'react/jsx-runtime',
    'react/jsx-dev-runtime',
    'react-dom',
    'react-dom/client',
    'vitest-browser-react',
    ...baseUiSubpaths,
    ...Object.keys(dependencies),
  ],
};

const entries = Object.fromEntries(
  glob
    .sync('src/**/*.{ts,tsx}', {
      ignore: ['src/**/*.test.*', 'src/**/*.stories.*', 'src/test-utils/**'],
    })
    .map((file) => [
      path.relative('src', file.slice(0, file.length - path.extname(file).length)),
      path.resolve(__dirname, file),
    ]),
);

export default defineConfig({
  plugins: vitePlugins,
  resolve: viteResolve,
  optimizeDeps,
  test: {
    projects: [
      {
        test: {
          name: 'unit',
          environment: 'node',
          include: ['src/**/*.test.ts'],
        },
      },
      {
        test: {
          name: 'browser',
          include: ['src/**/*.test.tsx'],
          setupFiles: ['./src/test-utils/setup.ts'],
          browser: {
            enabled: true,
            provider: playwright(),
            headless: true,
            instances: [{ browser: 'chromium' }],
          },
        },
      },
      {
        test: {
          name: 'vrt',
          include: ['tests/**/*.vrt.test.tsx'],
          setupFiles: ['./tests/visual/vrt.setup.ts'],
          browser: {
            enabled: true,
            provider: playwright(),
            headless: true,
            viewport: { width: 800, height: 600 },
            instances: [{ browser: 'chromium' }],
          },
        },
      },
      {
        define: {
          'import.meta.env.VRT_PROBE': JSON.stringify(process.env.VRT_PROBE ?? ''),
        },
        test: {
          name: 'probe',
          include: ['tests/visual/probe.test.tsx'],
          setupFiles: ['./tests/visual/vrt.setup.ts'],
          browser: {
            enabled: true,
            provider: playwright(),
            headless: true,
            viewport: { width: 800, height: 600 },
            instances: [{ browser: 'chromium' }],
          },
        },
      },
    ],
  },
  pack: {
    entry: entries,
    format: ['esm'],
    dts: true,
    unbundle: true,
    target: 'esnext',
  },
});
