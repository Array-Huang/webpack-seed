const content = require('./content.ejs');
const layout = require('layout');
const pageTitle = '修改密码';
module.exports = layout.init({ pageTitle }).run(content({ pageTitle }));
