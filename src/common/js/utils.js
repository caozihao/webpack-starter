import webToast from './alertPopShow';
import config from '../../config';

const utils = {
  judgeHasKey: (key, obj) => {
    return Object.prototype.hasOwnProperty.call(obj, key) && obj.hasOwnProperty(key) !== 'undefined';
  },
  dealValue: (value) => {
    // 如果是字符串，去掉前后空格
    if (Object.prototype.toString.call(value) === '[object String]') {
      return value.replace(/(^\s*)|(\s*$)/g, '');
    } else {
      return value;
    }
  },
  alertMessage: (message) => {
    webToast(message, "bottom", 2000);
  },
  setTimer: (params) => {
    let { clickBtn, clickBtnText, selectTimeValue, downBack } = params;
    var clickMeBtn = document.getElementById(clickBtn);
    var ifLoading = false;
    var timer = {};

    //还没开始
    if (!ifLoading) {
      ifLoading = true;
      clickMeBtn.disabled = true;
      clickMeBtn.innerHTML = `${selectTimeValue}s`;
      timer = setInterval(function () {
        if (!selectTimeValue) {
          init();
          downBack();
          window.clearTimeout(timer);
        } else {
          selectTimeValue--;
          clickMeBtn.innerHTML = `${selectTimeValue}s`;
        }
      }, 1000);
    }

    function init() {
      clickMeBtn.disabled = false;
      clickMeBtn.innerHTML = `${clickBtnText}s`;
      ifLoading = false;
    }
  },
  judgeDevice: () => {
    var u = navigator.userAgent;
    var isAndroid = u.indexOf('Android') > -1 || u.indexOf('Adr') > -1; //android终端
    var isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端

    if (isAndroid) {
      return "Android";
    }

    if (isiOS) {
      return "iOS";
    }
  },
  getInByCode: (code, msg) => {
    switch (code) {
      case 11070008:
        // 服务器正忙，请稍后重试
        msg = 'Server sibuk, silahkan coba lagi nanti';
        break;
      case 11070009:
        // 用户已存在
        msg = 'Pengguna sudah ada';
        break;
      case 11070011:
        // 图形验证码错误
        msg = 'Kode verifikasi gambar buruk';
        break;
      case 11070012:
        // 短信超过限制，请输入验证码
        msg = 'SMS melebihi batas, masukkan kode verifikasi';
        break;
      case 11070002:
        // 系统内部错误
        msg = 'Kesalahan internal sistem';
        break;
    }
    return msg;
  }
}

config.CONSOLE_LOG_ENABLE ? '' : console.log = () => { }

export default utils;