/**
 * BUILD CONFIGS -  SET THESE BASED ON VIEWS YOU PLAN TO USE.
 * These configs can be changed at anytime.
 */
var INCLUDE_DESKTOP_VIEW = true;
var INCLUDE_MOBILE_VIEW = true;

/**************************************************************
 * WARNING: DO NOT EDIT FILE BELOW THIS POINT!
 *************************************************************/
// dependencies
var path = require('path');
var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var ngAnnotatePlugin = require('ng-annotate-webpack-plugin');

// postcss plugins
var precss = require('precss');
var postcssImport = require('postcss-import');
var postcssImport = require('postcss-import');
var reporter = require('postcss-reporter');
var cssnano = require('cssnano');
var messages = require('postcss-browser-reporter');

// for the commonChunksPlugin, items get added to this array based on conigs
var commonChunks = ['common'];
var ON_TEST = process.env.NODE_ENV === 'test';

var config = {
  cache: false,
  context: __dirname + '/src',

  // the entry point of your library
  entry: {
    common: './common/index.js'
    // more things get added here based on configs at top of file.
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

  // dependencies listed here will NOT be bunlded into the app, even if you `require` them.
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
        amd: 'jQuery'
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

  // optimization plugins
  // we add more items to this array based on configs set at top of file.
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
      chunks: commonChunks,
    }),
    new ngAnnotatePlugin({
      add: true,
      remove: false
    }),
    new webpack.DefinePlugin({
      ON_DEV: process.env.NODE_ENV === 'development' || !process.env.NODE_ENV,
      ON_TEST: ON_TEST,
      ON_PROD: process.env.NODE_ENV === 'production'
    })
  ],

  // what loaders to use based on file type.
  module: {
    preLoaders: [
      {
        test: /\.js$/,
        loader: 'eslint-loader', 
        exclude: /(node_modules|bower_components)/,
      }
    ],
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

  // postcss plugins settings
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
    // only minify when on production
    if (process.env.NODE_ENV === 'production') {
      postcssPlugins.push(cssnano({
        mergeRules: false,
        zindex: false,
        reduceIdents: false,
        mergeIdents: false
      }));
    } else {
      // use the message reported when on development
      postcssPlugins.push(messages());
    }

    return postcssPlugins;
  },

  eslint: {
    formatter: require('eslint-friendly-formatter'),
  },

  devtool: 'source-map',

  devServer: {
    contentBase: 'dist/',
    noInfo: false,
    hot: false,
    inline: false
  }
};

/**
 * If on production then minify code else (on dev) and turn on hot module replacement.
 */
if (process.env.NODE_ENV === 'production') {
  config.plugins.push(new webpack.optimize.UglifyJsPlugin({compress: {warnings: false}}));
} else {
  config.plugins.push(new webpack.HotModuleReplacementPlugin());
}


/**
 * Logic to change build based on configs at top of file.
 */
var INCLUDE_MULTIPLE_VIEWS = INCLUDE_DESKTOP_VIEW && INCLUDE_MOBILE_VIEW;
if (!INCLUDE_DESKTOP_VIEW && !INCLUDE_MOBILE_VIEW) {
  throw new Error('You must include at least one view!');
}
/**
 * Setup the mobile view if INCLUDE_MOBILE_VIEW is set to true
 */
if (INCLUDE_DESKTOP_VIEW) {
  config.entry.desktop = './desktop/index.js';
  commonChunks.push('desktop');
  if (!ON_TEST) {
    config.plugins.push(
      new HtmlWebpackPlugin({
        title: 'Desktop',
        dev: process.env.NODE_ENV === 'development' || !process.env.NODE_ENV,
        pkg: require('./package.json'),
        template: 'src/desktop/desktop.html', // Load a custom template
        inject: 'body', // Inject all scripts into the body
        filename: INCLUDE_MULTIPLE_VIEWS ? 'desktop/index.html' : 'index.html',
        chunks: ['commons', 'common', 'desktop']
      })
    );
  }
}
/**
 * Setup the mobile view if INCLUDE_MOBILE_VIEW is set to true
 */
if (INCLUDE_MOBILE_VIEW) {
  commonChunks.push('mobile');
  config.entry.mobile = './mobile/index.js';
  if (!ON_TEST) {
    config.plugins.push(
      new HtmlWebpackPlugin({
        title: 'Mobile',
        dev: process.env.NODE_ENV === 'development' || !process.env.NODE_ENV,
        pkg: require('./package.json'),
        template: 'src/mobile/mobile.html', // Load a custom template
        inject: 'body', // Inject all scripts into the body
        filename: INCLUDE_MULTIPLE_VIEWS ? 'mobile/index.html' : 'index.html',
        chunks: ['commons', 'common', 'mobile']
      })
    );
  }
}
/**
 * add swither and lab view when app has multiple views.
 * INCLUDE_MULTIPLE_VIEWS is true when INCLUDE_DESKTOP_VIEW and INCLUDE_MOBILE_VIEW views are both true
 */
if (INCLUDE_MULTIPLE_VIEWS) {
  config.entry.switcher = './switcher.js';
  if (!ON_TEST) {
    config.plugins.push(
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
      })
    );
  }
}

module.exports = config;
