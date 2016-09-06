const toastr = require('toastr');
const bootbox = require('bootbox');
toastr.options = {
  closeButton: false,
  debug: false,
  newestOnTop: false,
  progressBar: true,
  positionClass: 'toast-bottom-right',
  preventDuplicates: false,
  onclick: null,
  showDuration: 300,
  hideDuration: 1000,
  timeOut: 5000,
  extendedTimeOut: 1000,
  showEasing: 'swing',
  hideEasing: 'linear',
  showMethod: 'fadeIn',
  hideMethod: 'fadeOut',
};
bootbox.setDefaults({
  locale: 'zh_CN',
  show: true,
  backdrop: true,
  closeButton: true,
  animate: true,
});

module.exports = {
  log(msg) {
    toastr.info(msg);
    return this;
  },

  success(msg) {
    toastr.success(msg);
    return this;
  },

  warning(msg) {
    toastr.warning(msg);
    return this;
  },

  error(msg) {
    toastr.error(msg);
    return this;
  },

  alert(msg, callback) {
    bootbox.alert(msg, callback);
    return this;
  },

  confirm(msg, yesCb, noCb) {
    bootbox.confirm(msg, (result) => {
      if (result) {
        if (typeof yesCb === 'function') {
          yesCb();
        }
      } else if (typeof noCb === 'function') {
        noCb();
      }
    });
    return this;
  },

  prompt(msg, defaultValue, cb) {
    bootbox.prompt({
      title: msg,
      value: defaultValue,
      callback: cb,
    });
    return this;
  },

  customButtonAlert({ message, title, buttons }) {
    bootbox.dialog({ message, title, buttons });
  },
};
