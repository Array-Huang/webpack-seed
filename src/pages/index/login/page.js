require('lessDir/base.less');
require('./page.less');

window.switchToPage = (page) => {
  switch (page) {
    case 'login':
      $('#user-edit-password').hide();
      $('#login-box').show();
      break;

    case 'forget-password':
      $('#login-box').hide();
      $('#user-edit-password').show();
      break;

    default:
  }
};

$(() => {

});
