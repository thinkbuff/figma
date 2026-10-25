import path from 'node:path';
import { fileURLToPath } from 'node:url';
import react from '@vitejs/plugin-react';
import { playwright } from '@vitest/browser-playwright';
import unocss from 'unocss/vite';
import { defineConfig } from 'vitest/config';

import { dependencies } from './package.json';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const vitePlugins = [
  react(),
  unocss({
    content: {
      filesystem: ['src/**/*.{ts,tsx}'],
    },
  }),
];

const viteResolve = {
  alias: {
    '~': path.resolve(__dirname, 'src'),
  },
};

const optimizeDeps = {
  include: [
    'react',
    'react/jsx-runtime',
    'react/jsx-dev-runtime',
    'react-dom',
    'react-dom/client',
    'vitest-browser-react',
    ...Object.keys(dependencies),
  ],
};

export default defineConfig({
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
        plugins: vitePlugins,
        resolve: viteResolve,
        optimizeDeps,
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
        plugins: vitePlugins,
        resolve: viteResolve,
        optimizeDeps,
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
    ],
  },
});
