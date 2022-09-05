module.exports = {
  root: true,
  parser: '@typescript-eslint/parser',
  extends: ['eslint:recommended', 'plugin:solid/typescript', 'plugin:@typescript-eslint/recommended', 'prettier'],
  ignorePatterns: ['**/dist/**/*', '.*.js'],
  plugins: ['@typescript-eslint', 'solid', 'simple-import-sort', 'prettier'],
  rules: {
    '@typescript-eslint/no-empty-function': 'off',
    '@typescript-eslint/no-unused-vars': ['error', {
      argsIgnorePattern: '^_', 
      varsIgnorePattern: '^_', 
    }],
    'prettier/prettier': 'error',
    'simple-import-sort/imports': 'error',
    'simple-import-sort/exports': 'error',
  },
};
