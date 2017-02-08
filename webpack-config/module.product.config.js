var ExtractTextPlugin = require('extract-text-webpack-plugin');
var dirVars = require('./base/dir-vars.config.js');

const moduleConfig = require('./inherit/module.config.js');

moduleConfig.loaders.push({
  test: /\.css$/,
  exclude: /node_modules|bootstrap/,
  loader: ExtractTextPlugin.extract('css?minimize&-autoprefixer!postcss'),
});

moduleConfig.loaders.push({
  test: /\.css$/,
  include: /bootstrap/,
  loader: ExtractTextPlugin.extract('css'),
});

moduleConfig.loaders.push({
  test: /\.less$/,
  include: dirVars.srcRootDir,
  loader: ExtractTextPlugin.extract('css?minimize&-autoprefixer!postcss!less'),
});

module.exports = moduleConfig;
