module.exports = {
  extends: ["eslint-config-alloy/typescript-react"],
  rules: {
    "indent": [
      'error',
      2,
      {
        SwitchCase: 1,
        flatTernaryExpressions: true
      }
    ],
    "quote": "double",
    "space-before-function-paren": 0,
    "object-curly-spacing": 0,
    "react/jsx-indent-props": [2, 2]
  }
};
