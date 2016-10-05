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

pluginsConfig.push(new webpack.NoErrorsPlugin()); // 配合CLI的--bail，一出error就终止webpack的编译进程

module.exports = pluginsConfig;
