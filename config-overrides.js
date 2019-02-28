const { override, fixBabelImports, useEslintRc, enableEslintTypescript }  = require('customize-cra');

module.exports = override(
  useEslintRc(),
  enableEslintTypescript(),
  fixBabelImports('import', {
    libraryName: 'antd-mobile',
    libraryDirectory: 'es',
    style: 'css'
  })
);