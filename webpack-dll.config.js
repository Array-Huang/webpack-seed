const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const dirVars = require('./webpack-config/base/dir-vars.config.js');

module.exports = {
  output: {
    path: dirVars.dllDir,
    filename: '[name].js',
    library: '[name]',
  },
  entry: {
    dll: [
      'jquery', '!!bootstrap-webpack!bootstrapConfig',
      'metisMenu/metisMenu.min', 'metisMenu/metisMenu.min.css',
    ],
  },
  plugins: [
    new webpack.DllPlugin({
      path: 'manifest.json',
      name: '[name]',
      context: dirVars.staticRootDir,
    }),
    new webpack.ProvidePlugin({
      $: 'jquery',
      jQuery: 'jquery',
      'window.jQuery': 'jquery',
      'window.$': 'jquery',
    }),
    new ExtractTextPlugin('[name].css'),
  ],
  module: require('./webpack-config/module.config.js'),
  resolve: require('./webpack-config/resolve.config.js'),
};
