import antfu from '@antfu/eslint-config';

export default antfu({
  vue: {
    overrides: {
      'vue/operator-linebreak': ['error', 'before'],
    },
  },
  typescript: {
    overrides: {
      'ts/consistent-type-definitions': ['error', 'interface'],
      'ts/ban-ts-comment': 'off',
    },
  },
  rules: {
    'style/semi': ['error', 'always'],
    'unicorn/prefer-node-protocol': 'off',
    'test/prefer-lowercase-title': 'off',
  },
  ignores: [
    '.DS_Store',
    'node_modules',
    '*.log',
    'dist',
    '.output',
  ],
});
