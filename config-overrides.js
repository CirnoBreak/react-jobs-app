const { override, fixBabelImports, useEslintRc }  = require('customize-cra');

module.exports = override(
  useEslintRc(),
  fixBabelImports('import', {
    libraryName: 'antd-mobile',
    libraryDirectory: 'es',
    style: 'css'
  })
);