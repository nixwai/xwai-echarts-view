import { mpRequest } from '@/service';
import { IPropertiesSite, IPropertiesSites, IPropertySites } from '@/types/request';
import { IXSObject, IXYObject } from '@/types/response';

/**
 * 查询各个站点的某个统计中某个属性的值
 */
export function getSiteStatistic(form: IPropertySites) {
  return mpRequest.get<IXYObject>({
    url: '/oapi/stat/statV1',
    params: form
  });
}

/**
 * 查询各个站点的某个统计中各个属性的值
 */
export function getSitePropertyStatistic(form: IPropertiesSites) {
  return mpRequest.get<IXSObject>({
    url: '/oapi/stat/statV2',
    params: form
  });
}

/**
 * 查询某个站点的某个统计中的各个属性的值
 */
export function getPropertyStatistic(form: IPropertiesSite) {
  return mpRequest.get<IXYObject>({
    url: '/oapi/stat/statV2',
    params: form
  });
}
