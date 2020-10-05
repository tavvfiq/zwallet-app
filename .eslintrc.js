module.exports = {
  root: true,
  extends: '@react-native-community',
  parser: '@typescript-eslint/parser',
  '@typescript-eslint/explicit-function-return-type': [
    'error',
    {
      allowExpressions: true,
    },
  ],
  plugins: ['@typescript-eslint'],
};
