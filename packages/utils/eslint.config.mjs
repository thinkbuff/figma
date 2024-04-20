import { defineFlatConfigAsync } from '@thinkbuff/eslint-config';

export default defineFlatConfigAsync({
  stylistic: {
    overrides: {
      '@stylistic/indent-binary-ops': 'off',
    },
  },
});
