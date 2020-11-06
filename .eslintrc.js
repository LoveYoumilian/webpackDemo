module.exports = {
  env: {
    browser: true,
    commonjs: true,
    es6: true,
  },
  parser: 'babel-eslint',
  extends: ['eslint:recommended', 'plugin:react/recommended'],
  parserOptions: {
    ecmaVersion: 7,
    // 开启实验属性
    ecmaFeatures: {
      experimentalObjectRestSpread: true,
      // 修饰器
      experimentalDecorators: true,
      jsx: true,
    },
    sourceType: 'module',
  },
  plugins: ['react'],
  globals: {
    __DEV__: false,
    __dirname: false,
    window: true,
    define: true,
    history: true,
    location: true,
    wxjs: true,
    $: true,
    WeixinJSBridge: true,
    wx: true,
    process: true,
    qq: true,
  },
  settings: {
    react: {
      version: '16.2.0',
    },
  },
  rules: {
    // 禁止空函数
    'no-empty-function': ['error'],
    // 禁止 function 定义中出现重名参数
    'no-dupe-args': 2,
    // 禁止对象字面量中出现重复的 key
    'no-dupe-keys': 2,
    // 禁止重复的 case 标签
    'no-duplicate-case': 2,
    // 禁止出现空代码块，允许 catch 为空代码块
    'no-empty': ['error', { allowEmptyCatch: true }],
    // 禁止对 catch 子句的参数重新赋值
    'no-ex-assign': 2,
    // 禁止不必要的布尔转换
    'no-extra-boolean-cast': 2,
    // 禁止不必要的括号 //(a * b) + c;//报错
    'no-extra-parens': 0,
    // 禁止在 if 代码块内出现函数声明
    'no-inner-declarations': ['error', 'both'],
    // 禁止在普通字符串中出现模版字符串里的变量形式，如 'Hello ${name}!'
    'no-template-curly-in-string': 'error',
    // 禁止在 return, throw, break 或 continue 之后还有代码
    'no-unreachable': 'error',
    // 不允许标签与变量同名
    'no-label-var': 2,
    // 禁止 var 声明 与外层作用域的变量同名
    'no-shadow': 0,
    // 禁止覆盖受限制的标识符
    'no-shadow-restricted-names': 2,
    // 禁止将变量初始化为 undefined
    'no-undef-init': 2,
    // 禁止将 undefined 作为标识符
    'no-undefined': 0,
    // 不允许在变量定义之前使用它们
    'no-use-before-define': 0,

    /**
     **************
     * // 风格指南 //
     **************
     */
    // 一致缩进2个空格,switch 语句中的 case 子句缩进级别为1，即两个空格
    indent: ['error', 2, { SwitchCase: 1 }],
    // 单行最大长度
    'max-len': ['error', { code: 140, comments: 180 }],
    // 多行注释风格
    'multiline-comment-style': ['error', 'starred-block'],
    // 强制在对象字面量的属性中键和值之间使用一致的间距
    'key-spacing': [2, { beforeColon: false, afterColon: true }],
    // 要求在注释周围有空行 ( 要求在块级注释之前有一空行)
    'lines-around-comment': [2, { beforeBlockComment: true }],
    // 指定数组的元素之间要以空格隔开
    'array-bracket-spacing': [2, 'never'],
    // 禁止或强制在单行代码块中使用空格(禁用)
    'block-spacing': [1, 'never'],
    //强制使用一致的缩进 第二个参数为 'tab' 时，会使用tab，
    'brace-style': [2, '1tbs', { allowSingleLine: true }],
    // 控制逗号前后的空格
    'comma-spacing': [2, { before: false, after: true }],
    // 控制逗号在行尾出现还是在行首出现 (默认行尾)
    'comma-style': [2, 'last'],
    // 文件末尾强制换行
    'eol-last': 2,
    // 要求或禁止在函数标识符和其调用之间有空格
    'func-call-spacing': 2,
    // 构造函数首字母大写
    'new-cap': ['error'],
    // 强制所有控制语句使用一致的括号风格
    curly: [2, 'all'],
    // 禁止 catch 子句的参数与外层作用域中的变量同名
    'no-catch-shadow': 0,
    // 禁用特定的全局变量
    'no-restricted-globals': 2,
    // 强制在关键字前后使用一致的空格 (前后腰需要)
    'keyword-spacing': 2,
    // 禁止使用 Array 构造函数
    'no-array-constructor': 2,
    // 要求 return 语句之前有一空行
    'newline-before-return': 0,
    // 要求方法链中每个调用都有一个换行符
    'newline-per-chained-call': 1,
    // 禁用 continue 语句
    'no-continue': 0,
    // 禁用 console-log
    'no-console': 0,
    //禁止空格和 tab 的混合缩进
    'no-mixed-spaces-and-tabs': ['error', 'smart-tabs'],
    // 不允许多个空行
    'no-multiple-empty-lines': [2, { max: 2 }],
    // 不允许使用嵌套的三元表达式
    'no-nested-ternary': 0,
    // 强制使用一致的反勾号、双引号或单引号
    quotes: [2, 'single', 'avoid-escape'],
    // 强制分号之前和之后使用一致的空格
    'semi-spacing': 2,

    /**
     **************
     * // es6 //
     **************
     */
    // 强制 generator 函数中 * 号周围使用一致的空格
    'generator-star-spacing': [2, { before: true, after: true }],
    // 要求generator 函数内有 yield
    'require-yield': 2,
    // 禁止修改类声明的变量
    'no-class-assign': 2,
    // 禁止类成员中出现重复的名称
    'no-dupe-class-members': 2,
    // 要求或禁止模板字符串中的嵌入表达式周围空格的使用
    'template-curly-spacing': 1,
    // 每个模块只能使用一个import
    'no-duplicate-imports': 2,
    // 禁止在构造函数中，在调用 super() 之前使用 this 或 super
    'no-this-before-super': 2,
    // 要求使用 let 或 const 而不是 var
    'no-var': 1,
    // 要求使用箭头函数作为回调
    'prefer-arrow-callback': 0,
    // 要求使用 const 声明那些声明后不再被修改的变量
    'prefer-const': 0,
    // 要求使用模板字面量而非字符串连接
    'prefer-template': 0,

    /**
     **************
     * // jsx //
     **************
     */
    // 禁止使用已废弃的 api
    'react/no-deprecated': 'error',
    // 禁止未使用的变量
    'no-unused-vars': 0,
    //在JSX属性中强制或禁止等号周围的空格
    'react/jsx-equals-spacing': 2,
    'react/jsx-filename-extension': [
      2,
      {
        extensions: ['.js', '.jsx'],
      },
    ],
    // 禁止直接修改 this.state
    'react/no-direct-mutation-state': 'error',
    // 禁止出现 HTML 中的属性，如 class
    'react/no-unknown-property': 'error',
    // render 方法中必须有返回值
    'react/require-render-return': 'error',
    // 自闭和标签的反尖括号必须与尖括号的那一行对齐
    'react/jsx-closing-bracket-location': [
      'error',
      { nonEmpty: false, selfClosing: 'line-aligned' },
    ],
    // jsx 的 children 缩进必须为四个空格
    'react/jsx-indent': ['error', 2],
    // jsx 的 props 缩进必须为四个空格
    'react/jsx-indent-props': ['error', 2],
    // 禁止出现重复的 props
    'react/jsx-no-duplicate-props': 'error',
    // 禁止出现多余的分号
    'no-extra-semi': 'error',
    // 禁止在数组中出现连续的逗号，如 let foo = [,,]
    'no-sparse-arrays': 'error',
    // 禁止在条件语句中出现赋值操作符，除非这个赋值语句被括号包起来了
    'no-cond-assign': ['error', 'except-parens'],
    // 强制在 JSX 属性中一致地使用双引号或单引号
    'jsx-quotes': 0,
    //链式调用的时候，点号必须放在第二行开头处，禁止放在第一行结尾处
    'dot-location': ['error', 'property'],
    // 必须使用 === 或 !==，禁止使用 == 或 !=，与 null 比较时除外
    eqeqeq: ['error', 'always', { null: 'ignore' }],
    // @fixable 禁止出现没必要的 bind
    'no-extra-bind': 'error',
    // @fixable 禁止出现没必要的 label
    'no-extra-label': 'error',
    // switch 的 case 内必须有 break, return 或 throw
    'no-fallthrough': 'error',
    // 禁止重复定义变量
    'no-redeclare': 'error',
    // 禁止在 return 语句里赋值
    'no-return-assign': 0,
  },
};
