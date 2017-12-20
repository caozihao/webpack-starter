// const webpack = require('webpack');
const path = require('path');
const merge = require('webpack-merge');
const common = require('./webpack.common');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');

module.exports = merge(common, {
  output: {
    filename: '[name].[chunkhash].js',
    path: path.resolve(__dirname, 'dist'),
  },
  plugins: [
    // new webpack.HashedModuleIdsPlugin(),
    // new CleanWebpackPlugin(['./dist/*.bundle.js']),
    new UglifyJsPlugin(),
  ],
});
