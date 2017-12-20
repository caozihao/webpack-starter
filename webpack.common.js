const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const srcPath = path.resolve(__dirname, 'src');
const dir = {
  js: `${srcPath}/scripts`,
  style: `${srcPath}/styles`,
  imgs: `${srcPath}/images`,
};

const htmlCommonChunks = ['vendor', 'runtime'];
const htmlMinifyOptions = {
  collapseWhitespace: true,
  removeComments: true,
};

module.exports = {
  entry: {
    register: [
      `${dir.js}/register.js`,
    ],
    download: [
      `${dir.js}/download.js`,
    ],
    vendor: ['jquery'],
  },
  module: {
    rules: [
      {
        test: /\.scss$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: ['css-loader', 'sass-loader'],
        }),
      },
      {
        test: /\.js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader',
        }
      },
      {
        test: /\.(png|jpg|svg|gif)$/,
        use: {
          loader: 'url-loader',
          options: {
            limit: 8192,
          },
        },
      },
      {
        test: /\.html$/,
        use: {
          loader: 'html-loader',
        },
      },
    ]
  },
  plugins: [
    new CleanWebpackPlugin(['./dist']),
    // 提取公共模块
    new webpack.optimize.CommonsChunkPlugin({
      names: ['vendor', 'runtime'],
    }),
    new HtmlWebpackPlugin({
      filename: 'register.html',
      template: `${srcPath}/register.html`,
      chunks: ['register', ...htmlCommonChunks],
      minify: htmlMinifyOptions,
    }),
    new HtmlWebpackPlugin({
      filename: 'download.html',
      template: `${srcPath}/download.html`,
      chunks: ['download', ...htmlCommonChunks],
      minify: htmlMinifyOptions,
    }),
    //  防止将样式打包在js中引起页面样式加载错乱的现象
    new ExtractTextPlugin({
      filename: '[name].[contenthash].css',
    }),
    new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': JSON.stringify('production')
      }
    }),
  ]
};