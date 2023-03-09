import axios, { AxiosResponse, type AxiosError } from 'axios';
import type { AxiosInstance } from 'axios';
import { handleResponseError, handleBackendError } from './error';
import { transformResponseData } from './transform';
import { handleFailedResult } from './helpers';

class AxiosRequest {
  /** axios实例 */
  private instance: AxiosInstance;
  /** 实例拦截器 */
  private interceptors?: Service.RequestInterceptors<AxiosResponse, Service.SuccessResult>;

  constructor(config: Service.RequestConfig<AxiosResponse, Service.SuccessResult>) {
    // 初始化
    this.instance = axios.create({
      validateStatus: (status) => {
        return (status >= 200 && status < 300) || status === 304;
      },
      ...config
    });
    this.interceptors = config.interceptors;
    this.setInterceptor();
  }

  /** 设置拦截器 */
  private setInterceptor() {
    // 设置共用类请求拦截器
    this.instance.interceptors.request.use(
      (config) => {
        return config;
      },
      (axiosError: AxiosError) => {
        // 处理请求失败错误
        const error = handleResponseError(axiosError);
        throw handleFailedResult(error);
      }
    );

    // 设置共用类响应拦截器
    this.instance.interceptors.response.use(
      async (response) => {
        // 处理后端返回的错误
        const data = await transformResponseData(response);
        const code = data?.code;
        if (code && code !== 200) {
          const error = handleBackendError({ ...response, data });
          throw handleFailedResult(error);
        }
        return response;
      },
      (axiosError: AxiosError) => {
        // 处理响应失败的错误
        const error = handleResponseError(axiosError);
        throw handleFailedResult(error);
      }
    );

    // 拦截器，为实例化的request对象中拦截器
    this.instance.interceptors.request.use(
      this.interceptors?.requestInterceptor,
      this.interceptors?.requestInterceptorCatch
    );
    this.instance.interceptors.response.use(
      this.interceptors?.responseInterceptor,
      this.interceptors?.responseInterceptorCatch
    );
  }

  /** 发送请求函数 */
  handleRequest<T>(
    config: Service.RequestConfig<Service.SuccessResult<T>>
  ): Promise<Service.RequestResult<T>> {
    return new Promise(async (resolve) => {
      // 单独的请求处理,从请求的方法中传入
      if (config.interceptors?.requestInterceptor) {
        config = await config.interceptors.requestInterceptor(config);
      }

      // 发送请求
      this.instance
        .request<any, Service.SuccessResult<T>>(config)
        .then(async (res: Service.SuccessResult<T>) => {
          // 单独的响应成功处理,从请求的方法中传入
          if (config.interceptors?.responseInterceptor) {
            config = await config.interceptors.responseInterceptor(res);
          }
          resolve(res);
        })
        .catch(async (err: Service.FailedResult) => {
          // 实例中抛出的错误会来到这里
          // 单独的响应错误处理,从请求的方法中传入
          if (config.interceptors?.responseInterceptorCatch) {
            config = await config.interceptors.responseInterceptorCatch(err);
          }
          window.console.warn(err.error.code, err.error.msg);
          resolve(err);
        });
    });
  }
}

export default AxiosRequest;
