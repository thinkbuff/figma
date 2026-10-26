import { defineConfig } from 'vite-plus';

export default defineConfig({
  test: {
    environment: 'node',
    include: ['tests/**/*.test.ts'],
  },
  pack: {
    entry: ['src/index.ts', 'src/colors/index.ts'],
    format: ['esm'],
    dts: true,
    unbundle: true,
    target: 'esnext',
  },
});
