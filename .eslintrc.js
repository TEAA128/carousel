module.exports = {
  env: {
    browser: true,
    es6: true,
    node: true,
  },
  extends: [
    'plugin:react/recommended',
    'airbnb',
  ],
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly',
  },
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 2018,
    sourceType: 'module',
  },
  plugins: [
    'react',
  ],
  rules: {
    'no-console': 'off',
    'no-plusplus': ['error', { "allowForLoopAfterthoughts": true }],
    'no-underscore-dangle': ["error", { "allow": ["_id"] }],
    'no-unused-vars': 'off'
  },
};
