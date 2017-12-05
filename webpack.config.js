const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const ExtractTextPlugin = require("extract-text-webpack-plugin")

const srcDir = path.join(__dirname, 'src')

const config = {
  context: srcDir,

  entry: {
    index: './index.js'
  },

  output: {
    path: path.join(__dirname, 'build'),
    filename: 'bundle.js'
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
      allChunks: true,
      ignoreOrder: true,
    }),
  ],

  devtool: 'source-map',

  devServer: {
    historyApiFallback: true,
  }
}

module.exports = config
