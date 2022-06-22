const resolve = require('path').resolve;
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ClearScriptPlugin = require('./clearScriptPlugin');

const path = (...path) => resolve(__dirname, ...path);

module.exports = {
  entry: path('../src/index.tsx'),
  output: {
    path: path('../dist'),
    filename: '[name].js',
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        include: path('../src'), // 排除 node_modules 目录
      },
      {
        test: /.[le|c]ss$/,
        use: ['style-loader', 'css-loader', 'less-loader'],
      },
    ],
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js'], // 自动解析确定的扩展
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path('../index.html'), // 模板位置
      filename: 'index.html', // 输出后的文件名，路径是 output.path
      title: 'react-ts', // 传给模板的变量
    }),
    new ClearScriptPlugin(),
  ],
};
