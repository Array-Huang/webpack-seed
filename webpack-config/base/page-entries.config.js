var glob = require('glob');
var dirVars = require('./dir-vars.config.js');
var options = {
  cwd: dirVars.pagesDir, // 在pages目录里找
  sync: true, // 这里不能异步，只能同步
};
var globInstance = new glob.Glob('*/*', options);
module.exports = globInstance.found; // 一个数组，形如['index/index', 'index/login', 'alert/index']
