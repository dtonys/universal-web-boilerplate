/**
 * Webpack parts based on survivejs book and demo repo
 *
 * survivejs
 * https://github.com/survivejs-demos/webpack-demo
 *
 */

const webpack = require('webpack');
const ExtractCssChunks = require('extract-css-chunks-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');


exports.loadJavascript = ({ include, exclude, cacheDirectory } = {}) => ({
  module: {
    rules: [
      {
        test: /\.js$/,
        include,
        exclude,

        use: {
          loader: 'babel-loader',
          options: {
            babelrc: true,
            // Enable caching for improved performance during
            // development.
            // It uses default OS directory by default. If you need
            // something more custom, pass a path to it.
            // I.e., { cacheDirectory: '<path>' }
            cacheDirectory,
          },
        },
      },
    ],
  },
});

exports.serverRenderSCSS = ({ include, exclude, cssModules } = {}) => ({
  module: {
    rules: [
      {
        test: /\.scss$/,
        include,
        exclude,
        use: [
          {
            loader: 'css-loader/locals',
            options: {
              modules: cssModules,
              localIdentName: '[name]__[local]--[hash:base64:5]',
            },
          },
          {
            loader: 'postcss-loader',
            options: {
              plugins: () => ([
                require('autoprefixer')({
                  browsers: [
                    '>1%',
                    'last 4 versions',
                    'Firefox ESR',
                    'not ie < 9', // React doesn't support IE8 anyway
                  ],
                  flexbox: 'no-2009',
                }),
              ]),
            },
          },
          {
            loader: 'fast-sass-loader',
          },
        ],
      },
    ],
  },
});

exports.extractSCSS = ({ include, exclude, cssModules } = {}) => ({
  module: {
    rules: [
      {
        test: /\.scss$/,
        include,
        exclude,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
          },
          {
            loader: 'css-loader',
            options: {
              modules: cssModules,
              localIdentName: '[name]__[local]--[hash:base64:5]',
            },
          },
          {
            loader: 'postcss-loader',
            options: {
              plugins: () => ([
                require('autoprefixer')({
                  browsers: [
                    '>1%',
                    'last 4 versions',
                    'Firefox ESR',
                    'not ie < 9', // React doesn't support IE8 anyway
                  ],
                  flexbox: 'no-2009',
                }),
              ]),
            },
          },
          {
            loader: 'fast-sass-loader',
          },
        ],
      },
    ],
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: '[name].[chunkhash].css',
      chunkFilename: '[name].[chunkhash].css',
    }),
  ],
});

exports.loadFonts = ({ include, exclude, options } = {}) => ({
  module: {
    rules: [
      {
        // Capture eot, ttf, woff, and woff2
        test: /\.(eot|ttf|woff|woff2)(\?v=\d+\.\d+\.\d+)?$/,
        include,
        exclude,

        use: {
          loader: 'file-loader',
          options,
        },
      },
    ],
  },
});

exports.loadImages = ({ include, exclude, options } = {}) => ({
  module: {
    rules: [
      {
        test: /\.(png|jpg|svg)$/,
        include,
        exclude,

        use: {
          loader: 'url-loader',
          options,
        },
      },
    ],
  },
});

