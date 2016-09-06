const moduleExports = {
  paginator: {
    init($container, clickCb) {
      require('paginator');
      $container.bootstrapPaginator({
        currentPage: 1,
        bootstrapMajorVersion: 3,
        numberOfPages: 5,
        totalPages: 1,
        onPageClicked(event, originalEvent, type, page) {
          if ($.isFunction(clickCb)) {
            clickCb(page);
          }
        },
        tooltipTitles(type, page) {
          switch (type) {
            case 'first':
              return '回到第一页';
            case 'prev':
              return '前一页';
            case 'next':
              return '后一页';
            case 'last':
              return '跳到最后一页';
            case 'page':
              return '跳到第' + page + '页';
            default:
          }
          return '';
        },
      });
    },
    setOptions($container, options) {
      require('paginator');
      $container.bootstrapPaginator(options);
    },
    buildPaginatorClickCb(vm) {
      return (page) => {
        if (vm.filter.pageIndex === page) {
          return;
        }
        vm.filter.pageIndex = page;
        vm.updateTable();
      };
    },
    setTotalPage($paginator, totalPages) {
      const paginatorOptions = { totalPages };
      moduleExports.paginator.setOptions($paginator, paginatorOptions);
    },
    setCurrentPage($paginator, currentPage) {
      const paginatorOptions = { currentPage };
      moduleExports.paginator.setOptions($paginator, paginatorOptions);
    },
  },
  datetimepicker: {
    init($target, type) {
      var minView = 0;
      var maxView = 4;
      switch (type) {
        case 'date':
          minView = 2;
          maxView = 4;
          break;
        case 'datetime':
          minView = 0;
          maxView = 4;
          break;
        case 'time':
          minView = 0;
          maxView = 1;
          break;
        default:
      }

      require('datetimepicker');
      require('datetimepicker_zhCN');
      $target = $target || $('.datetimepicker');
      $target.datetimepicker({
        language: 'zh-CN',
        weekStart: 1,
        todayBtn: 1,
        autoclose: true,
        todayHighlight: 1,
        startView: 2,
        minView: minView,
        maxView: maxView,
        forceParse: 0,
        showMeridian: 1,
      });
    },
    setStartDate($target, startDate) {
      const momentModule = require('momentModule');
      require('datetimepicker');
      require('datetimepicker_zhCN');
      $target = $target || $('.datetimepicker');
      startDate = startDate || momentModule.getNow();
      $target.datetimepicker('setStartDate', startDate);
    },
    setEndDate($target, endDate) {
      const momentModule = require('momentModule');
      require('datetimepicker');
      require('datetimepicker_zhCN');
      $target = $target || $('.datetimepicker');
      endDate = endDate || momentModule.getNow();
      $target.datetimepicker('setEndDate', endDate);
    },
  },
};

module.exports = moduleExports;
