module.exports = {
  env: {
    browser: false
  },
  extends: [
    "@cowcoders/eslint-config/ts"
  ],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaVersion: "latest",
    sourceType: "module"
  },
  plugins: [
    "@typescript-eslint"
  ],
  rules: {
    quotes: ["error", "double"],
    semi: ["error", "always"],
    "comma-dangle": ["error", "only-multiline"],
    "space-before-function-paren": ["error", "never"],
    "indent": "off",
    "@typescript-eslint/indent": ["error", 2],
  }
};
