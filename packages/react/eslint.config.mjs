import storybook from 'eslint-plugin-storybook';
import { defineFlatConfigAsync } from '@thinkbuff/eslint-config';

export default defineFlatConfigAsync({
  unocss: true,
  extends: [
    { ignores: ['storybook-static', '**/__screenshots__'] },
    ...storybook.configs['flat/recommended'],
  ],
});
