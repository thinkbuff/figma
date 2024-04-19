import { defineBuildConfig } from 'unbuild';

export default defineBuildConfig({
  entries: [
    'src/index',
    'src/message-channel/index',
  ],
  clean: true,
  declaration: true,
  alias: {
    '~': './src',
  },
  failOnWarn: false,
  rollup: {
    inlineDependencies: true,
  },
});
