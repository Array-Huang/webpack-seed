const config = require('configModule');
const content = require('./templates/main.ejs');
const layout = require('layout-without-nav');
const dirsConfig = config.DIRS;

const loginBoxHtml = require('./templates/login-box.html');
const forgetPasswordHtml = require('./templates/forget-password-box.html');
const renderData = Object.assign(dirsConfig, { loginBoxHtml, forgetPasswordHtml });

module.exports = layout.init({
  pageTitle: '',
}).run(content(renderData));
