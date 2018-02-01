const path = require('path')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const ExtractTextPlugin = require("extract-text-webpack-plugin")
// allow us to visualise our bundles and optimise
const Visualizer = require('webpack-visualizer-plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin

const srcDir = path.join(__dirname, 'src/apps/Bradley')

const config = {
  context: srcDir,

  entry: {
    main: ["babel-polyfill", "./index.js"],
    vendor: [
      // vendors added here will be included in vendor chunk
      // so they only get requested once and can easily be cached
      'react',
      'react-dom',
      'react-router-dom',
      'react-loadable',
      'axios',
      'prop-types',
      'lodash'
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
        test: /\.(png|jpg|gif|svg)$/,
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
    })/*,
    new Visualizer()
    */
    /*
      turn on to create a visualisation of module sizings with each build
      will be output as stats.html
    */
    /*,
    new BundleAnalyzerPlugin()
    */
     /*
       turn on to create an interactive treemap visualization of the contents of all our bundles

       these plugins are going to really help us as the app grows
       and we split it into multiple chunks
       to make sure common components and vendor packages
       aren't being requested multiple times without need
      */
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
