import { blobToString } from '@/utils/file';
import { AxiosResponse } from 'axios';

/**
 * 返回的数据转化
 * @param response 返回的数据
 */
export function transformResponseData(response: AxiosResponse): Promise<any> {
  return new Promise(async (resolve) => {
    if (response.config.responseType === 'blob') {
      const data = await blobToString(response.data);
      if (data) {
        try {
          const obj = JSON.parse(data);
          resolve(obj);
        } catch {
          resolve(response.data);
        }
      }
    }
    resolve(response.data);
  });
}
