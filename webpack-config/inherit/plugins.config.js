var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var path = require('path');
var dirVars = require('../base/dir-vars.config.js');
var pageArr = require('../base/page-entries.config.js');

/* 全局shimming */
var providePlugin = new webpack.ProvidePlugin({
  $: 'jquery',
  jQuery: 'jquery',
  'window.jQuery': 'jquery',
  'window.$': 'jquery',
});

/* 抽取出所有通用的部分 */
var commonsChunkPlugin = new webpack.optimize.CommonsChunkPlugin({
  name: 'commons',      // 需要注意的是，chunk的name不能相同！！！
  filename: '[name].bundle.js',
  minChunks: 4,
});

var extractTextPlugin = new ExtractTextPlugin('[name]/styles.css');

var configPlugins = [providePlugin, commonsChunkPlugin, extractTextPlugin];

pageArr.forEach((page) => {
  const htmlPlugin = new HtmlWebpackPlugin({
    filename: `${page}/page.html`,
    template: path.resolve(dirVars.pagesDir, `./${page}/html.js`),
    chunks: [page, 'commons'],
    hash: true, // 为静态资源生成hash值
  });
  configPlugins.push(htmlPlugin);
});

module.exports = configPlugins;
