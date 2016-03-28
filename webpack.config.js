// Include dependencies
require('babel-register');
const getConfig = require('./other/webpack.config.es6');

/**
 * Configure your webpack setup here. These settings can be changed at any time.
 *
 * Read more on the wiki:
 * https://git.empdev.domo.com/AppTeam6/da-webpack/wiki/Webpack-Configuration
 */
module.exports = getConfig({
  includeDesktopView: true,
  includeMobileView: true,
  externals: {
    // Include your app's extra externals here
  },
  loaders: [
    // Include your app's extra loaders here
  ]
});
