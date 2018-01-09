/**
 * Webpack setup based on survivejs book and demo repo
 * https://github.com/survivejs-demos/webpack-demo
 * https://survivejs.com/webpack/foreword/
 */

const webpack = require('webpack');
const cssnano = require('cssnano');

const ExtractTextPlugin = require('extract-text-webpack-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const GitRevisionPlugin = require('git-revision-webpack-plugin');
const ExtractCssChunks = require('extract-css-chunks-webpack-plugin');


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

exports.minifyJavaScript = () => ({
  plugins: [
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false,
        // Disabled because of an issue with Uglify breaking seemingly valid code:
        // https://github.com/facebookincubator/create-react-app/issues/2376
        // Pending further investigation:
        // https://github.com/mishoo/UglifyJS2/issues/2011
        comparisons: false,
      },
      output: {
        comments: false,
      },
      sourceMap: true,
    }),
  ],
});

exports.minifyCSS = ({ options } = {}) => ({
  plugins: [
    new OptimizeCSSAssetsPlugin({
      cssProcessor: cssnano,
      cssProcessorOptions: options,
      canPrint: false,
    }),
  ],
});

exports.loadSCSS = ({ include, exclude, cssModules } = {}) => ({
  module: {
    rules: [
      {
        test: /\.scss$/,
        include,
        exclude,
        use: [
          {
            loader: 'style-loader',
          },
          {
            loader: 'css-loader',
            options: {
              modules: cssModules,
              localIdentName: '[name]__[local]',
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

exports.serverRenderCSS = ({ include, exclude, cssModules } = {}) => ({
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
        use: ExtractCssChunks.extract({
          use: [
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
        }),
      },
    ],
  },
  plugins: [
    new ExtractCssChunks(),
  ],
});

exports.extractBundles = (bundles) => ({
  plugins: bundles.map((bundle) => (
    new webpack.optimize.CommonsChunkPlugin(bundle)
  )),
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

exports.attachRevision = () => ({
  plugins: [
    new webpack.BannerPlugin({
      banner: new GitRevisionPlugin().version(),
    }),
  ],
});

exports.generateSourceMaps = ({ type }) => ({
  devtool: type,
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

