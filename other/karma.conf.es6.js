module.exports = config => {
  // load external cdn dependencies
  const cdns = Object.values(require('../package.json').cdnDependencies);
  // add angular mocks
  const externalFiles = [
    ...cdns,
    'https://cdnjs.cloudflare.com/ajax/libs/angular.js/1.5.3/angular-mocks.js',
  ];

  // entry file that bundles all the test files
  const testEntryFile = './other/tests.js';

  const webpackConfig = require('../webpack.config');
  const webpackJsLoader = webpackConfig.module.loaders.filter(loader => {
    return loader.loader === 'babel';
  });

  config.set({
    frameworks: ['mocha', 'chai', 'sinon'],
    files: [
      ...externalFiles,
      testEntryFile
    ],
    preprocessors: {
      [testEntryFile]: ['webpack', 'sourcemap']
    },
    webpack: {
      module: {
        loaders: webpackJsLoader
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
