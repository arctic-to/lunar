module.exports = {
  extends: [
    './node_modules/hitoka/.eslintrc.js',
    'plugin:react-hooks/recommended',
    'plugin:import/typescript',
  ],
  plugins: ['import'],
  settings: {
    'import/internal-regex': '^@/',
  },
  rules: {
    'no-unused-vars': 'off',
    '@typescript-eslint/no-unused-vars': 'error',
    '@typescript-eslint/ban-ts-comment': 'off',
    '@typescript-eslint/no-namespace': 'off',
    'no-console': 'error',
    'react-hooks/exhaustive-deps': 'error',
    'import/order': [
      'error',
      {
        alphabetize: { order: 'asc' },
        'newlines-between': 'always',
        groups: [
          'builtin',
          'external',
          'internal',
          'parent',
          'sibling',
          'index',
        ],
      },
    ],
  },
}
