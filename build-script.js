var fs = require('fs');
var rimraf = require('rimraf');
var path = require('path');
var staticRootDir = __dirname;
var buildDir = path.resolve(staticRootDir, './build');
rimraf(buildDir, fs, function cb() {
  console.log('build目录已清空');
});
