var fs = require('fs');
var rimraf = require('rimraf');
var dirVars = require('../webpack-config/base/dir-vars.config.js');
rimraf(dirVars.dllDir, fs, function cb() {
  console.log('dll目录已清空');
});
