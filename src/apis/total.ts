import { mpRequest } from '@/service';
import { IPropertiesSites, IPropertiesSitesTime, IStatsDataTotal } from '@/types/request';
import { IXSObject, IXYObject } from '@/types/response';

enum TotalApi {
  SSV = '/oapi/stat/statSSV',
  SSVext = '/oapi/stat/statSSVext',
  STPV = '/oapi/stat/statSTPV',
  STSPV = '/oapi/stat/statSTSPV',
  STVT = '/oapi/stat/statVT'
}

/**
 * 查询某个统计中的同一站点各个属性累加值
 */
export function getSitePropertiesTotal(form: IPropertiesSites) {
  return mpRequest.get<IXYObject>({
    url: '/oapi/stat/statSPV',
    params: form
  });
}

/**
 * 查询某个统计中的同一属性各个站点累加值
 */
export function getPropertySitesTotal(form: IPropertiesSites) {
  return mpRequest.get<IXYObject>({
    url: TotalApi.SSV,
    params: form,
    interceptors: {
      responseInterceptor: (res) => {
        if (!res.error && form.dataId === 'statUser') {
          const xList: string[] = [];
          res.data.yaxis = res.data.yaxis.filter((item, index) => {
            if (item !== 0) {
              xList.push(res.data.xaxis[index]);
              return true;
            }
            return false;
          });
          res.data.xaxis = xList;
        }
        return res;
      }
    }
  });
}

/**
 * 查询某个统计中的同一属性各个站点累加值2
 */
export function getPropertySitesTotal2(form: IPropertiesSites) {
  const newForm = {
    dataId: form.dataId,
    endTime: form.endTime,
    siteIds: form.siteIds.join(','),
    properties: form.properties?.join(',')
  };
  return mpRequest.get<IXYObject>({
    url: TotalApi.SSVext,
    params: newForm
  });
}

/**
 * 查询某个统计中的同一站点各个属性时间累加值
 */
export function getPropertySitesTimeTotal(form: IPropertiesSitesTime) {
  return mpRequest.get<IXSObject>({
    url: TotalApi.STPV,
    params: form
  });
}

/**
 * 查询某个统计中的各一站点各个属性时间累加值
 */
export function getPropertiesSitesTimeTotal(form: IPropertiesSitesTime) {
  return mpRequest.get<IXYObject>({
    url: TotalApi.STSPV,
    params: form
  });
}

/**
 * 查询各个统计指标的总值
 */
export function getSitesDataTotal(form: IStatsDataTotal) {
  return mpRequest.get<IXYObject>({
    url: TotalApi.STVT,
    params: form
  });
}
