var webpack = require('webpack');
var pluginsConfig = require('./inherit/plugins.config.js');
var uglifyJsPlugin = new webpack.optimize.UglifyJsPlugin({
  compress: {
    warnings: false,
  },
});
pluginsConfig.push(uglifyJsPlugin);

module.exports = pluginsConfig;
