import { defineConfig, presetUno, presetIcons, transformerVariantGroup } from 'unocss';
import presetRemToPx from '@unocss/preset-rem-to-px';
import presetAnimations from 'unocss-preset-animations';
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
    presetAnimations(),
    presetRemToPx(),
    presetIcons({
      cdn: 'https://esm.sh/',
    }),
  ],
  transformers: [transformerVariantGroup()],
});
