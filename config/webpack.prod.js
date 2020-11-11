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
    new CleanWebpackPlugin(), // 每次build之前将之前的打包内容清空
    new webpack.optimize.ModuleConcatenationPlugin(),
  ],
  optimization: {
    minimizer: [ // 代码编译压缩
      new UglifyJsPlugin({
        sourceMap: true,
        parallel: true, //启用多线程并行运行提高编译速度
      }),
      new OptimizeCSSAssetsPlugin({}), // 用于优化或者压缩CSS资源
    ],
    splitChunks: {
      minSize: 0, // 默认30000（30kb），但是demo中的文件都很小，minSize设为0，让每个文件都满足大小条件
      chunks: 'all',      // async表示抽取异步模块，all表示对所有模块生效，initial表示对同步模块生效
      cacheGroups: {
        vendors: {  // 抽离第三方插件
          test: /[\\/]node_modules[\\/]/,     // 指定是node_modules下的第三方包
          name: 'vendors',
          priority: -10       // 抽取优先级
        },
        commons: {      // 抽离自定义工具库
          name: 'common',
          priority: -20,      // 将引用模块分离成新代码文件的最小体积
          minChunks: 2,       // 表示将引用模块如不同文件引用了多少次，才能分离生成新chunk
          minSize: 0
        }
      }
    },
    // 为 webpack 运行时代码创建单独的chunk
    runtimeChunk: {
      name: 'manifest'
    },
  },
};
module.exports = merge(commonConfig, proConfig);
