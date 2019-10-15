import utils, { util } from 'dcv-tool';
import { setToken } from './token';
import { post } from './ajax';

/**
 * 登出
 */
export function logout () {
  return post('user/oauth/logout');
}

const urls = {
    login: process.env.VUE_APP_LOGIN_URL,
    license: process.env.VUE_APP_LICENSE_URL,
};
/**
 * 跳转到登陆页
 */
export const toLogin = () => {
    let curLocation = location.href;
    const arr = urls.login.split('/');
    const name = arr[arr.length - 1];
    if (curLocation.includes(name)) {
        return;
    }
    const callback = () => {
        setToken(null);
        utils.data('userInfo', null);
        sessionStorage.clear();
        curLocation = encodeURIComponent(curLocation);
        window.location.href = `${urls.login}?beforeUrl=${curLocation}`;
    };
    logout().then(callback, callback);
};

export const toLicence = () => {
    util.delay(() => {
        window.location.href = urls.license;
    }, 10);
};
