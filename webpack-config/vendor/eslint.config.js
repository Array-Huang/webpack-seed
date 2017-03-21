var path = require('path');
var dirVars = require('../base/dir-vars.config.js');
module.exports = {
  configFile: path.resolve(dirVars.staticRootDir, './.eslintrc.js'),
  failOnWarning: true,
  failOnError: true,
  cache: true,
};
