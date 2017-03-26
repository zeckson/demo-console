module.exports = {
  'root': true,

  'extends': 'htmlacademy/es5',

  'env': {
    'node': true,
    'browser': true,
    'mocha': true
  },

  'globals': {
    expect: true,
    chai: true,
    chaiDiff: true,
    Symbol: true
  },

  'rules': {
    'no-fallthrough': 'off',
    'guard-for-in': 'off'
  }
};
