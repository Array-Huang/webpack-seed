module.exports = {
  js: {
    xdomain: require('!file-loader?name=static/js/[name].[ext]!../../../vendor/ie-fix/xdomain.all.js'),
    html5shiv: require('!file-loader?name=static/js/[name].[ext]!../../../vendor/ie-fix/html5shiv.min.js'),
    respond: require('!file-loader?name=static/js/[name].[ext]!../../../vendor/ie-fix/respond.min.js'),
  },
  images: {
    'login-bg': require('!file-loader?name=static/images/[name].[ext]!../imgs/login-bg.jpg'),
  },
  swf: {
    webuploader: require('!file-loader?name=static/swf/[name].[ext]!../../../vendor/webuploader/Uploader.swf'),
  },
};
