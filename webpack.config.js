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

  // Here you can modify the Webpack config to your heart's content
  // For example, if you need to add externals:
  // config.externals.react = 'React';
  // config.externals['react-dom'] = 'ReactDOM';
  config.externals.react = 'React';
  config.externals['react-dom'] = 'ReactDOM';

  return config;
};
