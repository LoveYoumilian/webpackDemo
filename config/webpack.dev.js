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
  /*
   * clientLogLevel: 'none', // 不要显示启动服务器日志信息
   * quiet: true, // 除了一些基本启动信息以外,其他内容都不显示
   */
  overlay: false, // 如果出错了,不要全屏显示
  host: '127.0.0.1',
  port: 8080,
  inline: true, //实时刷新
  open: true, //自动打开浏览器
  hot: true, //开启热更新
  proxy: {
    //一旦DevServer(3000)服务器接收到 /api/xxx 的请求,就会把请求转发到另一个服务器(3000)
    '/api': {
      target: 'http://localhost:5000',
      //发送请求时,请求路径重写 将 /api/xxx  -->  /xxx  (去掉/api)
      pathRewrite: {
        '^/api': ''
      }
    }
  }
};
const devConfig = {
  mode: 'development', //模式
  devtool: 'cheap-module-eval-source-map', //source-map错误提示
  devServer,
  plugins: [
    new HotModuleReplacementPlugin(), // 热更新
  ],
  module: {
    rules: [],
  },
};
module.exports = merge(commonConfig, devConfig);
