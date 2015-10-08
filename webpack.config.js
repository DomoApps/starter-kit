var path = require('path');
var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var ngAnnotatePlugin = require('ng-annotate-webpack-plugin');
var cssnext = require('cssnext');
// var autoprefixer = require('autoprefixer');
// var precss = require('precss');
// var cssnano = require('cssnano');

var config = {
  context: __dirname + '/src',
  // the entry point of your library
  entry: {
    common: './common/index.js',
    desktop: './desktop/index.js',
    mobile: './mobile/index.js',
    switcher: './switcher.js'
  },
  // where 3rd-party modules can reside
  resolve: {
    modulesDirectories: ['node_modules', 'bower_components']
  },

  output: {
    // where to put standalone build file
    path: path.join(__dirname, 'dist'),
    publicPath: '',
    filename: '/[name]/[name].js',
    sourceMapFilename: '[file].map',
    libraryTarget: 'umd'
  },
  externals: [
    {
      'angular': {
        root: 'angular',
        commonjs: 'angular',
        commonjs2: 'angular',
        amd: 'angular'
      }
    },
    {
      'lodash': {
        root: '_',
        commonjs: 'lodash',
        commonjs2: 'lodash',
        amd: 'lodash'
      }
    },
    {
      'jquery': {
        root: '$',
        commonjs: 'jquery',
        commonjs2: 'jquery',
        amd: 'jquery'
      }
    },
    {
      'd3': {
        root: 'd3',
        commonjs: 'd3',
        commonjs2: 'd3',
        amd: 'd3'
      }
    }
  ],

  plugins: [
    new ngAnnotatePlugin({
      add: true,
      remove: true
    }),
    new HtmlWebpackPlugin({
      title: 'Switcher', 
      chunks: ['switcher']
    }),
    new HtmlWebpackPlugin({
      title: 'Lab',
      template: 'lab.html',
      filename: 'lab.html',
      chunks: []
    }),
    new HtmlWebpackPlugin({
      title: 'Desktop', 
      template: 'src/desktop/desktop.html', // Load a custom template
      inject: 'body', // Inject all scripts into the body
      filename: 'desktop/index.html',
      chunks: ['common', 'desktop']
    }),
    new HtmlWebpackPlugin({
      title: 'Mobile', 
      template: 'src/mobile/mobile.html', // Load a custom template
      inject: 'body', // Inject all scripts into the body
      filename: 'mobile/index.html',
      chunks: ['common', 'mobile']
    }),
    new webpack.DefinePlugin({
      ON_DEV: process.env.NODE_ENV === 'development' || !process.env.NODE_ENV,
      ON_TEST: process.env.NODE_ENV === 'test',
      ON_PROD: process.env.NODE_ENV === 'production'
    })
  ],

  module: {
    loaders: [
      {
        test: /\.js$/,
        loader: 'babel?stage=1&optional=runtime&loose=all',
        exclude: /(node_modules|bower_components)/
      },
      {
        test:   /\.css$/,
        loader: 'style!css!cssnext',
        exclude: /(node_modules|bower_components)/
      },
      {
        test: /\.(png|jpeg|gif).*$/,
        loader: 'url'
      },
      {
        test: /\.html$/,
        loader: 'raw'
      },
      {
        test: /\.(woff|ttf|eot|svg).*$/,
        loader: 'file?name=[name].[ext]?[hash]'
      }
    ]
  },

  // postcss: function () {
  //   return [cssnext()];
  // },
  cssnext: {
    browsers: "last 2 versions",
  },

  devtool: 'source-map',

  devServer: {
    contentBase: 'dist/',
    noInfo: false, //  --no-info option
    hot: true,
    inline: true
  }
};

if (process.env.NODE_ENV === 'production') {
  config.plugins.push(new webpack.optimize.UglifyJsPlugin());
}

module.exports = config;
