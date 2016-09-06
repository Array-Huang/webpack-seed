const content = require('./content.ejs');
const layout = require('layout');
const pageTitle = '消息通知';
module.exports = layout.init({ pageTitle }).run(content({ pageTitle }));
