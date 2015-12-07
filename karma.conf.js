var path = require('path');
var url =  require('url');
var webpack = require('webpack');
var ngAnnotatePlugin = require('ng-annotate-webpack-plugin');

// load webpack config here for for webpack preprocessor
var webpackConfig = require('./webpack.config');
delete webpackConfig.devtool;
webpackConfig.cache = true;

var file;
var cdns = getCDNDeps();
var entry = [
  ...cdns,
  'https://cdnjs.cloudflare.com/ajax/libs/angular.js/1.4.8/angular-mocks.js',
];
var preprocessors = {};
for (var chunk in webpackConfig.entry) {
  file = path.resolve(webpackConfig.context, webpackConfig.entry[chunk]);
  entry.push(file);
  preprocessors[file] = ['webpack'];
}

module.exports = function (config) {
  config.set({
    basePath: './',
    frameworks: ['mocha', 'chai', 'sinon'],
    files: entry,
    webpack: webpackConfig,

    // list of files to exclude
    exclude: [
      'src/switcher.js'
    ],

    // preprocess matching files before serving them to the browser
    // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
    preprocessors: preprocessors,

    reporters: ['progress'],
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
    ]
  });
};


function getCDNDeps() {
  var uri;
  var list = new Set();
  var pkg = require('./package.json');
  for (var platform in pkg.cdnjs) {
    for (var dep in pkg.cdnjs[platform]) {
      uri = url.parse(pkg.cdnjs[platform][dep]);
      if (!uri.protocol) {
        uri.protocol = 'https';
      }
      list.add(url.format(uri));
    }
  }
  return list.values();
}
