import { defineBuildConfig } from 'unbuild';

export default defineBuildConfig({
  entries: [
    'src/index',
    'src/constants',
    'src/colors/index',
    'src/unocss/index',
  ],
  clean: true,
  declaration: true,
  externals: ['unocss', '@unocss/core'],
  failOnWarn: false,
});
