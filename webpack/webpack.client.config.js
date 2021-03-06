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
const cssnano = require('cssnano');
const WriteFilePlugin = require('write-file-webpack-plugin');
// const AutoDllPlugin = require('autodll-webpack4-plugin');
const StatsPlugin = require('stats-webpack-plugin');
const TimeFixPlugin = require('time-fix-plugin');
const UglifyWebpackPlugin = require('uglifyjs-webpack-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const parts = require('./webpack.parts');


const PATHS = {
  src: path.resolve(__dirname, '..', 'src'),
  clientEntry: path.resolve(__dirname, '..', 'src', 'client.js'),
  clientBuild: path.resolve(__dirname, '..', 'build', 'client'),
  node_modules: path.resolve(__dirname, '..', 'node_modules'),
};

const commonConfig = webpackMerge([
  {
    // Avoid `mode` option, let's explicitly opt in to all of webpack's settings
    // using the defaults that `mode` would set for development and production.
    mode: 'none',
    // 'client' name required by webpack-hot-server-middleware, see
    // https://github.com/60frames/webpack-hot-server-middleware#usage
    name: 'client',
    target: 'web',
    bail: true,
    output: {
      path: PATHS.clientBuild,
      publicPath: '/static/',
    },
    optimization: {
      removeAvailableModules: true,
      removeEmptyChunks: true,
      mergeDuplicateChunks: true,
      providedExports: true,
      // This config mimics the behavior of webpack 3 w/universal
      splitChunks: {
        chunks: 'initial',
        cacheGroups: {
          default: false,
          vendors: {
            test: /[\\/]node_modules[\\/]/,
            name: 'vendor',
          },
        },
      },
      // This config mimics the behavior of webpack 3 w/universal
      runtimeChunk: {
        name: 'bootstrap',
      },
    },
    resolve: {
      modules: [
        PATHS.node_modules,
        PATHS.src,
      ],
    },
  },
  parts.loadFonts({
    options: {
      name: '[name].[hash:8].[ext]',
    },
  }),
]);

const developmentConfig = webpackMerge([
  {
    cache: true,
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
      pathinfo: true,
    },
    optimization: {
      namedModules: true,
      namedChunks: true,
    },
    plugins: [
      new WriteFilePlugin(),
      new TimeFixPlugin(),
      new webpack.HotModuleReplacementPlugin(),
      new webpack.DefinePlugin({
        'process.env': {
          NODE_ENV: JSON.stringify('development'),
        },
        __SERVER__: 'false',
        __CLIENT__: 'true',
        __TEST__: 'false',
      }),
    ],
  },
  parts.loadStyles(),
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
    optimization: {
      flagIncludedChunks: true,
      occurrenceOrder: true,
      usedExports: true,
      sideEffects: true,
      concatenateModules: true,
      noEmitOnErrors: true,
      minimizer: [
        new UglifyWebpackPlugin({
          sourceMap: true,
        }),
      ],
    },
    performance: {
      hints: 'warning',
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
      new OptimizeCSSAssetsPlugin({
        cssProcessor: cssnano,
        cssProcessorOptions: {
          discardComments: {
            removeAll: true,
            // Run cssnano in safe mode to avoid potentially unsafe transformations.
            safe: true,
          },
        },
        canPrint: false,
      }),
    ],
    recordsPath: path.join(__dirname, 'records.json' ),
  },
  parts.extractCSS({
    cssModules: true,
  }),
  parts.loadJavascript({
    include: PATHS.src,
    cacheDirectory: false,
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
