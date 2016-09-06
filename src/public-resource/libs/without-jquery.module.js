const config = require('configModule');
module.exports = {
  /* 拼接系统内部的URL */
  constructInsideUrl(url, urlTail) {
    urlTail = urlTail || '';
    return config.PAGE_ROOT_PATH + url + '/page.html' + urlTail;
  },
};
