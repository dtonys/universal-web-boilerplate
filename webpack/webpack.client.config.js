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
const AutoDllPlugin = require('autodll-webpack-plugin');
const StatsPlugin = require('stats-webpack-plugin');
const parts = require('./webpack.parts');


const PATHS = {
  src: path.resolve(__dirname, '..', 'src'),
  clientEntry: path.resolve(__dirname, '..', 'src', 'client.js'),
  clientBuild: path.resolve(__dirname, '..', 'build', 'client'),
  node_modules: path.resolve(__dirname, '..', 'node_modules'),
  webpackCache: path.resolve(__dirname, 'clientCache'),
};

const commonConfig = webpackMerge([
  {
    // 'client' name required by webpack-hot-server-middleware, see
    // https://github.com/60frames/webpack-hot-server-middleware#usage
    name: 'client',
    target: 'web',
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
  parts.extractSCSS({
    cssModules: true,
  }),
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
    plugins: [
      new WriteFilePlugin(),
      new webpack.HotModuleReplacementPlugin(),
      new webpack.NoEmitOnErrorsPlugin(),
      new webpack.DefinePlugin({
        'process.env': {
          NODE_ENV: JSON.stringify('development'),
        },
      }),
      new webpack.NamedModulesPlugin(),
      new AutoDllPlugin({
        context: path.join(__dirname, '..'),
        filename: '[name].js',
        entry: {
          vendorDll: [
            'react',
            'react-dom',
            // 'react-redux',
            // 'redux',
            // 'history/createBrowserHistory',
            // 'babel-polyfill',
          ],
        },
      }),
    ],
  },
  parts.loadJavascript({
    include: PATHS.src,
    cacheDirectory: PATHS.webpackCache,
  }),
  parts.extractBundles([
    {
      names: [ 'bootstrap' ], // needed to put webpack bootstrap code before chunks
      filename: '[name].js',
      minChunks: Infinity,
    },
  ]),
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
  parts.extractBundles([
    {
      name: 'vendor',
      minChunks: ({ resource }) => (
        resource &&
        resource.indexOf('node_modules') >= 0 &&
        resource.match(/\.js$/)
      ),
    },
    {
      names: [ 'bootstrap' ], // needed to put webpack bootstrap code before chunks
      filename: '[name].js',
      minChunks: Infinity,
    },
  ]),
  parts.attachRevision(),
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
