'use strict';

module.exports = config => {
  const pkg = require('./package.json');
  const cdns = Object.values(pkg.cdnDependencies);

  const webpackConfig = require('./webpack.config')();
  const testPattern = 'src/**/*.spec.+(ts|tsx)';

  config.set({
    frameworks: ['mocha', 'chai'],
    files: [
      ...cdns,
      testPattern,
    ],
    preprocessors: {
      [testPattern]: ['webpack', 'sourcemap'],
    },
    mime: {
      // workaround for typescript mime type issue https://github.com/angular/angular-cli/issues/2125
      'text/x-typescript': ['ts','tsx']
    },
    webpack: webpackConfig,
    webpackMiddleware: {
      noInfo: true
    },
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
      'karma-webpack'
    ]
  });
}
