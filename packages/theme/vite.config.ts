import { defineConfig } from 'vite-plus';

export default defineConfig({
  test: {
    environment: 'node',
    include: ['src/**/*.test.ts'],
  },
  pack: {
    entry: ['src/index.ts', 'src/constants.ts', 'src/colors/index.ts', 'src/unocss/index.ts'],
    format: ['esm'],
    dts: true,
    unbundle: true,
    target: 'esnext',
    external: ['unocss', '@unocss/core'],
  },
});
