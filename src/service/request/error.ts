import {
  DEFAULT_REQUEST_ERROR_CODE,
  DEFAULT_REQUEST_ERROR_MSG,
  NETWORK_ERROR_CODE,
  NETWORK_ERROR_MSG,
  REQUEST_TIMEOUT_CODE,
  REQUEST_TIMEOUT_MSG,
  ErrorStatus,
  ERROR_STATUS,
  NO_ERROR_MSG_CODE,
  CANCEL_REQUEST_CODE,
  CANCEL_REQUEST_MSG
} from '@/config/service';
import { exeStrategyActions, StrategyAction } from '@/utils/common/designPattern';
import axios, { AxiosError } from 'axios';

/**
 * 处理axios请求失败的错误
 * @param axiosError - 错误
 */
export function handleResponseError(axiosError: AxiosError) {
  const error: Service.RequestError = {
    type: 'axios',
    code: DEFAULT_REQUEST_ERROR_CODE,
    msg: DEFAULT_REQUEST_ERROR_MSG
  };
  const actions: StrategyAction[] = [
    [
      // 网路错误
      !window.navigator.onLine || axiosError.message === 'Network Error',
      () => {
        Object.assign(error, { code: NETWORK_ERROR_CODE, msg: NETWORK_ERROR_MSG });
        window.alert(error.msg);
      }
    ],
    [
      // 超时错误
      axiosError.code === REQUEST_TIMEOUT_CODE && axiosError.message.includes('timeout'),
      () => {
        Object.assign(error, { code: REQUEST_TIMEOUT_CODE, msg: REQUEST_TIMEOUT_MSG });
        window.alert(error.msg);
      }
    ],
    [
      // 取消请求
      axios.isCancel(axiosError),
      () => {
        Object.assign(error, { code: CANCEL_REQUEST_CODE, msg: CANCEL_REQUEST_MSG });
        if (axiosError.message) {
          window.alert(axiosError.message);
        }
      }
    ],
    [
      // 请求不成功的错误
      Boolean(axiosError.response),
      () => {
        const errorCode: ErrorStatus = (axiosError.response?.status as ErrorStatus) || 'DEFAULT';
        const msg = ERROR_STATUS[errorCode];
        Object.assign(error, { type: 'http', code: errorCode, msg });
        window.alert(msg);
      }
    ]
  ];
  exeStrategyActions(actions);
  return error;
}

/**
 * 处理后端返回的错误(业务错误)
 * @param backendResult - 后端接口的响应数据
 */
export function handleBackendError(backendResult: Record<string, any>) {
  const data = backendResult.data;
  const code = data.code ?? data.statusCode ?? data.redCode;
  const message = data.message ?? data.resMsg ?? DEFAULT_REQUEST_ERROR_MSG + code;
  const error: Service.RequestError = {
    type: 'backend',
    code: code,
    msg: message
  };
  const actions: StrategyAction[] = [
    [
      // 其他错误信息抛出
      !NO_ERROR_MSG_CODE.includes(code),
      () => {
        window.alert(message);
      }
    ]
  ];
  exeStrategyActions(actions);
  return error;
}
