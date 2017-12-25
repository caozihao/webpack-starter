import config from '../../config';

const services = {

  // 用户密码登录(h5)
  login_by_password: `${config.IDN_HOST}/web/login_by_password`,

  // 用户验证码登录(h5)
  login_by_code: `${config.IDN_HOST}/web/login_by_code`,

  // 手机，密码登录
  register: `${config.IDN_HOST}/web/register`,

  // 用户注册(h5)
  register_by_mobile: `${config.IDN_HOST}/user/register_by_mobile`,

  // 发送注册短信验证码(h5)
  send_register_code: `${config.IDN_HOST}/web/send_register_code`,

  // 发送图形验证码(h5)
  send_graph_code: `${config.IDN_HOST}/web/send_graph_code`,

}

export default services;