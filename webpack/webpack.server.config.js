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
  root: path.resolve(__dirname, '..'),
  src: path.resolve(__dirname, '..', 'src'),
  serverEntry: path.resolve(__dirname, '..', 'src', 'server', 'render.js'),
  serverBuild: path.resolve(__dirname, '..', 'build', 'server'),
  node_modules: path.resolve(__dirname, '..', 'node_modules'),
  webpackCache: path.resolve(__dirname, 'serverCache'),
};

const commonConfig = webpackMerge([
  {
    name: 'server',
    target: 'node',
    entry: [
      'babel-polyfill',
      PATHS.serverEntry,
    ],
    externals: nodeExternals({
      whitelist: [
        /\.(eot|woff|woff2|ttf|otf)$/,
        /\.(svg|png|jpg|jpeg|gif|ico|webm)$/,
        /\.(mp4|mp3|ogg|swf|webp)$/,
        /\.(css|scss|sass|less|styl)$/,
        /\.bin|react-universal-component|require-universal-module|webpack-flush-chunks/
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
      extensions: ['.js', '.css'],
    },
    plugins: [
      new webpack.optimize.LimitChunkCountPlugin({
        maxChunks: 1
      }),
    ],
  },
  parts.serverRenderCSS({
    cssModules: true,
  }),
]);

const developmentConfig = webpackMerge([
  {
    devtool: 'eval',
    output: {
      publicPath: '/static/'
    },
    plugins: [
      new webpack.DefinePlugin({
        'process.env': {
          NODE_ENV: JSON.stringify('development')
        }
      })
    ],
  }
]);

const productionConfig = webpackMerge([
  {
    devtool: 'source-map',
    plugins: [
      new CleanWebpackPlugin(
        [ PATHS.serverBuild, PATHS.webpackCache ],
        { root: PATHS.root },
      ),
      new webpack.DefinePlugin({
        'process.env': {
          NODE_ENV: JSON.stringify('production')
        }
      })
    ],
  }
]);


module.exports = ( env ) => {
  if ( env === 'production' ) {
    return webpackMerge( commonConfig, productionConfig );
  }
  return webpackMerge( commonConfig, developmentConfig );
};