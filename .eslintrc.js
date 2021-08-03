module.exports = {
  root: true,
  env: {
    node: true
  },
  extends: ['plugin:vue/essential', 'eslint:recommended', '@vue/prettier'],
  parserOptions: {
    parser: 'babel-eslint'
  },
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'vue/no-unused-components': 'off',
    'vue/valid-v-slot': 'off',
    'no-unused-vars': 'off',
    'no-empty': 'off',
    'no-useless-catch': 'off',
    'no-dupe-keys': 'off',
    'no-undef': 'off'
  }
}
