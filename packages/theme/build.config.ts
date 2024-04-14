import { defineBuildConfig } from 'unbuild';

export default defineBuildConfig({
  entries: [
    'src/index',
    'src/colors/index',
    'src/unocss/index',
  ],
  clean: true,
  declaration: true,
});
