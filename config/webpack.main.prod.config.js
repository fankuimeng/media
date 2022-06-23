const resolve = require('path').resolve;
const nodeExternals = require('webpack-node-externals');

const path = (...path) => resolve(__dirname, ...path);

module.exports = {
  mode: 'production',
  entry: path('../src/main/main.js'),
  output: {
    path: path('../dist/main/'),
    filename: 'main.prod.js',
  },
  externalsPresets: { node: true }, // 为了忽略诸如path、fs等内置模块。一起打包报错 electron安装报错
  externals: [nodeExternals()], // 以忽略节点\模块文件夹中的所有模块
  node: {
    __dirname: false,
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        include: path('../src'), // 排除 node_modules 目录
      },
    ],
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js', '.jsx'], // 自动解析确定的扩展
  },
};
