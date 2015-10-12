'use strict';
var path = require('path');
var webpack = require('webpack');
var ngAnnotatePlugin = require('ng-annotate-webpack-plugin');

// laod webpack config here for for webpack preprocessor
var webpackConfig = require('./webpack.config');
webpackConfig.cache = true;
webpackConfig.externals = [{angular: 'angular'}];
webpackConfig.plugins = [
  new webpack.ResolverPlugin(
    new webpack.ResolverPlugin.DirectoryDescriptionFilePlugin('bower.json', ['main'])
  ),
  new webpack.optimize.DedupePlugin(),
  new webpack.optimize.CommonsChunkPlugin({
    name: 'commons',
    filename: '/commons.js',
    minChunks: 3,
    chunks: ['common', 'desktop', 'mobile'],
  }),
  new ngAnnotatePlugin({
    add: true,
    remove: true
  }),
  new webpack.DefinePlugin({
    ON_TEST: true
  })
];

var file;
var entry = [
  'node_modules/polyfill-function-prototype-bind/bind.js',
  'node_modules/angular/angular.js'
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
    frameworks: ['mocha', 'chai'],
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
    browsers: ['PhantomJS', 'Chrome', 'Firefox'], // Safari has a bug
    plugins: [
      require('karma-webpack'),
      'karma-coverage',
      'karma-phantomjs-launcher',
      'karma-chrome-launcher',
      'karma-firefox-launcher',
      // 'karma-safari-launcher',
      'karma-mocha',
      'karma-chai',
    ]
  });
};
