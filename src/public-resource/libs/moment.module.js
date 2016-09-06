const moment = require('moment');
moment.locale('zh-cn');
// require('moment/locale/zh-cn');

const moduleExports = {
  getNow(format) {
    format = format || 'YYYY-MM-DD HH:mm:ss';
    return moment().format(format);
  },

  isSameOrAfter: (time1, time2, precision) => moment(time1).isSameOrAfter(time2, precision),
};

module.exports = moduleExports;
