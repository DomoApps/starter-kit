const path = require('path');

// load webpack config here for for webpack preprocessor
const webpackConfig = require('../webpack.config');
delete webpackConfig.devtool;
webpackConfig.cache = true;

let file;
// Add new cdns resouces here.
const cdns = [
  'https://cdnjs.cloudflare.com/ajax/libs/d3/3.5.10/d3.min.js',
  'https://cdnjs.cloudflare.com/ajax/libs/jquery/3.0.0-alpha1/jquery.min.js',
  'https://cdnjs.cloudflare.com/ajax/libs/lodash.js/3.10.1/lodash.min.js',
  'https://cdnjs.cloudflare.com/ajax/libs/angular.js/1.5.3/angular.min.js',
  'https://cdnjs.cloudflare.com/ajax/libs/angular.js/1.5.3/angular-animate.min.js',
  'https://cdnjs.cloudflare.com/ajax/libs/angular-ui-router/0.2.15/angular-ui-router.min.js',
];

const entry = [
  ...cdns,
  'https://cdnjs.cloudflare.com/ajax/libs/angular.js/1.5.3/angular-mocks.js',
];
const preprocessors = {};
for (const chunk in webpackConfig.entry) {
  if ({}.hasOwnProperty.call(webpackConfig.entry, chunk)) {
    file = path.resolve(webpackConfig.context, webpackConfig.entry[chunk]);
    entry.push(file);
    preprocessors[file] = ['webpack'];
  }
}

module.exports = (config) => {
  config.set({
    basePath: './',
    frameworks: ['mocha', 'chai', 'sinon'],
    files: entry,
    webpack: webpackConfig,

    webpackMiddleware: {
      noInfo: true
    },

    // list of files to exclude
    exclude: [
      'src/switcher.js'
    ],

    // preprocess matching files before serving them to the browser
    // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
    preprocessors: preprocessors,

    reporters: ['dots'],
    port: 9876,
    colors: true,
    autoWatch: true,
    browsers: ['PhantomJS', 'Chrome', 'Firefox', 'Safari'],
    plugins: [
      require('karma-webpack'),
      'karma-coverage',
      'karma-phantomjs-launcher',
      'karma-chrome-launcher',
      'karma-firefox-launcher',
      'karma-safari-launcher',
      'karma-mocha',
      'karma-chai',
      'karma-sinon',
    ],
    logLevel: config.LOG_ERROR
  });
};
