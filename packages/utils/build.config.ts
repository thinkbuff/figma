import { defineBuildConfig } from 'unbuild';

export default defineBuildConfig({
  entries: [
    {
      builder: 'mkdist',
      input: 'src',
      outDir: 'dist',
    },
  ],
  clean: true,
  declaration: true,
  alias: {
    '~': './src',
  },
  failOnWarn: false,
  rollup: {
    inlineDependencies: true,
    output: {
      preserveModules: true,
    },
  },
});
