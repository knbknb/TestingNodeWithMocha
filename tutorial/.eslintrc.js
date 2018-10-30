module.exports = {
    "extends": "airbnb-base",
    env: {
        node: true,
        mocha: true
      },
      rules: {
        'func-names':0,
        'prefer-arrow-callback': 0,
        'no-unused-expressions': 0,
        'no-console': 0,
        'comma-dangle': 0,
        indent: ['error', 2],
        'linebreak-style': ['error', 'unix'],
        quotes: ['error', 'single'],
        semi: ['error', 'always']
      }
};