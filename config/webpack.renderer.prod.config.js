const resolve = require('path').resolve;
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ClearScriptPlugin = require('./clearScriptPlugin');

const path = (...path) => resolve(__dirname, ...path);

module.exports = {
  mode: 'production',
  target: 'electron-preload',
  entry: path('../src/renderer/main/index.tsx'),
  output: {
    path: path('../dist/renderer/'),
    filename: '[name].prod.js', // 输出则是每一个入口对应一个文件夹
  },
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
      {
        test: /.[le|c]ss$/,
        use: [
          'style-loader',
          'css-loader',
          {
            loader: 'less-loader',
            options: {
              lessOptions: {
                javascriptEnabled: true,
              },
            },
          },
        ],
      },
      // 处理字体文件 WOFF
      {
        test: /\.woff(\?v=\d+\.\d+\.\d+)?$/,
        use: {
          loader: 'url-loader',
          options: {
            limit: 10000,
            mimetype: 'application/font-woff',
          },
        },
      },
      // 处理字体文件 WOFF2
      {
        test: /\.woff2(\?v=\d+\.\d+\.\d+)?$/,
        use: {
          loader: 'url-loader',
          options: {
            limit: 10000,
            mimetype: 'application/font-woff',
          },
        },
      },
      // 处理字体文件 TTF
      {
        test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/,
        use: {
          loader: 'url-loader',
          options: {
            limit: 10000,
            mimetype: 'application/octet-stream',
          },
        },
      },
      // 处理字体文件 EOT
      {
        test: /\.eot(\?v=\d+\.\d+\.\d+)?$/,
        use: 'file-loader',
      },
      // 处理svg文件 SVG
      {
        test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
        use: {
          loader: 'url-loader',
          options: {
            limit: 10000,
            mimetype: 'image/svg+xml',
          },
        },
      },
      // 处理图片
      {
        test: /\.(?:ico|gif|png|jpg|jpeg|webp)$/,
        use: {
          loader: 'url-loader',
          options: {
            limit: 5000,
          },
        },
      },
    ],
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js', '.jsx'], // 自动解析确定的扩展
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
