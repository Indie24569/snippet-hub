module.exports = {
  parser: '@typescript-eslint/parser',
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:@typescript-eslint/recommended',
  ],
  plugins: ['react', '@typescript-eslint'],
  env: {
    browser: true,
    es2021: true,
  },
  rules: {

    'react/react-in-jsx-scope': 'off', 
  },
  settings: {
    react: {
      version: 'detect',
    },
  },
};
