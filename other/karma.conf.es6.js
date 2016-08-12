module.exports = config => {
  // load external cdn dependencies
  const pkg = require('../package.json');
  const cdns = Object.values(pkg.cdnDependencies);

  // entry file that bundles all the test files
  const testEntryFile = './other/tests.js';

  const webpackConfig = require('../webpack.config');
  const webpackLoaders = webpackConfig.module.loaders;

  config.set({
    frameworks: ['mocha', 'chai', 'sinon'],
    files: [
      ...cdns,
      testEntryFile
    ],
    preprocessors: {
      [testEntryFile]: ['webpack', 'sourcemap']
    },
    webpack: {
      module: {
        loaders: webpackLoaders
      },
      devtool: 'inline-source-map'
    },
    webpackMiddleware: {
      noInfo: true
    },
    // how the test success/failure status is reported:
    reporters: ['dots'],
    logLevel: config.LOG_ERROR,
    browsers: ['PhantomJS', 'Chrome', 'Firefox', 'Safari'],
    plugins: [
      'karma-phantomjs-launcher',
      'karma-sourcemap-loader',
      'karma-chrome-launcher',
      'karma-firefox-launcher',
      'karma-safari-launcher',
      'karma-mocha',
      'karma-chai',
      'karma-sinon',
      'karma-webpack'
    ]
  });
};
