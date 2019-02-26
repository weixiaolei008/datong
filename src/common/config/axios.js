import axios from 'axios';
import md5 from 'js-md5';
import {Message} from 'element-ui';
import {sSet,sGet,exportUrl} from './utils';

axios.defaults.baseURL = exportUrl;

const service = axios.create({
  withCredentials: true,
  timeout: 60000,
  headers: {
    'X-Requested-With': 'XMLHttpRequest',
    'Content-Type': 'application/json; charset=UTF-8'
  },
})

service.interceptors.request.use(
  config => {
    // sign 加密
    config.data = sign(config.data);
    return config
  },
  error => {
    // Do something with request error
    console.log(error) // for debug
    Promise.reject(error)
  }
)

// response interceptor
service.interceptors.response.use(
  response => {
    const res = response.data;
    if(res.repCode == '0000'){
      return res
    }
    else if(res.repCode == '0104'){
      Message.error({
        message: '登录过期',
        duration: 1000,
        onClose: function () {
          sessionStorage.clear();
          window.location.reload();
        }
      })
    }
    else{
      Message({
        message: res.repMsg,
        type: 'error',
        duration: 3 * 1000
      })

      return res
    }
  },
  error => {
    if(error.response == undefined){
      Message({
        message: '网络连接超时，请刷新重试',
        type: 'error',
        duration: 5 * 1000
      })
      return res;
    }
    let backError = error.response.data;
    Message({
      message: '失败原因：' + backError.repCode + '--' + backError.repMsg,
      type: 'error',
      duration: 3 * 1000
    })
    return Promise.reject(backError)
  }
)

export function sign(data) {
  let token = '';
  let user = sGet('_WHUser');
  let time = new Date().getTime();
  if (user == '' || user == undefined) {
    token = '';
  }
  else {
    token = user.token;
  }

  var arr = [];
  for (var item in data) {
    arr.push(item);
  }
  var paramsObj = {};
  for (var i = 0; i < arr.length; i++) {
    var key = arr[i];
    var value = data[key];
    paramsObj[key] = value;
  }
  // 签名校验
  var cr = {
    token: token,
    time: time,
    reqData: JSON.stringify(paramsObj)
  };
  // 排序key
  var keyArr = [];
  for (var item in cr) {
    if (item != "sign") {
      keyArr.push(item);
    }
  }
  keyArr.sort();
  // 生成加密
  var content = "";
  for (var i = 0; i < keyArr.length; i++) {
    var key = keyArr[i];
    var value = cr[key];
    content += key + value;
  }
  var signData = {
    token: token,
    time: time,
    reqData: paramsObj,
    sign: md5(content)
  }
  return signData;
}

export default service
