const moduleExports = {
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
