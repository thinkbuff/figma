import * as StorybookPlugin from 'eslint-plugin-storybook';
import { defineFlatConfigAsync } from '@thinkbuff/eslint-config';

const storybookConfigs = StorybookPlugin.configs.recommended.overrides.map(config => ({
  name: 'storybook:rules',
  plugins: {
    storybook: StorybookPlugin,
  },
  ...config,
}));

export default defineFlatConfigAsync({
  react: {
    a11y: 'recommended',
  },
  unocss: true,
  extends: [
    ...storybookConfigs,
  ],
});
