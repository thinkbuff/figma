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
    ignore: 'src/**/*.stories.{ts,tsx}',
  })
  .map((file) => {
    const isComponentsDir = file.includes('src/components');
    return [
      path.relative(
        isComponentsDir ? 'src/components' : 'src',
        file.slice(0, file.length - path.extname(file).length),
      ),
      path.resolve(__dirname, file),
    ];
  });

/**
 * @see https://vitejs.dev/config/
 */
export default defineConfig({
  resolve: {
    alias: {
      '~/utils': path.resolve(__dirname, 'src/utils'),
    },
  },
  build: {
    copyPublicDir: false,
    target: 'esnext',
    minify: true,
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
  plugins: [
    react(),
    unocss(),
    dts({
      include: ['src/**/*.{ts,tsx}'],
      exclude: ['src/**/*.stories.{ts,tsx}'],
      beforeWriteFile: (filePath, content) => {
        if (filePath.includes('components/index.d.ts')) {
          return {
            filePath: filePath.replace('components/index.d.ts', 'components.d.ts'),
            content,
          };
        }

        return {
          filePath: filePath.replace('components/', ''),
          content: content,
        };
      },
    }),
  ],
});
