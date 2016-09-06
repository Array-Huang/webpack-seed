const avalon = require('avalon');
const cm = require('cm');
avalon.config({
  debug: true,
});
avalon.filters.insideurl = (str, urlTail) => cm.constructInsideUrl(str, urlTail);

avalon.filters.rating = function ratingFilter(str) {
  return str === '0' || str === 0 ? '暂无' : str;
};

avalon.filters.noEmpty = function noEmpty(str) {
  return !!str && str !== '' ? str : '暂无';
};

avalon.filters.isOrNot = function isOrNot(boolVal) {
  return boolVal ? '是' : '否';
};

avalon.filters.onlyDate = function onlyDate(str) {
  const matchRs = /[\d]{4}-[\d]{2}-[\d]{2}/.exec(str);
  return !!matchRs && !!matchRs[0] ? matchRs[0] : '';
};
