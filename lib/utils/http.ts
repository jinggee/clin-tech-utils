/* eslint-disable prefer-promise-reject-errors */
import Axios, { AxiosRequestConfig, AxiosResponse } from 'axios';
import { download } from './index';

const defaultConfig = {
  baseURL: '/ajax',
  timeout: 15000,
  withCredentials: true,
  validateStatus(status) {
    return status >= 200 && status <= 500;
  },
}
const createAxios = function (config: AxiosRequestConfig & {error?:Function} = defaultConfig){
  const http = Axios.create(config);

  function requestInterceptor(config: AxiosRequestConfig) {
    return config;
  }
  
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  function requestErrorInterceptor(error: any) {
    if(config.error) {
      config.error(error);
    }
    return Promise.reject(error);
  }
  
  async function responseInterceptor(response: AxiosResponse<XingrenResponse<object>>) {
    // eslint-disable-next-line prefer-const
    let { data, headers } = response;
    if (data instanceof Blob) {
      if (data.type === 'application/json' || (response as unknown as { type: string }).type === 'application/json') {
        const jsonStr = await data.text();
        data = JSON.parse(jsonStr);
      } else {
        let filename = headers['content-disposition'];
        if (filename) {
          filename = filename.substring(filename.indexOf('filename=') + 9);
          filename = decodeURI(escape(filename));
        }
        download(data, filename);
        return response;
      }
    }
    const { success } = data;
    if (success) {
      return response;
    }
    return Promise.reject(data);
  }
  
  function responseErrorInterceptor(error: { isAxiosError?: boolean; message?: string }) {
    if (Axios.isCancel(error)) {
      return Promise.reject({ message: 'cancel request' });
    }
    if (error.isAxiosError) {
      return Promise.reject({ ...error, errMessage: error.message });
    }
    return Promise.reject({ ...error, errMessage: '服务异常，请稍后尝试！' });
  }
  http.interceptors.request.use(requestInterceptor, requestErrorInterceptor);
  http.interceptors.response.use(responseInterceptor, responseErrorInterceptor);  
};

const http = createAxios();

export { createAxios, http };
