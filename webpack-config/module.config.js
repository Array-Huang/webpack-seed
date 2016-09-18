var ExtractTextPlugin = require('extract-text-webpack-plugin');
var dirVars = require('./base/dir-vars.config.js');
module.exports = {
  preLoaders: [{
    test: /\.js$/,
    loader: 'eslint',
    include: [
      dirVars.pagesDir, dirVars.publicDir,
    ],
    exclude: [dirVars.vendorDir, dirVars.buildDir, /bootstrap/],
  }],

  loaders: [
    {
      test: require.resolve('jquery'),
      loader: 'expose?$!expose?jQuery',
    },
    {
      test: /\.css$/,
      exclude: /node_modules|bootstrap/,
      loader: ExtractTextPlugin.extract('css?minimize&-autoprefixer!postcss'),
    },
    {
      test: /\.less$/,
      exclude: /node_modules|bootstrap/,
      loader: ExtractTextPlugin.extract('css?minimize&-autoprefixer!postcss!less'),
    },
    {
      test: /\.js$/,
      exclude: /node_modules|vendor|bootstrap/,
      loader: 'babel-loader',
    },
    {
      test: /\.jsx$/,
      exclude: /node_modules|vendor|bootstrap/,
      loader: 'babel-loader',
    },
    {
      test: /\.html$/,
      exclude: /node_modules|vendor/,
      loader: 'html',
    },
    {
      test: /\.ejs$/,
      exclude: /node_modules|vendor/,
      loader: 'ejs',
    },
    {
      // 图片加载器，雷同file-loader，更适合图片，可以将较小的图片转成base64，减少http请求
      // 如下配置，将小于8192byte的图片转成base64码
      test: /\.(png|jpg|gif)$/,
      loader: 'url?limit=8192&name=./static/img/[hash].[ext]',
    },
    {
      // 专供iconfont方案使用的，后面会带一串时间戳，需要特别匹配到
      test: /\.(woff|woff2|svg|eot|ttf)\??.*$/,
      loader: 'file?name=./static/fonts/[name].[ext]',
    },
  ],
};
