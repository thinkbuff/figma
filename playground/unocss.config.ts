import {
  defineConfig,
  presetUno,
  presetIcons,
  transformerVariantGroup,
} from 'unocss';
import presetRemToPx from '@unocss/preset-rem-to-px';
import presetAnimations from 'unocss-preset-animations';
import { presetFigmaTheme } from '@thinkbuff/figma-theme/unocss';

export default defineConfig({
  content: {
    pipeline: {
      include: [
        'src/**/*.tsx',
        /(.*)(\/)?figma(-|\/packages\/)?react(.*)\.(c|m)?(js)(x?)$/,
      ],
    },
  },
  presets: [
    presetUno({
      dark: {
        light: '.figma-light',
        dark: '.figma-dark',
      },
    }),
    presetFigmaTheme(),
    presetAnimations(),
    presetRemToPx(),
    presetIcons({
      cdn: 'https://esm.sh/',
    }),
  ],
  transformers: [transformerVariantGroup()],
});
