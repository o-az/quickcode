/** @type {import('@types/eslint').Linter.Config} */
module.exports = {
  root: true,
  env: {
    es6: true,
    node: true,
    browser: true,
  },
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    ecmaFeatures: { jsx: true, impliedStrict: true },
  },
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint', 'prettier'],
  extends: ['eslint:recommended', 'plugin:@typescript-eslint/recommended', 'plugin:jsx-a11y/recommended', 'prettier'],
  settings: {},
  rules: {
    'prettier/prettier': ['warn', {}, { usePrettierrc: true }],
    '@typescript-eslint/ban-ts-comment': ['off'],
    '@typescript-eslint/no-explicit-any': ['off'],
    'mdx/no-unused-expressions': ['off'],
    'prefer-const': ['off'],
    'jsx-a11y/accessible-emoji': 'off',
    '@typescript-eslint/explicit-function-return-type': 'off',
    '@typescript-eslint/no-unused-vars': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'jsx-a11y/anchor-is-valid': [
      'error',
      {
        components: ['Link'],
        specialLink: ['hrefLeft', 'hrefRight'],
        aspects: ['invalidHref', 'preferButton'],
      },
    ],
    'no-mixed-operators': 'off',
    'no-multiple-empty-lines': 'off',
    'no-unexpected-multiline': 'off',
    '@typescript-eslint/no-var-requires': 'off',
    '@typescript-eslint/ban-types': [
      'warn',
      {
        types: {
          String: {
            message: 'Use string instead',
            fixWith: 'string',
          },

          '{}': {
            message: 'Use object instead',
            fixWith: 'object',
          },
        },
      },
    ],
  },
};
