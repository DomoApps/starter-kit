'use strict';

module.exports = config => {
  const pkg = require('./package.json');
  const cdns = Object.values(pkg.cdnDependencies);

  const webpackConfig = require('./webpack.config')();

  config.set({
    frameworks: ['mocha', 'chai'],
    files: [
      ...cdns,
      'src/**/*.spec.ts',
      'src/**/*.spec.tsx'
    ],
    preprocessors: {
      'src/**/*.spec.ts': ['webpack', 'sourcemap'],
      'src/**/*.spec.tsx': ['webpack', 'sourcemap']
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
