import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import unocss from 'unocss/vite';
import dts from 'vite-plugin-dts';
import path from 'node:path';
import { glob } from 'glob';
import { fileURLToPath } from 'node:url';

import { dependencies } from './package.json';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const entries = glob
  .sync('src/**/*.{ts,tsx}', {
    ignore: ['src/components/index.ts', 'src/**/*.stories.{ts,tsx}'],
  })
  .map((file) => {
    const isInComponentsDir = file.includes('src/components/');
    return [
      path.relative(
        isInComponentsDir ? 'src/components' : 'src',
        file.slice(0, file.length - path.extname(file).length),
      ),
      path.resolve(__dirname, file),
    ];
  });

/**
 * @see https://vitejs.dev/config/
 */
export default defineConfig({
  plugins: [
    react(),
    unocss(),
    dts({
      include: ['src/**/*.{ts,tsx}'],
      exclude: ['src/**/*.stories.{ts,tsx}'],
      beforeWriteFile: (filePath, content) => ({
        filePath: filePath.replace('components/', ''),
        content: content,
      }),
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
    lib: {
      entry: Object.fromEntries(entries),
      formats: ['es'],
    },
    rollupOptions: {
      external: [
        'react',
        'react/jsx-runtime',
        'react-dom',
        ...Object.keys(dependencies),
      ],
      output: {
        preserveModules: true,
        entryFileNames: '[name].mjs',
      },
    },
  },
});
