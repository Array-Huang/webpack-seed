require('!!file-loader?name=index.html!../../index.html');
module.exports = {
  js: {
    html5shiv: require('!!file-loader?name=static/js/[name].[ext]!../../../vendor/ie-fix/html5shiv.min.js'),
    respond: require('!!file-loader?name=static/js/[name].[ext]!../../../vendor/ie-fix/respond.min.js'),
    jquery: require('!!file-loader?name=static/js/[name].[ext]!jquery/dist/jquery.min.js'),
  },
  images: {
    'login-bg': require('!!file-loader?name=static/images/[name].[ext]!../imgs/login-bg.jpg'),
  },
  // dll: {
  //   js: require('!!file-loader?name=dll/dll.js!../../dll/dll.js'),
  //   css: require('!file-loader?name=dll/dll.css!../../dll/dll.css'),
  // },
};
