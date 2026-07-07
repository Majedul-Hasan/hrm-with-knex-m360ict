module.exports = {
  root: true,
  env: {
    node: true,
    es2022: true,
  },
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  plugins: ['@typescript-eslint', 'unused-imports', 'simple-import-sort'],
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'prettier', // disables formatting rules that conflict with prettier
  ],
  rules: {
    /* ===========================
     * TypeScript Rules
     * =========================== */
    '@typescript-eslint/no-explicit-any': 'warn',
    '@typescript-eslint/no-unused-vars': 'off',

    /* ===========================
     * Import Management
     * =========================== */
    'unused-imports/no-unused-imports': 'error',
    'simple-import-sort/imports': 'error',
    'simple-import-sort/exports': 'error',

    /* ===========================
     * General Rules
     * =========================== */
    'no-console': 'warn',
    'prefer-const': 'error',
  },
};
