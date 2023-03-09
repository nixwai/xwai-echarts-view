export enum ServerHttpCode {
  /**
   * 请求正常
   */
  OK = 0,
  /**
   * 请求错误
   */
  INTERNAT_ERROR = 500
}

/**
 * 返回数据的基本结构
 */
export interface ServerResponse<T> {
  code: number;
  data: T;
  msg: string;
}

/**
 * 站点
 */
export type Site = 'cn' | 'us' | 'eu' | 'ap';
export const siteList: Site[] = ['cn', 'us', 'eu', 'ap'];
export const siteObj = {
  cn: '中国',
  us: '美国',
  eu: '欧洲',
  ap: '亚太'
};
export const siteNames = Object.values(siteObj);

/**
 * 目标
 */
export type STAT =
  | 'statCloudStorageService' // 云存储购买数
  | 'statCloudStorageAmount' // 云存储购总额
  | 'statCloudStorageUser' // 云存储购买用户数
  | 'statDevice' // 设备总数
  | 'statUser'; // 用户总数
