const Spinner = require('spin');
const store = require('store');

const pf = {

  /* ajax相关结束 */
  /* 初始化spin */
  _initSpinInstance() {
    var opts = {
      lines: 9, // The number of lines to draw
      length: 23, // The length of each line
      width: 18, // The line thickness
      radius: 42, // The radius of the inner circle
      scale: 0.5, // Scales overall size of the spinner
      corners: 1, // Corner roundness (0..1)
      color: '#000', // #rgb or #rrggbb or array of colors
      opacity: 0.35, // Opacity of the lines
      rotate: 0, // The rotation offset
      direction: 1, // 1: clockwise, -1: counterclockwise
      speed: 1, // Rounds per second
      trail: 53, // Afterglow percentage
      fps: 20, // Frames per second when using setTimeout() as a fallback for CSS
      zIndex: 2e9, // The z-index (defaults to 2000000000)
      className: 'spinner', // The CSS class to assign to the spinner
      top: '50%', // Top position relative to parent
      left: '50%', // Left position relative to parent
      shadow: false, // Whether to render a shadow
      hwaccel: false, // Whether to use hardware acceleration
      position: 'absolute', // Element positioning
    };
    return new Spinner(opts);
  },
};

const moduleExports = {
  /*
   * loading相关 开始
   */
  LoadingInstance: null,
  /* 在button上显示loading */
  buttonShowLoading($button) {
    $button.prop('disabled', true);
    $button.append('<i class="iconfont icon-loading iconfont--spin"></i>');
    return this;
  },
  /* 消除button上的loading */
  buttonHideLoading($button) {
    $button.prop('disabled', false);
    $button.find('i.icon-loading').remove();
    return this;
  },
  /* 在屏幕中央显示loading */
  showLoading(domContainer) {
    this.LoadingInstance = this.LoadingInstance || pf._initSpinInstance();
    this.LoadingInstance.spin();
    domContainer = domContainer || document.getElementById('page-wrapper');
    domContainer.appendChild(this.LoadingInstance.el);
  },
  /* 消除屏幕中央的loading */
  hideLoading() {
    if (!this.LoadingInstance) return;

    this.LoadingInstance.stop();
  },
  /* 获取一个loading实例以方便添加到各种地方 */
  getLoading() {
    return pf._initSpinInstance();
  },
  /*
   * loading相关 结束
   */

  /**
   * URL相关 开始
   */
  /* 在新窗口打开指定的URL */
  openNewWindow(redirectUrl) {
    $('body').append(`<a href="${redirectUrl}" target="_blank" id="hidden-link" style="visibility: hidden;">在新窗口打开指定URL</a>`);
    document.getElementById('hidden-link').click();
  },
  /* URL相关 结束 */

  /* 从一个对象中取出指定的字段形成一个新对象 */
  fetchObjFields(fieldsArr, obj) {
    const resultObj = {};
    for (let i = 0; i < fieldsArr.length; i ++) {
      const _key = fieldsArr[i];
      resultObj[_key] = obj[_key];
    }
    return resultObj;
  },

  /* 在页面间传递参数 */
  sendParamBetweenPages(toPage, key, value) {
    const localStorageKey = `${key}-to-${toPage}Page`;
    this.locStorage.set(localStorageKey, value);
  },
  /* 在页面间接受参数 */
  receiveParamBetweenPages(targetPage, key, dontRemove = false) {
    const localStorageKey = `${key}-to-${targetPage}Page`;
    const val = this.locStorage.get(localStorageKey);

    if (!dontRemove) {
      this.locStorage.remove(localStorageKey);
    }

    return val;
  },
  _eventListenerArr: {},
  /**
   *  监听自定义事件
   *  示例：
    libs.addEventListener({
      eventName: 'order-status-select',
      cb: (ret) => {
        if (ret) {
          console.log(ret.value);
        }
      },
    );
   *
   */
  addEventListener({ eventName, targetPage, cb }) {
    const config = require('configModule');
    const intervalId = window.setInterval(() => {
      let dontRemove = false;
      if (!targetPage) {
        targetPage = 'any-page';
        dontRemove = true;
      }
      const ret = this.receiveParamBetweenPages(targetPage, `event-${eventName}`, dontRemove);
      if (!!ret && typeof ret === 'object') {
        if ($.isFunction(cb)) {
          cb(ret);
        }
      }
    }, config.CHECK_CROSS_PAGE_EVENT_PER_TIME);
    this._eventListenerArr[eventName] = intervalId;
  },
  /**
   *  移除事件监听
   *  示例：
    libs.removeEventListener({ eventName: 'order-status-select' });
   *
   */
  removeEventListener({ eventName }) {
    clearInterval(this._eventListenerArr[eventName]);
  },

  /**
   *  将任意一个自定义事件广播出去，该事件可在任意页面通过addEventListener监听收到。
   *  示例：
    libs.sendEvent({ eventName: 'user-alerdy-login' });
    libs.sendEvent({
      eventName: 'user-alerdy-login',    //事件名
      extra: {            // callback中可取到的参数
        key1: 'value1',
        key2: 'value2'
      }
    });
    libs.sendEvent({
      eventName: 'user-alerdy-login',
      extra: {
        key1: 'value1',
        key2: 'value2',
      },
    });
   *
   */
  sendEvent({ eventName, targetPage, extra }) {
    const ret = {
      value: extra,
    };
    targetPage = !!targetPage ? targetPage : 'any-page';
    this.sendParamBetweenPages(targetPage, `event-${eventName}`, ret);
  },


  /**
   * avalon相关
   */
  /**
   * 官方推荐、用来 mixin N个对象
   * 实现利用object（多是ajax读取回来的）来修改viewmodel
   * 参数说明：第一个参数必须是vm本身，其后紧接着需要mixin进vm的一个或多个object
   */
  assignVM(vm) {
    for (let i = 1; i < arguments.length; i++) {
      const nextSource = arguments[i];
      if (nextSource && typeof nextSource !== 'object') continue;
      let j;
      for (j in vm) {
        if (vm.hasOwnProperty(j) && nextSource.hasOwnProperty(j)) {
          vm[j] = nextSource[j];
        }
      }
    }
    return vm;
  },

  transferNullToEmptyStringForObject(obj) {
    $.each(obj, (key, val) => {
      obj[key] = (val === null) ? '' : val;
    });
  },
  /* avalon相关结束 */

  /* 格式化处理浮点型（带小数位） */
  formatFloat(num, pos) {
    pos = pos || 2;
    return Math.round(num * Math.pow(10, pos)) / Math.pow(10, pos);
  },

  /* 获取URL上的get参数 */
  getRequestParams() {
    const url = window.location.search; // 获取url中"?"符后的字串
    const theRequest = {};
    if (url.indexOf('?') !== -1) {
      const str = url.substr(1);
      const strs = str.split('&');
      for (let i = 0; i < strs.length; i ++) {
        theRequest[strs[i].split('=')[0]] = unescape(strs[i].split('=')[1]);
      }
    }
    return theRequest;
  },

  locStorage: {
    set: function set(key, val) {
      store.set(key, val);
      return this;
    },

    get: function get(key) {
      return store.get(key);
    },

    remove(key) {
      store.remove(key);
      return this;
    },

    clear() {
      store.clear();
      return this;
    },
  },

  tooltip: {
    init() {
      $('[data-toggle="tooltip"]').tooltip({
        container: 'body',
        placement: 'top',
      });
    },

    hide($dom) {
      $dom.tooltip('hide');
    },
  },
};

module.exports = moduleExports;
