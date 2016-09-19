var webpack = require('webpack');
var pluginsConfig = require('./inherit/plugins.config.js');

pluginsConfig.push(new webpack.optimize.UglifyJsPlugin({
  compress: {
    warnings: false,
  },
}));

pluginsConfig.push(new webpack.DefinePlugin({
  IS_PRODUCTION: true,
}));

module.exports = pluginsConfig;
