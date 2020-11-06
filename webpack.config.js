const path = require('path');
// 头部引用
const postcss = require('./postcss.config.js');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const env = process.env.NODE_ENV;

module.exports = {
  entry: path.resolve(__dirname, './src/index.js'),
  output: {
    path: path.resolve(__dirname, './dist'),
    filename: 'main.js',
  },
  mode: 'development',
  module: {
    rules: [
      // rules中调用
      {
        test: /\.css$/,
        use: [
          { loader: 'style-loader' },
          { loader: 'css-loader' },
          {
            loader: 'postcss-loader',
            options: {
              sourceMap: true,
              postcssOptions: {
                path: 'postcss.config.js',
              },
            },
          },
        ],
      },
      {
        test: /\.scss$/,
        use: [
          {
            loader: 'style-loader',
          },
          {
            loader: 'css-loader',
          },
          {
            loader: 'postcss-loader',
            options: {
              sourceMap: true,
              postcssOptions: {
                path: 'postcss.config.js',
              },
            },
          },
          {
            loader: 'sass-loader',
            options: { sourceMap: true },
          },
        ],
        exclude: /node_modules/,
      },
      {
        // 编译less
        test: /\.less$/,
        use: [
          {
            loader: 'style-loader',
          },
          {
            loader: 'css-loader',
            options: {
              importLoaders: 1,
            },
          },
          {
            loader: 'postcss-loader',
            options: {
              sourceMap: true,
              postcssOptions: {
                path: 'postcss.config.js',
              },
            },
          },
          {
            loader: 'less-loader',
            options: {
              sourceMap: true,
            },
          },
        ],
      },
      {
        test: /\.(png|jp?g|gif|svg)$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 8192, // 小于8192字节的图片打包成base 64图片
              name: 'images/[name].[hash:8].[ext]',
              publicPath: '',
            },
          },
        ],
      },
      {
        // exclude排除资源
        exclude: /\.(css|js|html|less|json|jpg|png|gif|scss)$/,
        loader: 'file-loader',
        options: {
          name: '[hash:10].[ext]',
        },
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      // 等于说就是复制这个./src/index.html，并自动引入打包输出的所有资源
      template: './src/index.html',
    }),
    new CleanWebpackPlugin({
      //每次打包清除之前的文件
      cleanAfterEveryBuildPatterns: ['dist'],
    }),
  ],
  devServer: {
    contentBase: path.resolve(__dirname, 'build'),
    compress: true, //启动压缩
    port: 3300,
    open: true,
    hot: true
  },
  // devtool: 'cheap-module-eval-source-map'
};
