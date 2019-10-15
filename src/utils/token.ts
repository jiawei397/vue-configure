import utils from 'dcv-tool';

/**
 * 设置或更新token
 */
export const setToken = (token: string | null) => {
  utils.cookie('token', token);
};

export const getToken = () => utils.cookie('token');
