var ExtractTextPlugin = require('extract-text-webpack-plugin');
var dirVars = require('./base/dir-vars.config.js');

const moduleConfig = require('./inherit/module.config.js');

moduleConfig.rules.push({
  test: /\.css$/,
  exclude: /node_modules|bootstrap/,
  // loader: ExtractTextPlugin.extract('css?minimize&-autoprefixer!postcss'),
  use: ExtractTextPlugin.extract([
    {
      loader: 'css-loader',
      options: {
        minimize: true,
        '-autoprefixer': true,
      },
    },
    {
      loader: 'postcss-loader',
    },
  ]),
});

moduleConfig.rules.push({
  test: /\.css$/,
  include: /bootstrap/,
  use: ExtractTextPlugin.extract([
    {
      loader: 'css-loader',
    },
  ]),
});

moduleConfig.rules.push({
  test: /\.less$/,
  include: dirVars.srcRootDir,
  use: ExtractTextPlugin.extract([
    {
      loader: 'css-loader',
      options: {
        minimize: true,
        '-autoprefixer': true,
      },
    },
    {
      loader: 'postcss-loader',
    },
    {
      loader: 'less-loader',
    },
  ]),
});

module.exports = moduleConfig;
