// Include dependencies
require('babel-register');
const getConfig = require('./other/webpack.config.es6');

/**
 * Configure your webpack setup here. These settings can be changed at any time.
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
