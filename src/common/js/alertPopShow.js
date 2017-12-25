
function webToast() {
  // 默认设置
  const dcfg = {
    msg: '提示信息',
    postion: 'top', // 展示位置，可能值：bottom,top,middle,默认top：是因为在mobile web环境下，输入法在底部会遮挡toast提示框
    time: 3000, // 展示时间
  };
  //* ********************以下为参数处理******************
  const len = arguments.length;
  const arg0 = arguments[0];
  if (arguments.length > 0) {
    dcfg.msg = arguments[0];
    dcfg.msg = arg0;

    const arg1 = arguments[1];
    const regx = /(bottom|top|middle)/i;
    var numRegx = /[1-9]\d*/;
    if (regx.test(arg1)) {
      dcfg.postion = arg1;
    } else if (numRegx.test(arg1)) {
      dcfg.time = arg1;
    }

    const arg2 = arguments[2];
    var numRegx = /[1-9]\d*/;
    if (numRegx.test(arg2)) {
      dcfg.time = arg2;
    }
  }
  //* ********************以上为参数处理******************
  let ret = `<div class='web_toast f-size'><div class='cx_mask_transparent'></div>${dcfg.msg}</div>`;
  if ($('.web_toast').length <= 0) {
    $('body').append(ret);
  } else { // 如果页面有web_toast 先清除之前的样式
    $('.web_toast').css('left', '');

    ret = `<div class='cx_mask_transparent'></div>${dcfg.msg}`;
    $('.web_toast').html(ret);
  }
  let w = $('.web_toast').width(),
    ww = $(window).width();
  $('.web_toast').fadeIn();
  $('.web_toast').css('left', (ww - w) / 2 - 20);
  if (dcfg.postion == 'bottom') {
    $('.web_toast').css('bottom', 50);
    $('.web_toast').css('top', '');// 这里为什么要置空，自己琢磨，我就不告诉
  } else if (dcfg.postion == 'top') {
    $('.web_toast').css('bottom', '');
    $('.web_toast').css('top', 50);
  } else if (dcfg.postion == 'middle') {
    $('.web_toast').css('bottom', '');
    $('.web_toast').css('top', '');
    let h = $('.web_toast').height(),
      hh = $(window).height();
    $('.web_toast').css('bottom', (hh - h) / 2 - 20);
  }
  setTimeout(() => {
    $('.web_toast').fadeOut();
  }, dcfg.time);
}

export default webToast;
