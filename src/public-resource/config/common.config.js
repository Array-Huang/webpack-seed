const buildFileConfig = require('configDir/build-file.config');
const moduleExports = {
  DIRS: {
    BUILD_FILE: buildFileConfig,
  },

  PAGE_ROOT_PATH: '../../../build/',
};

/* 帮助确定ie下CORS的代理文件 */
moduleExports.DIRS.SERVER_API_URL = moduleExports.SERVER_API_URL;

module.exports = moduleExports;
