import { defineConfig, presetUno, transformerVariantGroup } from 'unocss';
import presetRemToPx from '@unocss/preset-rem-to-px';
import { presetFigma } from '@thinkbuff/figma-theme/unocss';

export default defineConfig({
  presets: [
    presetUno({
      dark: {
        light: '.figma-light',
        dark: '.figma-dark',
      },
    }),
    presetFigma(),
    presetRemToPx(),
  ],
  transformers: [transformerVariantGroup()],
});
