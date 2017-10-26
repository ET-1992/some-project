module.exports = {
  root: true,
  extends: 'airbnb-base',
  parser: 'babel-eslint',
  env: {
    node: true,
    browser: true,
    es6: true
  },
  globals: {
    window: true,
    document: true,
    __ISUC__: true,
    __ISDEV__: true,
    location: true
  },
  // add your custom rules here
  rules: {
    // allow paren-less arrow functions
    'arrow-parens': 0,
    // allow async-await
    'generator-star-spacing': 0,
    // allow debugger during development
    'no-debugger': process.env.NODE_ENV === 'production' ? 2 : 0,
    // do not allow console.logs etc...
    'no-console': process.env.NODE_ENV === 'production' ? 1 : 0,
    'global-require': [0],
    semi: [2, 'always'],
    'eol-last': [0],
    'max-len': [1, 160],
    'no-unused-expressions': 0,
    'comma-dangle': [2, 'never'],
    'func-names': [2, 'as-needed'],
    'no-underscore-dangle': 0,
    'no-plusplus': 0,
    'no-param-reassign': 0,
    'no-use-before-define': 0,
    'no-mixed-operators': 0,
    camelcase: 0,
    'object-curly-newline': 0,
    'prefer-destructuring': 0,
    'spaced-comment': 0
  }
};
