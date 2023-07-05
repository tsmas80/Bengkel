module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true,
    jest: true
  },
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:prettier/recommended'
  ],
  parserOptions: {
    ecmaFeatures: {
      jsx: true
    },
    ecmaVersion: 12,
    sourceType: 'module'
  },
  plugins: ['react'],
  rules: {
    'comma-dangle': [2, 'never'],
    // komen code di bawah jika nak hide error melambak
    'react/prop-types': 'off',
    'no-unused-vars': 'off',
    'react/jsx-filename-extension': [1, {extensions: ['.js', '.jsx']}],
    'no-use-before-define': [
      'error',
      {functions: true, classes: true, variables: false}
    ]
  }
};
//mudahkan developer nk bangunkan code dengan lebih sistematik
