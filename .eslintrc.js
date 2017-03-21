// http://eslint.org/docs/user-guide/configuring

module.exports = {
  root: true,
  extends: 'standard',
  parser: 'babel-eslint',
  parserOptions: {
    sourceType: 'module'
  },
  globals: {
    // Put things like jQuery, etc
    jQuery: true,
    $: true,
  },
  env: {
    browser: true,
    jquery: true,
  },
  // required to lint *.vue files
  plugins: [
    'html'
  ],
  // add your custom rules here
  rules: {
    // allow debugger during development
    'no-debugger': process.env.NODE_ENV === 'production' ? 2 : 0,
    "camelcase": 0,
    "no-extra-boolean-cast": 0,
    "space-before-function-paren": ["error", "never"],
    "semi": ["error", "always"],
    "comma-dangle": [2, "always-multiline"],
    "no-console": 0, //console 未删除
    "no-var": 0,
    "no-new": 0,
    "import/no-unresolved": 0,
    "no-underscore-dangle": [0],
    "prefer-template": 0,
    "object-shorthand": [0],
    "prefer-arrow-callback": 0,
    "prefer-rest-params": 0,
    "no-param-reassign": 0,
    "max-len": ["error", {
      "code": 200,
      "tabWidth": 2,
      "comments": 200,
      "ignoreComments": false,
      "ignoreTrailingComments": false,
      "ignoreUrls": true
    }],
    "global-require": 0,
    'no-restricted-syntax': [
      2,
      'LabeledStatement',
      'WithStatement',
    ]
  }
}
