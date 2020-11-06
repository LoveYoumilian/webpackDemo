const path = require('path');
const PATHS = require('./PATH');
const webpack = require('webpack');
const { HotModuleReplacementPlugin } = webpack;
const { merge } = require('webpack-merge'); //配置合并插件
const commonConfig = require('./webpack.common');

const devServer = {
  contentBase: path.resolve(PATHS.dist), //本地服务器所加载的页面所在的目录
  compress: true, //GZip压缩
  historyApiFallback: true, //不跳转
  host: '127.0.0.1',
  port: 8080,
  inline: true, //实时刷新
  open: true, //自动打开浏览器
  hot: true, //开启热更新
};
const devConfig = {
  mode: 'development', //模式
  devtool: 'cheap-module-eval-source-map', //source-map
  devServer,
  plugins: [
    new HotModuleReplacementPlugin(), // 热更新
  ],
  module: {
    rules: [],
  },
};
module.exports = merge(commonConfig, devConfig);
