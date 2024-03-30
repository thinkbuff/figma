import * as StorybookPlugin from 'eslint-plugin-storybook';
import { defineFlatConfigAsync } from '@thinkbuff/eslint-config';

export default defineFlatConfigAsync({
  react: {
    a11y: 'recommended',
  },
  unocss: true,
  extends: [
    ...StorybookPlugin.configs.recommended.overrides.map(config => ({
      name: 'storybook:rules',
      plugins: {
        storybook: StorybookPlugin,
      },
      ...config,
    })),
    {
      files: [
        '.storybook/*.@(ts|tsx|js|jsx|mjs|cjs)',
        '**/*.@(stories|story).@(ts|tsx|js|jsx|mjs|cjs)',
      ],
      rules: {
        'import/no-default-export': 'off',
        'react-hooks/rules-of-hooks': 'off',
      },
    },
  ],
});
