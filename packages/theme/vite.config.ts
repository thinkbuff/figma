import { defineConfig } from 'vite-plus';

export default defineConfig({
  test: {
    environment: 'node',
    include: ['src/**/*.test.ts'],
  },
  pack: {
    entry: ['src/index.ts', 'src/colors/index.ts'],
    format: ['esm'],
    dts: true,
    unbundle: true,
    target: 'esnext',
  },
});
