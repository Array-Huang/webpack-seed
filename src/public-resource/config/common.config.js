const buildFileConfig = require('configDir/build-file.config');
const moduleExports = {
  DIRS: {
    BUILD_FILE: buildFileConfig,
  },

  PAGE_ROOT_PATH: '../../../build/',
};

moduleExports.WEBUPLOADER = {
  API: moduleExports.FILE_SERVER_API_URL + '/api/Upload/MultiFiles?tname=carowner',
  SWF_SRC: '/public-resource/vendor/webuploader/Uploader.swf',
  BUILD_FILE: buildFileConfig,
};

/* 帮助确定ie下CORS的代理文件 */
moduleExports.DIRS.SERVER_API_URL = moduleExports.SERVER_API_URL;

module.exports = moduleExports;
