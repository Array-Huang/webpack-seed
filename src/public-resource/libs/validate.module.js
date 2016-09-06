const judge = require('judgejs');
const moduleExports = {
  /**
   * 判断手机号
   */
  isPhoneNumber(str) {
    return judge.phoneNumber(str);
  },
  /* 判断是否电子邮箱地址 */
  isEmail(str) {
    return judge.email(str);
  },
  /**
   * 是否是数字
   */
  isNumber(str) {
    // js自带判断方法
    return !isNaN(str);
  },
  /**
   * 是否是数字、字母、下划线
   */
  isNomalText(str) {
    var regex = /^[^_][A-Za-z]*[a-z0-9_]*$/;
    return regex.test(str);
  },

  /**
   * 是否车牌号码
   */
  isCarNumber(str) {
    var reg = /^[\u4e00-\u9fa5]{1}[A-Za-z]{1}[A-Za-z0-9]{5}$/;
    return reg.test(str);
  },

  /**
   * 是否银行卡号
   */
  isCreditCardNumber(str) {
    var reg = /^[\d]{16}|[\d]{19}$/;
    return reg.test(str);
  },

  /* 是否符合密码规则，重要！！！！！ */
  isPassword(str) {
    var reg = /^[\da-zA-Z]{6,20}$/;
    return reg.test(str);
  },

  /* 是否符合短信验证码规则，重要！！！！！ */
  isMessageValidCode(str) {
    var reg = /^\d{6}$/;
    return reg.test(str);
  },

  /* 判断存在性 */
  isExist(str) {
    return judge.isExist(str);
  },

  isAllExist(arr) {
    for (let i = 0; i < arr.length; i ++) {
      if (!judge.isExist(arr[i])) {
        return false;
      }
    }

    return true;
  },

  /* 判断一个值是否是有效的车厢尺寸(米) */
  isCarSize(val) {
    if (!moduleExports.isNumber(val)) return false;
    if (val <= 0 || val > 50) return false;  // 不可能有超过50米的货车，应该超过50的应该就是算错单位了
    return true;
  },
};
// console.log(judge);
module.exports = moduleExports;
