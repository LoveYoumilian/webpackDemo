const { merge } = require('webpack-merge');
const webpack = require('webpack');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const commonConfig = require('./webpack.common');

const proConfig = {
  mode: 'production',
  module: {
    rules: [],
  },
  plugins: [
    new CleanWebpackPlugin(),
    new webpack.optimize.ModuleConcatenationPlugin(),
  ],
  optimization: {
    minimizer: [
      new UglifyJsPlugin({
        sourceMap: true,
        parallel: true, //启用多线程并行运行提高编译速度
      }),
      new OptimizeCSSAssetsPlugin({}),
    ],
    splitChunks: {
      minSize: 0, // 默认30000（30kb），但是demo中的文件都很小，minSize设为0，让每个文件都满足大小条件
      cacheGroups: {
        vendor: {
          // nodeModules 代码单独打包成一个 chunk 输出
          test: /[\\/]node_modules[\\/]/,
          priority: 10,
          chunks: 'initial',
          name: 'vendor',
        },
        commons: {
          // 多次import的文件打包成一个单独的common.js
          chunks: 'initial',
          minChunks: 2,
          maxInitialRequests: 5,
          name: 'common',
        },
      },
    },
  },
};
module.exports = merge(commonConfig, proConfig);
