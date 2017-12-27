const fs = require('fs');
const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const rootPath = path.resolve(__dirname);
const pagePath = `${rootPath}/src/pages`;

const htmlCommonChunks = ['vendor', 'runtime'];
const htmlMinifyOptions = {
  collapseWhitespace: true,
  removeComments: true,
};

const pageFiles = fs.readdirSync(pagePath);
let pageEntryObj = {};
let htmlObjArr = [];

pageFiles.forEach((v, i) => {
  pageEntryObj[v] = [`${pagePath}/${v}/index.js`];
  let htmlObj = {
    filename: `${v}.html`,
    template: `${pagePath}/${v}/${v}.html`,
    chunks: [`${v}`, ...htmlCommonChunks],
    minify: htmlMinifyOptions,
  };
  htmlObjArr.push(new HtmlWebpackPlugin(htmlObj));
})

module.exports = {
  entry: {
    ...pageEntryObj,
    vendor: ['jquery', 'babel-polyfill', 'whatwg-fetch'],
  },

  plugins: [
    new CleanWebpackPlugin(['dist']),
    // 提取公共模块,name里的文件必须在 entry 里生成
    new webpack.optimize.CommonsChunkPlugin({
      names: ['vendor', 'runtime'],
    }),

    ...htmlObjArr,

    // 拆分文件中的css
    new ExtractTextPlugin({
      filename: '[name].[contenthash].css',
    }),
    new webpack.ProvidePlugin({
      $: 'jquery'
    })
  ],
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
        },
      },
      {
        test: /\.(png|jpg|svg|gif)$/,
        use: {
          loader: 'url-loader',
          options: {
            // 小于8kb自动转成base64的方式
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
    ],
  },
};
