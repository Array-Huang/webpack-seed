const config = require('configModule');
const userModule = require('userModule');
const webUploader = require('webuploader');
const libs = require('libs');
const alertify = require('alertify');
const defaultUploadOption = {
  auto: true, // 不需要手动调用上传，有文件选择即开始上传
  swf: config.WEBUPLOADER.BUILD_FILE.swf.webuploader,
  server: config.WEBUPLOADER.API,
  formData: userModule.getBaseAjaxParams(),
  fileVal: 'file',
  pick: '.js-file-picker',
  accept: {
    title: 'Images',
    extensions: 'jpg,jpeg,bmp,png',
    mimeTypes: 'image/*',
  },
  compress: {
    width: 800,
    height: 800,
    quality: 80,
    crop: false,
  },
  // runtimeOrder: 'flash',
};
var $uploader;
const pf = {
  checkIsSupport() {
    const isSupport = webUploader.Uploader.support();
    if (!isSupport) {
      alert('您当前的浏览器无法进行文件上传，请换用谷歌、火狐、360等现代浏览器');
    }
    return isSupport;
  },

  uploadStartCb() {
    libs.showLoading();
  },

  uploadAcceptCb: (file, response) => response.ResultCode === config.API_SUCCESS_VALUE,

  uploadErrorCb() {
    alertify.error('服务器繁忙，图片上传失败');
  },

  buildUploadSuccessCb: (customSuccessCb) => ((file, response) => {
    if ($.isFunction(customSuccessCb)) {
      customSuccessCb(response.Data);
    }
  }),

  uploadCompleteCb(file) {
    libs.hideLoading();
    $uploader.removeFile(file);
  },
};

const moduleExports = {
  create(option) {
    if (!pf.checkIsSupport()) return false;
    option = $.extend({}, defaultUploadOption, option);
    $uploader = webUploader.create(option);
    return $uploader;
  },
  eventBind(successCb) {
    const uploader = $uploader;
    uploader.on('fileQueued', pf.uploadStartCb);
    uploader.on('uploadAccept', pf.uploadAcceptCb);
    uploader.on('uploadComplete', pf.uploadCompleteCb);
    uploader.on('uploadSuccess', pf.buildUploadSuccessCb(successCb));
    uploader.on('uploadError', pf.uploadErrorCb);
  },
};

module.exports = moduleExports;
