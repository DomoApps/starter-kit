// Include dependencies
require('babel-register');
const getConfig = require('./other/webpack.config.es6');

/**
 * Configure your webpack setup here. These settings can be changed at any time.
 *
 * Read more on the wiki:
 * https://github.com/DomoApps/starter-kit/wiki/Webpack-Configuration
 */
module.exports = getConfig({
  includeDesktopView: false,
  includeResponsiveView: true,
  externals: {
    // Include your app's extra externals here
  },
  loaders: [
    // Include your app's extra loaders here
  ]
});
