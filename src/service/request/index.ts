import { REQUEST_TIMEOUT } from '@/config/service';
import { AxiosRequestConfig, AxiosResponse, Method } from 'axios';
import { stringify } from 'qs';
import { handleSuccessResult, useCancelRequest } from './helpers';
import AxiosRequest from './instance';

export function createRequest(axiosConfig: AxiosRequestConfig) {
  /** 初始化请求实例 */
  const request = intRequest(axiosConfig);
  /** 取消请求 */
  const { saveRequest, delRequest, cancelRequest, cancelAllRequest } = useCancelRequest();

  /**
   * 异步promise请求
   * @param  config: 请求配置
   * @param  method: 请求方法
   */
  async function asyncRequest<T>(
    config: Service.RequestConfig<Service.SuccessResult<T>>,
    method: Method
  ) {
    saveRequest(config);
    const res = await request.handleRequest<T>({ ...config, method });
    // 删除保存的请求
    delRequest(config.url);
    return res;
  }

  /** get请求 */
  function get<T>(config: Service.RequestConfig<Service.SuccessResult<T>>) {
    // 参数格式化,转用&连接方式：json ==>>> &
    config.paramsSerializer = (params) => {
      return stringify(params, { arrayFormat: 'repeat' });
    };
    return asyncRequest<T>(config, 'GET');
  }

  /** post请求 */
  function post<T>(config: Service.RequestConfig<Service.SuccessResult<T>>) {
    return asyncRequest(config, 'POST');
  }

  /** delete请求 */
  function handleDelete<T>(config: Service.RequestConfig<Service.SuccessResult<T>>) {
    return asyncRequest(config, 'DELETE');
  }

  /** patch */
  function put<T>(config: Service.RequestConfig<Service.SuccessResult<T>>) {
    return asyncRequest(config, 'PUT');
  }

  return {
    get,
    post,
    put,
    delete: handleDelete,
    cancelAllRequest,
    cancelRequest
  };
}

/** 初始化请求实例 */
function intRequest(axiosConfig: AxiosRequestConfig) {
  const defaultConfig: Service.RequestConfig<AxiosResponse, Service.SuccessResult<any>> = {
    timeout: REQUEST_TIMEOUT,
    interceptors: {
      /** 实例请求拦截 */
      requestInterceptor: (config) => {
        return config;
      },
      /** 实例响应拦截 */
      responseInterceptor: (res) => {
        // 请求成功处理
        const resData = res.data.data === undefined ? res.data : res.data.data;
        return handleSuccessResult(resData);
      }
    }
  };
  return new AxiosRequest({
    ...defaultConfig,
    ...axiosConfig
  });
}
