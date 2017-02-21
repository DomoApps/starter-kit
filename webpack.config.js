const getDefaultConfig = require('@appteam6/webpack-config');
const path = require('path');
const webpack = require('webpack');
const pkg = require('./package.json');

module.exports = (env = {}) => {
  let config = getDefaultConfig(env);

  // modify the default config as needed
  config.plugins.push(
    new webpack.DefinePlugin({
      VERSION: JSON.stringify(pkg.version),
      APP_NAME: JSON.stringify(pkg.name)
    })
  );

  // config.externals = {
  //   react: 'react',
  //   'react-dom': 'react-dom',
  //   'react-redux': 'react-redux',
  //   redux: 'redux'
  // };

  return config;
};
