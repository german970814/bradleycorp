const path = require('path')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const ExtractTextPlugin = require("extract-text-webpack-plugin")

const srcDir = path.join(__dirname, 'src')

const config = {
  context: srcDir,

  entry: {
    main: ["babel-polyfill", "./index.js"],
    vendor: [
      'react',
      'react-router-dom',
      'axios',
      'prop-types'
    ]
  },

  output: {
    path: path.join(__dirname, 'build'),
    publicPath: '/',
    filename: '[name].[chunkhash].js'
  },

  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader'
        }
      }, {
        test: /\.css$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader?sourceMap',
          use: [
            'css-loader?modules&importLoaders=1&localIdentName="[local]__[hash:base64:5]"',
            'postcss-loader'
          ],
        }),
      },
      {
        test: /\.scss$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader?sourceMap',
          //resolve-url-loader may be chained before sass-loader if necessary
          use: [
            'css-loader?modules&importLoaders=1&localIdentName="[local]__[hash:base64:5]"',
            'sass-loader?sourceMap',
            'postcss-loader'
          ],
        })
      },
      {
        test: /\.(png|jpg|gif)$/,
        use: {
          loader: 'url-loader',
          options: {
            limit: 8192
          }
        }
      }
    ]
  },

  plugins: [
    new HtmlWebpackPlugin({
      title: 'Bradley React App',
      template: path.join(srcDir, 'index.html'),
    }),
    new ExtractTextPlugin({
      filename: 'main.css',
      publicPath: '/',
      allChunks: true,
      ignoreOrder: true,
    }),
    new webpack.HashedModuleIdsPlugin(), // ensures vendor bundle hash only changes when it needs to
    new webpack.optimize.CommonsChunkPlugin({ // vendor must be included before manifest
      name: 'vendor'
    }),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'manifest'
    })
  ],

  devtool: 'source-map',

  devServer: {
    historyApiFallback: {
      rewrites: [
        { from: /!(css|js|map|png|ico|jpg|woff|woff2|ttf)$/, to: '/index.html' },
      ]
    },
  }
}

module.exports = config
