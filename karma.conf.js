'use strict';
var path = require('path');
var webpack = require('webpack');
var ngAnnotatePlugin = require('ng-annotate-webpack-plugin');

// load webpack config here for for webpack preprocessor
var webpackConfig = require('./webpack.config');
delete webpackConfig.devtool;
webpackConfig.cache = true;

var file;
var entry = [
  'https://cdnjs.cloudflare.com/ajax/libs/d3/3.5.10/d3.min.js',
  'https://cdnjs.cloudflare.com/ajax/libs/jquery/3.0.0-alpha1/jquery.js',
  'https://cdnjs.cloudflare.com/ajax/libs/lodash.js/3.10.1/lodash.js',
  'https://cdnjs.cloudflare.com/ajax/libs/angular.js/1.4.8/angular.js',
  'https://cdnjs.cloudflare.com/ajax/libs/angular.js/1.4.8/angular-animate.js',
  'https://cdnjs.cloudflare.com/ajax/libs/angular-ui-router/0.2.15/angular-ui-router.js',
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
