import { defineConfig } from 'vite-plus';

export default defineConfig({
  lint: {
    plugins: ['import', 'jsdoc', 'eslint', 'typescript', 'unicorn', 'oxc', 'promise'],
    options: {
      typeAware: true,
    },
    ignorePatterns: [
      '**/dist/**',
      '**/coverage/**',
      '**/node_modules/**',
      '**/storybook-static/**',
      '**/__screenshots__/**',
    ],
    rules: {
      'curly': ['error', 'all'],
      'unicorn/filename-case': ['warn', { case: 'kebabCase' }],
      'typescript/consistent-type-imports': [
        'error',
        { prefer: 'type-imports', fixStyle: 'inline-type-imports' },
      ],
      'typescript/no-import-type-side-effects': 'error',
    },
    overrides: [
      {
        files: ['packages/react/**/*.{ts,tsx}', 'playground/**/*.{ts,tsx}'],
        plugins: ['react', 'jsx-a11y'],
        rules: {
          'react-hooks/rules-of-hooks': 'error',
          'react-hooks/exhaustive-deps': 'warn',
        },
      },
      {
        files: ['**/*.test.{ts,tsx}', '**/*.vrt.test.{ts,tsx}'],
        plugins: ['vitest'],
      },
    ],
  },
  fmt: {
    semi: true,
    singleQuote: true,
    jsxSingleQuote: false,
    singleAttributePerLine: true,
    printWidth: 100,
    ignorePatterns: [
      '*.md',
      '**/__screenshots__/**',
      '**/dist/**',
      '**/storybook-static/**',
      'pnpm-lock.yaml',
      'CHANGELOG.md',
    ],
    sortPackageJson: {
      sortScripts: false,
    },
    sortImports: {
      customGroups: [
        { groupName: 'vite', elementNamePattern: ['vite'] },
        { groupName: 'vite-plugins', elementNamePattern: ['@vitejs/**', 'vite-**'] },
        { groupName: 'workspace', elementNamePattern: ['@thinkbuff/**'] },
      ],
      groups: [
        'builtin',
        'vite',
        { newlinesBetween: false },
        'vite-plugins',
        'external',
        'workspace',
        ['internal', 'subpath'],
        ['parent', 'sibling', 'index'],
        'style',
        'unknown',
      ],
    },
  },
  staged: {
    '*': 'vp check --fix',
  },
});
