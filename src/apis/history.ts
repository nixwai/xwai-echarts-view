import { mpRequest } from '@/service';
import {
  IPropertiesSitesTimes,
  IPropertyHistory,
  ISiteHistory,
  ITotalHistory
} from '@/types/request';
import { IXSObject, IXYObject } from '@/types/response';

/**
 * 查询某个统计中的同一属性各个站点累加值的历史变化
 */
export function getTotalHistory(form: ITotalHistory) {
  return mpRequest.get<IXSObject>({
    url: '/oapi/stat/statST',
    params: form
  });
}

/**
 * 查询某个站点的某个统计中的某个属性的历史变化
 */
export function getPropertyHistory(form: IPropertyHistory) {
  return mpRequest.get<IXYObject>({
    url: '/oapi/stat/statT1',
    params: form
  });
}

/**
 * 查询某个站点的某个统计中的各个属性的历史变化
 */
export function getSiteHistory(form: ISiteHistory) {
  return mpRequest.get<IXSObject>({
    url: '/oapi/stat/statT1',
    params: form
  });
}

/**
 * 查询某个统计中的所有站点所有属性累加值的增量值
 */
export function getTotalTimeHistory(form: IPropertiesSitesTimes) {
  return mpRequest.get<IXYObject>({
    url: '/oapi/stat/statMT3',
    params: form
  });
}
