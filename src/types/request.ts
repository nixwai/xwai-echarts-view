import { STAT, Site } from '.';

interface IBaseForm {
  dataId: STAT;
  endTime?: number; // 不传默认当前时间
}

/**
 * 统计总值
 */
export interface IStatsDataTotal {
  siteIds: Site[];
  dataIds: string[];
}

/**
 * 多站点多属性
 */
export interface IPropertiesSites extends IBaseForm {
  siteIds: Site[];
  properties?: string[];
}

/**
 * 某个站点某个属性
 */
export interface IPropertySite extends IBaseForm {
  siteId: Site;
  property: string;
}

/**
 * 多属性站点
 */
export interface IPropertiesSite extends IBaseForm {
  siteId: Site[];
  properties: string[];
}

/**
 * 多站点属性
 */
export interface IPropertySites extends IBaseForm {
  siteIds: Site[];
  property: string[];
}

/**
 * 查询时间线统计变化
 */
export interface IPropertiesSitesTime extends IPropertiesSites {
  timelines: number[];
}

/**
 * 插询时间线分割统计变化
 */
export interface IPropertiesSitesTimes extends IPropertiesSitesTime {
  startTime: number;
}

/**
 * 查询累加值历史变化
 */
export interface ITotalHistory extends IPropertiesSites {
  beginTime: number;
  endTime: number;
  duration: number;
}

/**
 * 查询某个站点某个属性历史变化
 */
export interface IPropertyHistory extends IPropertySite {
  beginTime: number;
  endTime: number;
}

/**
 * 查询某个站点各个属性历史变化
 */
export interface ISiteHistory extends IPropertiesSite {
  beginTime: number;
  endTime: number;
}
