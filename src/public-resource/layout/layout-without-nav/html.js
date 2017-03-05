const config = require('configModule');
const noJquery = require('withoutJqueryModule');
const layout = require('./html.ejs');
const header = require('../../components/header/html.ejs');
const footer = require('../../components/footer/html.ejs');

const pf = {
  pageTitle: '',
  constructInsideUrl: noJquery.constructInsideUrl,
};

const moduleExports = {
  init({ pageTitle }) {
    pf.pageTitle = pageTitle;
    return this;
  },
  run(content) {
    const componentRenderData = Object.assign({}, config, pf);
    const renderData = {
      header: header(componentRenderData),
      footer: footer(componentRenderData),
      content,
    };
    return layout(renderData);
  },
};

module.exports = moduleExports;
