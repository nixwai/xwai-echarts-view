import axios, { Canceler, AxiosRequestConfig } from 'axios';

/** 返回失败的请求结果的数据类型 */
export function handleFailedResult(error: Service.RequestError) {
  const fail: Service.FailedResult = {
    error,
    data: null
  };
  return fail;
}

/** 返回成功的请求结果的数据类型 */
export function handleSuccessResult<T = any>(data: T) {
  const success: Service.SuccessResult<T> = {
    error: null,
    data
  };
  return success;
}

/** 取消请求 */
export function useCancelRequest() {
  /** 存放接口取消方法的集合 */
  const cancelRequestSourceMap: Map<string, Canceler> = new Map();

  /** 保存请求 */
  function saveRequest(config: AxiosRequestConfig) {
    const url = config.url;
    // url存在保存取消请求方法和当前请求url
    if (url) {
      config.cancelToken = new axios.CancelToken((c) => {
        cancelRequestSourceMap.set(url, c);
      });
    }
  }

  /**
   * 删除保存请求
   * @param {string} url
   */
  function delRequest(url: string | undefined) {
    if (url) {
      cancelRequestSourceMap.delete(url);
    }
  }

  /** 取消全部请求 */
  function cancelAllRequest() {
    for (const url in cancelRequestSourceMap) {
      cancelRequestSourceMap.get(url)?.();
    }
  }

  /**
   * @description: 取消请求
   * @param {string|string[]} url
   */
  function cancelRequest(url: string | string[], message?: string) {
    if (typeof url === 'string') {
      // 取消单个请求
      cancelRequestSourceMap.get(url)?.(message);
    } else {
      // 取消多个请求
      url.forEach((u) => {
        cancelRequestSourceMap.get(u)?.();
      });
    }
  }

  return {
    /** 保存请求 */
    saveRequest,
    /** 删除请求 */
    delRequest,
    /** 取消请求 */
    cancelRequest,
    /** 取消全部请求 */
    cancelAllRequest
  };
}
