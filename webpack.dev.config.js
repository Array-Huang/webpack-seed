module.exports = {
  entry: require('./webpack-config/entry.config.js'),

  output: require('./webpack-config/output.config.js'),

  module: require('./webpack-config/module.dev.config.js'),

  resolve: require('./webpack-config/resolve.config.js'),

  plugins: require('./webpack-config/plugins.dev.config.js'),

  externals: require('./webpack-config/externals.config.js'),
};
