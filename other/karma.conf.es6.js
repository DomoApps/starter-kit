const path = require('path');

// load webpack config here for for webpack preprocessor
const webpackConfig = require('../webpack.config');
delete webpackConfig.devtool;
webpackConfig.cache = true;

let file;

const cdns = Object.values(require('../package.json').cdnDependencies);

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
