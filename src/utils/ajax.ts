import axios, {AxiosRequestConfig} from 'axios';
import {getToken} from './token';
import {toLicence, toLogin} from './page';

const caches: any = {};//缓存所有已经请求的Promise，同一时间重复的不再请求
let abortCaches: any = {};//记录请求的url，取消操作时使用

const getUniqueKey = (config: any) => config.url + config.method + (JSON.stringify(config.data) || '');

axios.defaults.baseURL = '/dcv-api/';

interface IConfig extends AxiosRequestConfig {
  isShowAlert?: boolean
  type?: any
  isOutFormat?: boolean
  timeout?: any
  data?: any
  params?: any
  cancelToken?: any
  url?: string | undefined
}

const getXhrResponseHeader = function (XMLHttpRequest: any, key: string) {
  let value;
  if (XMLHttpRequest.getResponseHeader) {
    value = XMLHttpRequest.getResponseHeader(key);
  } else if (XMLHttpRequest.headers && XMLHttpRequest.headers[key.toLowerCase()]) { //key值在headers里会被转为小写
    value = XMLHttpRequest.headers[key.toLowerCase()];
  }
  return value;
};

const showMessage = function (msg: string, config: IConfig) {
  if (config && config.isShowAlert === false) {
    return;
  }
  if (!msg) {
    console.error(config, 'No message available');
    return;
  }
  console.error(config, msg);
};

/**
 * 取消接口请求
 * @param uniqueKey
 */
const cancel = (uniqueKey: string) => {
  if (abortCaches[uniqueKey]) {
    abortCaches[uniqueKey].cancel('abort');
  }
};

axios.defaults.headers.post['Content-Type'] = 'application/json; charset=utf-8';

// 添加请求拦截器
axios.interceptors.request.use((config: any) => {
  const token = getToken();
  if (token) {
    config.headers.token = token;
  }
  config.headers.REQUEST_HEADER = 'binary-http-client-header';
  config.headers.language = 'zh';
  config.headers['X-Requested-With'] = 'XMLHttpRequest';//后台根据这个值判断当前属于是否浏览器调用。如果不是，返回的错误信息就是html格式，那不是我们需要的
  config.timeout = config.timeout || 2 * 60 * 1000;
  const {CancelToken} = axios;
  const source = CancelToken.source();
  config.cancelToken = source.token;
  abortCaches[getUniqueKey(config)] = source;
  return config;
}, (error: Error) => {
  // 对请求错误做些什么
  Promise.reject(error);
});

// 添加响应拦截器
axios.interceptors.response.use((response) => {
  const status = getXhrResponseHeader(response, 'ServerStatus');
  if (status === 210) { //jw 2017.07.03 token即将过期，重新刷新一下token
    // refreshToken();
  } else if (status === 402) { //license过期
    toLicence();
  } else if (status > 210 && status < 240) { //license过期状态码，211~239 license剩余1~29天
    // licenceTip(status);
  }
  const config: any = response.config;
  const result = response.data;
  if (config && (config.isOutFormat || config.url.endsWith('.json'))) { //isOutFormat忽略返回格式要求
    return result;
  }
  if (result && result.success) {
    return result.data === undefined ? result : result.data;
  }
  showMessage(result && result.message, config);
  return Promise.reject(result);
}, (error) => {
  showMessage(error.message, error.config);
  if (!error.response || error.response.status === 401) {
    for (const key in abortCaches) {
      cancel(key);
    }
    abortCaches = {};
    toLogin();
  }
  // 对响应错误做点什么
  return Promise.reject(error);
});

/**
 * 缓存请求，现一请求的拦截不再向后台发送
 */
const ajax = (config: any) => {
  const uniqueKey = getUniqueKey(config);
  if (!caches[uniqueKey]) {
    caches[uniqueKey] = axios(config);
  }
  return caches[uniqueKey].then((result: any) => {
    delete caches[uniqueKey];
    return result;
  }, (err: Error) => {
    delete caches[uniqueKey];
    throw err;
  });
};

export const get = (url: string, data: any = {}, config: any = {}) => {
  config.method = 'get';
  config.url = url;
  config.params = config.data;
  config.data = {};
  return ajax(config);
};

export const post = (url: string, data: any = {}, config: any = {}) => {
  config.method = 'post';
  config.url = url;
  config.data = data;
  return ajax(config);
};

export const upload = (url: string, data: any = {}, config: any = {}) => {
  let formData = new FormData();
  for (let key in data) {
    formData.append(key, data[key]);
  }
  return post(url, formData, config);
};

export default ajax;
