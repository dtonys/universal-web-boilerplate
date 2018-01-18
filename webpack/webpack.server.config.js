/**
 * Webpack setup based on
 *
 * survivejs
 * https://github.com/survivejs-demos/webpack-demo
 *
 * react-universal-component
 * https://github.com/faceyspacey/redux-first-router-demo
 *
 * backpack
 * https://github.com/jaredpalmer/backpack
 *
 */

const path = require('path');
const webpack = require('webpack');
const webpackMerge = require('webpack-merge');
const nodeExternals = require('webpack-node-externals');
const parts = require('./webpack.parts');


const PATHS = {
  src: path.resolve(__dirname, '..', 'src'),
  serverEntry: path.resolve(__dirname, '..', 'src', 'server', 'render.js'),
  serverBuild: path.resolve(__dirname, '..', 'build', 'server'),
  node_modules: path.resolve(__dirname, '..', 'node_modules'),
  webpackCache: path.resolve(__dirname, 'serverCache'),
};

const commonConfig = webpackMerge([
  {
    // 'server' name required by webpack-hot-server-middleware, see
    // https://github.com/60frames/webpack-hot-server-middleware#usage
    name: 'server',
    target: 'node',
    entry: [
      'babel-polyfill',
      'fetch-everywhere',
      PATHS.serverEntry,
    ],
    externals: nodeExternals({
      whitelist: [
        /\.(eot|woff|woff2|ttf|otf)$/,
        /\.(svg|png|jpg|jpeg|gif|ico|webm)$/,
        /\.(mp4|mp3|ogg|swf|webp)$/,
        /\.(css|scss|sass|less|styl)$/,
        /\.bin|react-universal-component|require-universal-module|webpack-flush-chunks/,
      ],
    }),
    output: {
      path: PATHS.serverBuild,
      filename: '[name].js',
      libraryTarget: 'commonjs2',
    },
    resolve: {
      modules: [
        PATHS.node_modules,
        PATHS.src,
      ],
    },
    plugins: [
      new webpack.optimize.LimitChunkCountPlugin({
        maxChunks: 1,
      }),
    ],
  },
  parts.loadJavascript({
    include: PATHS.src,
    cacheDirectory: PATHS.webpackCache,
  }),
  parts.serverRenderCSS({
    cssModules: true,
    exclude: /node_modules/,
  }),
]);

const developmentConfig = webpackMerge([
  {
    devtool: 'eval',
    output: {
      publicPath: '/static/',
    },
    plugins: [
      new webpack.DefinePlugin({
        'process.env': {
          NODE_ENV: JSON.stringify('development'),
        },
        __SERVER__: 'true',
        __CLIENT__: 'false',
      }),
    ],
  },
]);

const productionConfig = webpackMerge([
  {
    devtool: 'source-map',
    plugins: [
      new webpack.DefinePlugin({
        'process.env': {
          NODE_ENV: JSON.stringify('production'),
        },
        __SERVER__: 'true',
        __CLIENT__: 'false',
      }),
    ],
  },
]);


module.exports = ( env ) => {
  if ( env === 'production' ) {
    return webpackMerge( commonConfig, productionConfig );
  }
  return webpackMerge( commonConfig, developmentConfig );
};
