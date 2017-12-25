
import services from './services';
import utils from './utils';

//通用请求后台方法
async function request(params) {

  // if (!params.needNoMask) {
  //   $('.mask').removeClass('hide');
  // }

  const queryParams = params.queryParams;
  const formParams = params.formParams;

  if (queryParams) {
    params.url = `${params.url}?${(() => {
      const queryParamArr = [];
      for (const i in queryParams) {
        if (utils.judgeHasKey(i, queryParams)) {
          queryParamArr.push(`${i}=${utils.dealValue(queryParams[i])}`);
        }
      }
      return queryParamArr.join('&');
    })()}`;
  }

  let P = {};

  if (params.type) {
    P = {
      method: 'POST',
      mode: 'cors',
      body: (() => {
        if (formParams) {
          if (!params.headerType) {
            const paramsJson = {};
            for (const i in formParams) {
              if (utils.judgeHasKey(i, formParams)) {
                paramsJson[i] = utils.dealValue(formParams[i]);
              }
            }
            return JSON.stringify(paramsJson);
          } else if (params.headerType === 2) {
            const formParamArr = [];
            if (formParams) {
              for (const i in formParams) {
                if (utils.judgeHasKey(i, formParams)) {
                  formParamArr.push(`${i}=${utils.dealValue(formParams[i])}`);
                }
              }
            }
            return formParamArr.join('&');
          }
        }
      })(),
    };
  }

  // 11070008
  P.headers = {};
  P.headers['Client-Id'] = "304";
  P.headers['Language'] = "in";
  P.headers['Country'] = "ID";
  P.headers['Timestamp'] = new Date().getTime();

  if (!params.headerType || params.headerType === 1) {
    P.headers['Content-Type'] = 'application/json; charset=UTF-8';
  } else if (params.headerType === 2) {
    P.headers['Content-Type'] = 'application/x-www-form-urlencoded; charset=UTF-8';
  } else if (params.headerType === 3) {
    P.headers['Content-Type'] = params.headers;
  }

  const response = await fetch(params.url, P);
  if (dealHttpStatus(response)) {
    return await dealResData(response.json());
  } else {
    // if (!params.needNoMask) {
    //   $('.mask').addClass('hide');
    // }
  }
}

//处理http状态码
const dealHttpStatus = (response) => {
  if (response.status >= 200 && response.status < 300) {
    return response;
  }
  let errorMessage = '';
  switch (response.status) {
    case 402:
      // errorMessage = '登录时间过期';
      errorMessage = 'Waktu masuk kadaluarsa';
      break;
    case 403:
      // errorMessage = '访问权限错误'
      errorMessage = 'Akses yang salah';
      break;
    default:
      break;
  }
  utils.alertMessage(`${response.status}-${errorMessage}`);
  return false;
}

// 处理返回后的请求
async function dealResData(resData) {
  const data = await resData;
  // $('.mask').addClass('hide');
  if (data.message) {
    const msg = utils.getInByCode(data.code, data.message);
    utils.alertMessage(msg);
  }

  if (data.code !== 0 && data.code !== 11070012 && data.code !== 11070008) {
    return false;
  } else {
    return data;
  }
}


export default request;