const path = require('path');
const PATHS = require('./PATH');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin');
const notifier = require('node-notifier')
const themes = require('../themes');

// 获取环境变量
let argv = process.argv, // 启动传入的命令行参数
  envAPI = 'dev';
for (let i = 0; i < argv.length; i++) {
  let arg = argv[i];
  if (arg.startsWith('--env.API=')) {
    envAPI = arg.replace('--env.API=', '');
  }
}

let commonCss = [
  {

    /*
     * 创建style标签,将样式放入
     * style-loader
     */
    loader: MiniCssExtractPlugin.loader, // CSS 单独抽离一个文件
  },
  {
    loader: 'css-loader', // 将css文件整合到js文件中
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
];
// 入口文件
/*
 * entry: {
 *    main: ['@babel/polyfill', path.resolve(PATHS.src, 'index.js')]
 * },
 *
 * entry: {main: ['@babel/polyfill', path.resolve(PATHS.src, 'index.js')]}, 这样配置的话，打包以后代码体积会变得很大。
 * 'useBuiltIns': 'usage'：按需加载，只会对我们index.js当前要打包的文件中使用过的语法,比如Promise,map做polyfill,其他es6未出现的语法,我们暂时不去做polyfill,减小打包体积
 */
module.exports = {
  entry: {
    main: ['@babel/polyfill', path.resolve(PATHS.src, 'index.js')],
  },
  // entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, PATHS['dist']),
    filename: '[name].[hash:6].js',
  },
  resolve: {
    extensions: ['.js', '.jsx'], // 导入语句没带文件后缀,webpack自动带上后缀文件
    alias: {
      //设置别名
      '@assets': path.resolve(PATHS.src, 'assets'),
      '@component': path.resolve(PATHS.src, 'component'),
      '@page': path.resolve(PATHS.src, 'page'),
      '@until': path.resolve(PATHS.src, 'until'),
      '@server': path.resolve(PATHS.src, 'server'),
      '@router': path.resolve(PATHS.src, 'router'),
      '@store': path.resolve(PATHS.src, 'store'),
      '@layout': path.resolve(PATHS.src, 'layout'),
      '@tools': path.resolve(PATHS.src, 'tools'),
      '@css': path.resolve(PATHS.src, 'css'),
      '@image': path.resolve(PATHS.src, 'image'),
    },
  },
  module: {
    rules: [
      {
        test: /\.m?js$/,
        exclude: /(node_modules|bower_components)/,
        enforce: 'pre', // 优先执行
        loader: 'eslint-loader',
        options: {
          fix: true, // 自动修复
        },
      },
      {
        oneOf: [
          {
            test: /\.css$/,
            use: ['style-loader', 'css-loader'],
          },
          {
            test: /\.m?js$/,
            exclude: /(node_modules|bower_components)/,
            use: [
              {
                loader: 'babel-loader',
                options: {
                  cacheDirectory: true, //
                },
              },
              {
                loader: 'thread-loader', // 开启多进程打包
                options: {
                  workers: 2,
                },
              },
            ], // options 在 .babelrc 定义
          },
          {
            test: /\.(png|jpg|gif|ttf|eot|woff(2)?)(\?[=a-z0-9]+)?$/,
            loader: 'url-loader',
            options: {
              limit: 8 * 1024, // 8 kb以下转 base64
              esModule: false, // 关闭默认 es模块引入方式
              outputPath: 'images', // 将文件打包到哪里
              publicPath: './images',
              name: '[hash:8].[ext]', // .ext 文件扩展名，jpg\png
            },
          },
        ],
      },
      {
        // exclude排除资源
        exclude: /\.(css|js|html|less|json|jpg|png|gif|scss|sass)$/,
        loader: 'file-loader',
        options: {
          name: '[hash:10].[ext]',
        },
      },
      {
        test: /\.(sass|scss)$/,
        use: [
          ...commonCss,
          {
            loader: 'sass-loader',
            options: {
              sourceMap: true,
              sassOptions: {
                javascriptEnabled: true,
                modifyVars: themes,
              },
            },
          },
        ],
        exclude: /node_modules/,
      },
      {
        // 编译less
        test: /\.less$/,
        use: [
          ...commonCss,
          {
            loader: 'less-loader',
            options: {
              sourceMap: true,
              lessOptions: {
                javascriptEnabled: true,
                modifyVars: themes,
              },
            },
          },
        ],
        exclude: /node_modules/,
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: 'demo webpackPlugin',
      filename: path.resolve(PATHS['dist'], 'index.html'),
      template: path.resolve(PATHS['public'], 'index.html'),
      hash: true,
      minify: {
        removeAttributeQuotes: true, //去除多余引号
        collapseWhitespace: true, //去除空格
        removeComments: true, //去除注释
      },
    }),
    new MiniCssExtractPlugin({
      //CSS 单独抽离一个文件
      filename: '[name].[hash:6].css',
    }),
    new CopyPlugin({
      //静态资源加载
      patterns: [
        {
          from: path.resolve(process.cwd(), 'src/assets/fonts'),
          to: path.resolve(process.cwd(), 'dist/statics/fonts'),
        },
      ],
    }),
    new webpack.DefinePlugin({
      API_CONFIG: JSON.stringify(envAPI),
    }), // 全局变量
    new FriendlyErrorsPlugin({

      /*
       * 美化控制台输出的插件 https://www.npmjs.com/package/friendly-errors-webpack-plugin
       * 运行成功
       */
      compilationSuccessInfo: {
        messages: ['你的应用程序在这里运行：http://localhost:8811'],
        notes: ['项目正在运行中...'],
      },
      //  运行错误
      onErrors: function (severity, errors) {

        /*
         * 可以收听插件转换和优先级的错误
         * 严重性可以是'错误'或'警告'
         */
        if (severity !== 'error') {
          return;
        }
        const error = errors[0];
        notifier.notify({
          title: 'Webpack error',
          message: severity + ': ' + error.name,
          subtitle: error.file || '',
          // icon: ICON
        });
      },

      /*
       * 是否每次编译之间清除控制台
       * 默认为true
       */
      clearConsole: true,
    }),
  ],
};
