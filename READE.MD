# npm init

# npm i webpack webpack-cli -D

```js
const path = require('path'); // 导入path模块
module.exports = {
  // 入口文件
  entry: './src/index.ts',
  // 出口文件
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js',
  },
};
```

# npm i typescript ts-loader -D

# tsc --init 快速生成 tsconfig.json

```js
"compilerOptions": {
        "outDir": "./dist",
        "target": "es5", // 指定编译到的 es 版本 es5
        "module": "es6", // 指定编译到的模块系统 es6
        "strict": true, // 使用严格类型检查
        "allowJs": true, // 允许使用 js 语法
        "jsx": "react", // 指定 jsx 语法 react
        "allowSyntheticDefaultImports": true // 允许使用类似 import React from 'react' 的语法
    }
```

`webpack-cli --mode=production --config config/webpack.config.js`

# npm i react react-dom @types/react @types/react-dom -D

    创建 app.tsx index.tsx index.html

# npm i html-webpack-plugin -D

```js
 plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, './template/index.html'), // 模板位置
      filename: 'index.html', // 输出后的文件名，路径是 output.path
      title: 'Nano', // 传给模板的变量
    }),
  ],
```

# pnpm install --save-dev less-loader less css-loader style-loader

```js
{
    test: /.[le|c]ss$/,
    use: ["style-loader", "css-loader", "less-loader"],
},
```

# npx eslint --init

    创建 .eslintrc.js
     eslint --init

✔ How would you like to use ESLint? · style
✔ What type of modules does your project use? · esm
✔ Which framework does your project use? · react
✔ Does your project use TypeScript? · No / Yes
✔ Where does your code run? · browser
✔ How would you like to define a style for your project? · guide
✔ Which style guide do you want to follow? · airbnb
✔ What format do you want your config file to be in? · JavaScript

// 禁止使用 var
"no-var": "error",
// 优先使用 interface 而不是 type
"@typescript-eslint/consistent-type-definitions": ["error", "interface"],
"@typescript-eslint/no-explicit-any": "off",
"@typescript-eslint/explicit-module-boundary-types": "off",
"react-hooks/rules-of-hooks": "error",
"react-hooks/exhaustive-deps": "warn",
"react/prop-types": "off",

<!-- @typescript-eslint/no-use-before-define: 'React' was used before it was defined. --> 降级处理

"@typescript-eslint/eslint-plugin": "4.0.1",
"@typescript-eslint/parser": "4.0.1",

# Commitizen 助你规范化提交代码

: 全局安装`Commitizen`

`npm i cz-customizable@6.3.0 --save-dev`

: 安装并配置 `cz-customizable` 插件 , 添加以下配置到 `package.json ` 中

`npm i cz-customizable@6.3.0 --save-dev`

```js
     "config": {
    "commitizen": {
      "path": "node_modules/cz-customizable"
    }
  }
```

: 项目根目录下创建 `.cz-config.js` 自定义提示文件

```js
module.exports = {
  // 可选类型
  types: [
    { value: 'feat', name: 'feat:     新功能' },
    { value: 'fix', name: 'fix:      修复' },
    { value: 'docs', name: 'docs:     文档变更' },
    { value: 'style', name: 'style:    代码格式(不影响代码运行的变动)' },
    {
      value: 'refactor',
      name: 'refactor: 重构(既不是增加feature，也不是修复bug)',
    },
    { value: 'perf', name: 'perf:     性能优化' },
    { value: 'test', name: 'test:     增加测试' },
    { value: 'chore', name: 'chore:    构建过程或辅助工具的变动' },
    { value: 'revert', name: 'revert:   回退' },
    { value: 'build', name: 'build:    打包' },
  ],
  // 消息步骤
  messages: {
    type: '请选择提交类型:',
    customScope: '请输入修改范围(可选):',
    subject: '请简要描述提交(必填):',
    body: '请输入详细描述(可选):',
    footer: '请输入要关闭的issue(可选):',
    confirmCommit: '确认使用以上信息提交？(y/n/e/h)',
  },
  // 跳过问题
  skipQuestions: ['body', 'footer'],
  // subject文字长度默认是72
  subjectLimit: 72,
};
```

:使用 `git cz` 代替 `git commit`

# commitlint

`npm install --save-dev @commitlint/config-conventional@12.1.4 @commitlint/cli@12.1.4`
: 创建 commitlint.config.js

```
module.exports = {
  // 继承的规则
  extends: ['@commitlint/config-conventional'],
  // 定义规则类型
  rules: {
    // type 类型定义，表示 git 提交的 type 必须在以下类型范围内
    'type-enum': [
      2,
      'always',
      [
        'feat', // 新功能 feature
        'fix', // 修复 bug
        'docs', // 文档注释
        'style', // 代码格式(不影响代码运行的变动)
        'refactor', // 重构(既不增加新功能，也不是修复bug)
        'perf', // 性能优化
        'test', // 增加测试
        'chore', // 构建过程或辅助工具的变动
        'revert', // 回退
        'build' // 打包
      ]
    ],
    // subject 大小写不做校验
    'subject-case': [0]
  }
}
```

# husky

: 安装依赖：
`npm install husky@7.0.1 --save-dev`
:启动 `hooks` ， 生成 `.husky` 文件夹
`npx husky install`
:在 `package.json` 中生成 `prepare` 指令（ **需要 npm > 7.0 版本** ）
`npm set-script prepare "husky install"`

: 执行 `prepare` 指令
`npm run prepare`

: 添加 `commitlint` 的 `hook` 到 `husky`中，并指令在 `commit-msg` 的 `hooks` 下执行 `npx --no-install commitlint --edit "$1"` 指令
`npx husky add .husky/commit-msg 'npx --no-install commitlint --edit "$1"'`

## 通过 pre-commit 检测提交时代码规范

: 执行 `npx husky add .husky/pre-commit "npx eslint --ext .js,.vue,.jsx,.ts,.tsx src"` 添加 `commit` 时的 `hook` （`npx eslint --ext .js,.vue src` 会在执行到该 hook 时运行）

## lint-staged 自动修复格式错误

: 修改 `package.json` 配置

```JavaScript
"lint-staged": {
    "src/**/*.{js,vue}": [
      "eslint --fix",
      "git add"
    ]
  }
```

: 修改 `.husky/pre-commit` 文件

```js
    #!/bin/sh
. "$(dirname "$0")/_/husky.sh"

npx lint-staged

```
