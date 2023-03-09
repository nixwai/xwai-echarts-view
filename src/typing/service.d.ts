/** 请求的相关类型 */
declare namespace Service {
  type AxiosRequestConfig = import('axios').AxiosRequestConfig;

  /** 拦截处理 */
  interface RequestInterceptors<T, S = T> {
    /** 请求拦截处理 */
    requestInterceptor?: (
      config: AxiosRequestConfig
    ) => Promise<AxiosRequestConfig> | AxiosRequestConfig;
    /** 请求失败处理 */
    requestInterceptorCatch?: (error: FailedResult) => Promise<FailedResult> | FailedResult;
    /** 响应拦截处理 */
    responseInterceptor?: (res: T) => Promise<S> | S;
    /** 响应失败处理 */
    responseInterceptorCatch?: (error: FailedResult) => Promise<FailedResult> | FailedResult;
  }

  /** 请求属性信息 */
  interface RequestConfig<T, S = T> extends AxiosRequestConfig {
    /** 拦截处理类 */
    interceptors?: RequestInterceptors<T, S>;
  }

  /**
   * 请求的错误类型：
   * - axios: axios错误：网络错误, 请求超时, 默认的兜底错误
   * - http: 请求成功，响应的http状态码非200的错误
   * - backend: 请求成功，响应的http状态码为200，由后端定义的业务错误
   */
  type RequestErrorType = 'axios' | 'http' | 'backend';

  /** 请求错误信息 */
  interface RequestError {
    /** 请求服务的错误类型 */
    type: RequestErrorType;
    /** 错误码 */
    code: string | number;
    /** 错误信息 */
    msg: string;
  }

  /** 请求结果 */
  type RequestResult<T = any> = SuccessResult<T> | FailedResult;

  /** 自定义的请求成功结果 */
  interface SuccessResult<T = any> {
    /** 请求错误 */
    error: null;
    /** 请求数据 */
    data: T;
  }

  /** 自定义的请求失败结果 */
  interface FailedResult {
    /** 请求错误 */
    error: RequestError;
    /** 请求数据 */
    data: null;
  }

  /** mock示例接口类型：后端接口返回的数据的类型 */
  interface MockServiceResult<T = any> {
    /** 状态码 */
    code: string | number;
    /** 接口数据 */
    data: T;
    /** 接口消息 */
    message: string;
  }
}
