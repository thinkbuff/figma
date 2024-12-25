import storybook from 'eslint-plugin-storybook';
import { defineFlatConfigAsync } from '@thinkbuff/eslint-config';

export default defineFlatConfigAsync({
  unocss: true,
  extends: [
    ...storybook.configs['flat/recommended'],
  ],
});
