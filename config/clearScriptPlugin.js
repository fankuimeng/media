const HtmlWebpackPlugin = require('html-webpack-plugin');
class htmlPlugin {
  constructor(chunkName) {
    this.chunkName = chunkName || 'runtime';
    this.chunkScript = null;
    this.chunkIndex = -1;
  }

  apply(compiler) {
    // 注入 html-webpack-plugin 的处理过程
    compiler.hooks.compilation.tap('htmlPlugin', compilation => {
      // 在标签生成之前 HtmlWebpackPlugin.getHooks(compilation)
      HtmlWebpackPlugin.getHooks(compilation).afterTemplateExecution.tapAsync(
        'htmlPlugin',
        (htmlPluginData, callback) => {
          let reg = /<script([\s\S]+?)<\/script>/g;
          //   let regCss = /<link([\s\S]+?)\/>/g;
          // .replace(regCss, "");
          htmlPluginData.html = htmlPluginData.html.replace(reg, '');
          // .replace(regCss, "");
          callback(null, htmlPluginData);
        }
      );
    });
  }
}

module.exports = htmlPlugin;
