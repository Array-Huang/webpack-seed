var dirVars = require('./base/dir-vars.config.js');
module.exports = {
  path: dirVars.buildDir,
  publicPath: '/',
  filename: '[name]/entry.[chunkhash].js',    // [name]表示entry每一项中的key，用以批量指定生成后文件的名称
  chunkFilename: '[id].[chunkhash].bundle.js',
};
