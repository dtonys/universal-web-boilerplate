/**
 * Webpack setup based on
 *
 * survivejs
 * https://github.com/survivejs-demos/webpack-demo
 *
 * react-universal component
 * https://github.com/faceyspacey/redux-first-router-demo
 *
 */

const path = require('path');
const webpack = require('webpack');
const webpackMerge = require('webpack-merge');
const WriteFilePlugin = require('write-file-webpack-plugin');
// const AutoDllPlugin = require('autodll-webpack4-plugin');
const StatsPlugin = require('stats-webpack-plugin');
const TimeFixPlugin = require('time-fix-plugin');
const parts = require('./webpack.parts');


const PATHS = {
  src: path.resolve(__dirname, '..', 'src'),
  clientEntry: path.resolve(__dirname, '..', 'src', 'client.js'),
  clientBuild: path.resolve(__dirname, '..', 'build', 'client'),
  node_modules: path.resolve(__dirname, '..', 'node_modules'),
};

const commonConfig = webpackMerge([
  {
    // 'client' name required by webpack-hot-server-middleware, see
    // https://github.com/60frames/webpack-hot-server-middleware#usage
    mode: 'none',
    name: 'client',
    target: 'web',
    bail: true,
    output: {
      path: PATHS.clientBuild,
      publicPath: '/static/',
    },
    resolve: {
      modules: [
        PATHS.node_modules,
        PATHS.src,
      ],
    },
  },
  // parts.extractSCSS({
  //   cssModules: true,
  // }),
  parts.loadFonts({
    options: {
      name: '[name].[hash:8].[ext]',
    },
  }),
]);

const developmentConfig = webpackMerge([
  {
    devtool: 'eval',
    entry: [
      'babel-polyfill',
      'fetch-everywhere',
      'webpack-hot-middleware/client?path=/__webpack_hmr&timeout=20000&reload=false&quiet=false&noInfo=false',
      'react-hot-loader/patch',
      PATHS.clientEntry,
    ],
    output: {
      filename: '[name].js',
      chunkFilename: '[name].js',
    },
    module: {
      rules: [
        // scss, for loading and processing local scope css,
        {
          test: /\.scss/,
          use: [
            { loader: 'style-loader' },
            {
              loader: 'css-loader',
              options: {
                modules: true,
                localIdentName: '[name]__[local]--[hash:base64:5]',
              },
            },
            { loader: 'fast-sass-loader' },
          ],
        },
      ],
    },
    plugins: [
      new WriteFilePlugin(),
      new TimeFixPlugin(),
      new webpack.HotModuleReplacementPlugin(),
      new webpack.NoEmitOnErrorsPlugin(),
      new webpack.DefinePlugin({
        'process.env': {
          NODE_ENV: JSON.stringify('development'),
        },
        __SERVER__: 'false',
        __CLIENT__: 'true',
        __TEST__: 'false',
      }),
      new webpack.NamedModulesPlugin(),
      // new AutoDllPlugin({
      //   context: path.join(__dirname, '..'),
      //   filename: '[name].js',
      //   entry: {
      //     vendor: [
      //       'react',
      //       'react-dom',
      //       'react-redux',
      //       'redux',
      //       'history/createBrowserHistory',
      //       'redux-first-router',
      //       'redux-first-router-link',
      //       'fetch-everywhere',
      //       'babel-polyfill',
      //     ],
      //   },
      // }),
    ],
  },
  parts.loadJavascript({
    include: PATHS.src,
    cacheDirectory: false,
  }),
  parts.loadImages(),
]);

const productionConfig = webpackMerge([
  {
    devtool: 'source-map',
    entry: [
      'babel-polyfill',
      'fetch-everywhere',
      PATHS.clientEntry,
    ],
    output: {
      filename: '[name].[chunkhash].js',
      chunkFilename: '[name].[chunkhash].js',
    },
    plugins: [
      new StatsPlugin('stats.json'),
      new webpack.DefinePlugin({
        'process.env': {
          NODE_ENV: JSON.stringify('production'),
        },
        __SERVER__: 'false',
        __CLIENT__: 'true',
        __TEST__: 'false',
      }),
      new webpack.HashedModuleIdsPlugin(),
    ],
    recordsPath: path.join(__dirname, 'records.json' ),
  },
  parts.loadJavascript({
    include: PATHS.src,
    cacheDirectory: false,
  }),
  parts.minifyJavaScript(),
  parts.minifyCSS({
    options: {
      discardComments: {
        removeAll: true,
        // Run cssnano in safe mode to avoid
        // potentially unsafe transformations.
        safe: true,
      },
    },
  }),
  parts.loadImages({
    options: {
      limit: 15000,
      name: '[name].[hash:8].[ext]',
    },
  }),
]);

module.exports = ( env ) => {
  if ( env === 'production' ) {
    return webpackMerge( commonConfig, productionConfig );
  }
  return webpackMerge( commonConfig, developmentConfig );
};
