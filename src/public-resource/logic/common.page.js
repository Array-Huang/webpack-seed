// require('bootstrap/dist/css/bootstrap.min.css');
require('iconfontDir/iconfont.css');
require('lessDir/base.less');
require('metisMenu/metisMenu.min');
require('bootstrap/dist/js/bootstrap.min.js');
require('vendorDir/promise.min');

$(() => {
  $('#side-menu').metisMenu();
  $('#side-menu').css('visibility', 'visible');
  (() => {
    const width = (window.innerWidth > 0) ? window.innerWidth : window.screen.width;
    if (width < 768) {
      $('div.navbar-collapse').addClass('collapse');
      // topOffset = 100; // 2-row-menu
      const topOffset = $('nav.navbar').height() + 1 + 1;

      let height = ((window.innerHeight > 0) ? window.innerHeight : window.screen.height) - 4;
      height = height - topOffset;
      if (height < 1) height = 1;
      if (height > topOffset) {
        $('#page-wrapper').css('min-height', (height) + 'px');
      }
    } else {
      $('div.navbar-collapse').removeClass('collapse');
    }

    const url = window.location.href;
    let element = $('ul.nav a').filter(function filterCb() {
      return this.href === url;
    }).addClass('active')
      .parent('li');
    let ifContinue = true;
    while (ifContinue) {
      if (element.is('li')) {
        element = element.parent('ul').addClass('in')
                         .parent('li')
                         .addClass('active');
      } else {
        ifContinue = false;
      }
    }
  })();

  /* 事件绑定 开始 */

  /* 事件绑定 结束 */

  /* 各种定时器 开始 */
  /* 各种定时器 结束 */
});
