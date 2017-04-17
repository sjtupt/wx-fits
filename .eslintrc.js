module.exports = {
  extends: 'standard',
  plugins: [
    'standard',
    'promise',
    'json'
  ],
  globals: {
    App: true,
    Page: true,
    getApp: true,
    wx: true
  },
  rules: {
    semi: 0,
    'no-unused-vars': 0,
    'no-undef': 0,
    'no-extra-boolean-cast': 0,
    'no-unneeded-ternary': 0
  },
  ignore: [
    '**/vendor/'
  ]
};
