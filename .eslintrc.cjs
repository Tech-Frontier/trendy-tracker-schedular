module.exports = {
  root: true,

  env: { es6: true, node: true },

  parser: '@typescript-eslint/parser',

  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'prettier',
  ],
  plugins: ['import', '@typescript-eslint'],
  settings: {
    'import/ignore': ['node_modules'],
  },
  rules: {
    '@typescript-eslint/no-empty-function': 'off',
    '@typescript-eslint/no-empty-interface': 'off',
    '@typescript-eslint/array-type': ['error', { default: 'array-simple' }],
    'eol-last': ['error', 'always'],
    '@typescript-eslint/no-unused-vars': 'error',

    // NOTE: 유용하게 쓰일 수 있음
    '@typescript-eslint/no-non-null-assertion': 'off',
    '@typescript-eslint/no-explicit-any': 'off',
    '@typescript-eslint/no-unsafe-member-access': 'off',
    '@typescript-eslint/require-await': 'off',

    "@typescript-eslint/strict-boolean-expressions": 'off',

    'no-restricted-imports': [
      'error',
      {
        paths: [
          {
            name: 'util',
            importNames: ['isArray'],
            message: '`Array.isArray`를 대신 사용해주세요!',
          },
        ],
      },
    ],

    // https://typescript-eslint.io/linting/troubleshooting/performance-troubleshooting#eslint-plugin-import
    'import/named': 'off',
    'import/namespace': 'off',
    'import/default': 'off',
    'import/no-named-as-default-member': 'off',
    'import/no-named-as-default': 'off',
    'import/no-cycle': 'off',
    'import/no-unused-modules': 'off',
    'import/no-deprecated': 'off',
    'import/no-duplicates': 'error',
    'import/order': [
      'error',
      {
        groups: [['builtin', 'external', 'internal'], 'parent', 'sibling', 'index'],
        alphabetize: { order: 'asc' },
      },
    ],

    'semi': 'error',
    'no-multiple-empty-lines': [
      'error',
      {
        max: 1
      }
    ],
  },
};
