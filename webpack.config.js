var path = require('path');
var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var ngAnnotatePlugin = require('ng-annotate-webpack-plugin');

// postcss plugins
// var cssnext = require('postcss-cssnext');
// var nesting = require('postcss-nesting');
var precss = require('precss');
var postcssImport = require('postcss-import');
var postcssImport = require('postcss-import');
var reporter = require('postcss-reporter');
var cssnano = require('cssnano');
var messages = require('postcss-browser-reporter');

var config = {
  cache: false,
  context: __dirname + '/src',
  // the entry point of your library
  entry: {
    switcher: './switcher.js',
    desktop: './desktop/index.js',
    mobile: './mobile/index.js',
    common: './common/index.js'
  },
  // where 3rd-party modules can reside
  resolve: {
    modulesDirectories: ['node_modules', 'bower_components']
  },

  output: {
    // where to put standalone build file
    path: path.join(__dirname, '/dist'),
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
    new webpack.optimize.OccurenceOrderPlugin(),
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
    new HtmlWebpackPlugin({
      title: 'Switcher',
      dev: process.env.NODE_ENV === 'development' || !process.env.NODE_ENV, 
      pkg: require('./package.json'),
      chunks: ['commons', 'switcher']
    }),
    new HtmlWebpackPlugin({
      title: 'Lab',
      dev: process.env.NODE_ENV === 'development' || !process.env.NODE_ENV,
      pkg: require('./package.json'),
      template: 'lab.html',
      filename: 'lab.html',
      chunks: []
    }),
    new HtmlWebpackPlugin({
      title: 'Desktop',
      dev: process.env.NODE_ENV === 'development' || !process.env.NODE_ENV,
      pkg: require('./package.json'),
      template: 'src/desktop/desktop.html', // Load a custom template
      inject: 'body', // Inject all scripts into the body
      filename: 'desktop/index.html',
      chunks: ['commons', 'common', 'desktop']
    }),
    new HtmlWebpackPlugin({
      title: 'Mobile',
      dev: process.env.NODE_ENV === 'development' || !process.env.NODE_ENV,
      pkg: require('./package.json'),
      template: 'src/mobile/mobile.html', // Load a custom template
      inject: 'body', // Inject all scripts into the body
      filename: 'mobile/index.html',
      chunks: ['commons', 'common', 'mobile']
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
        exclude: /(node_modules|bower_components)/,
        loader: 'babel',
        query: {
          cacheDirectory: true,
          presets: ['es2015-loose', 'stage-1'],
          plugins: ['transform-runtime']
        }
      },
      {
        test:   /\.css$/,
        loader: 'style!css!postcss',
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

  postcss: function (_webpack) {
    var postcssPlugins = [
      postcssImport({
        addDependencyTo: _webpack,
        onImport: function (files) {
          files.forEach(this.addDependency);
        }.bind(this)
      }),
      precss({browsers: 'last 2 versions'}),
      reporter()
    ];

    if (process.env.NODE_ENV === 'production') {
      postcssPlugins.push(cssnano({
        mergeRules: false,
        zindex: false,
        reduceIdents: false,
        mergeIdents: false
      }));
    } else {
      postcssPlugins.push(messages());
    }

    return postcssPlugins;
  },

  devtool: 'source-map',

  devServer: {
    contentBase: 'dist/',
    noInfo: false,
    hot: false,
    inline: false
  }
};

if (process.env.NODE_ENV === 'production') {
  config.plugins.push(new webpack.optimize.UglifyJsPlugin({compress: {warnings: false}}));
} else {
  config.plugins.push(new webpack.HotModuleReplacementPlugin());
}

module.exports = config;
