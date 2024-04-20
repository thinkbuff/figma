import { defineConfig } from 'vite';
import dts from 'vite-plugin-dts';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { glob } from 'glob';

import { dependencies } from './package.json';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const entries = glob
  .sync('src/**/*.ts')
  .map(file => ([
    path.relative(
      'src',
      file.slice(0, file.length - path.extname(file).length),
    ),
    path.resolve(__dirname, file),
  ]));

/**
 * @see https://vitejs.dev/config/
 */
export default defineConfig({
  plugins: [
    dts({
      include: ['src/**/*.ts'],
    }),
  ],
  resolve: {
    alias: {
      '~': path.resolve(__dirname, 'src'),
    },
  },
  build: {
    copyPublicDir: false,
    target: 'esnext',
    minify: false,
    outDir: 'dist',
    lib: {
      entry: Object.fromEntries(entries),
      formats: ['es'],
    },
    rollupOptions: {
      external: Object.keys(dependencies),
      output: {
        preserveModules: true,
        entryFileNames: '[name].mjs',
      },
    },
  },
});
