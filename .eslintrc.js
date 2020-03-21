module.exports = {
  "env": {
    "es6": true,
    "mocha": true,
    "node": true,
    "browser": true,
  },
  extends: [
    'airbnb-base',
  ],
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly',
  },
  parserOptions: {
    ecmaVersion: 2018,
    sourceType: 'module',
  },
  rules: {
      "linebreak-style": 0,
      "no-undef": 0, 
      "array-callback-return": 0, 
      "consistent-return": 0,
      "no-console": 0,
      "camelcase": 0,
      "import/no-extraneous-dependencies": 0,
      "import/no-named-as-default": 0,
      "import/no-named-as-default-member": 0
  },
};
