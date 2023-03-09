import { IBaseState } from '@/types/store';
import { createPinia, defineStore, Store } from 'pinia';
import { Site, siteList, STAT } from '@/types';
import {
  getPropertiesSitesTimeTotal,
  getPropertySitesTotal,
  getSitePropertiesTotal
} from '@/apis/total';
import { cloudServiceObj, countryObj, deviceObj } from '@/types/response';
import { timeList } from '@/utils/time';
import { getTotalTimeHistory } from '@/apis/history';

/**
 * 初始化
 */
function init(): IBaseState {
  return {
    total: 0,
    statsCount: [],
    propertiesCount: {
      cn: [],
      us: [],
      eu: [],
      ap: []
    },
    propertyList: [],
    totalCount: [],
    historyCount: [],
    propertyHistoryIncrement: {
      cn: [],
      us: [],
      eu: [],
      ap: []
    },
    historyIncrement: []
  };
}

/**
 * 获取属性对象
 */
const propertyObj: { [key in STAT]: string[] } = {
  statUser: Object.keys(countryObj),
  statDevice: Object.keys(deviceObj),
  statCloudStorageUser: Object.keys(cloudServiceObj),
  statCloudStorageService: Object.keys(cloudServiceObj),
  statCloudStorageAmount: Object.keys(cloudServiceObj)
};

/**
 * 数组除以100
 */
function getAmount(state: STAT, list: number[]) {
  if (state === 'statCloudStorageAmount') {
    for (let i = 0; i < list.length; i++) {
      list[i] = list[i] / 100;
    }
  }
}

const startTime = timeList[0];
const timelines = timeList.slice(1);
type BaseState = { [key in STAT]: IBaseState };
interface State extends BaseState {
  rqCount: number; // 请求的接口数量
  initCount: number; // 需要初始化的接口数量
}

/**
 * 数据缓存
 */
export const useAppStore = defineStore({
  id: 'appStore',
  state: (): State => ({
    statUser: init(),
    statDevice: init(),
    statCloudStorageService: init(),
    statCloudStorageAmount: init(),
    statCloudStorageUser: init(),
    rqCount: 0,
    initCount: 0
  }),
  getters: {
    getRqCount(): number {
      return this.rqCount;
    },
    getInitCount(): number {
      return this.initCount;
    }
  },
  actions: {
    addRqCount() {
      this.rqCount++;
    },
    /**
     * 初始化所有数据,根据内容提前加载好数据
     * TODO 可能需要优化的内容，怪怪的。initCount统计初始化的接口数量
     */
    setInitData() {
      this.rqCount = 0;
      this.initCount = 0;
      const states: STAT[] = [
        'statCloudStorageAmount',
        'statCloudStorageService',
        'statCloudStorageUser',
        'statDevice',
        'statUser'
      ];
      states.forEach((stat) => {
        this.setSitesCount(stat);
        this.initCount++;
        if (stat === 'statUser') {
          return;
        } // 去除不必要的数据请求
        this.setTotalCount(stat);
        this.initCount++;
        this.setHistoryCount(stat);
        this.initCount++;
        this.setHistoryIncrement(stat);
        this.initCount++;
        siteList.forEach((site) => {
          this.setPropertyHistoryIncrement(stat, site);
          this.initCount++;
          if (stat === 'statUser') {
            return;
          } // 去除不必要的数据请求
          this.setPropertyCount(stat, site);
          this.initCount++;
        });
      });
    },
    /**
     * 总和列表
     */
    async setTotalList(stats: STAT[]) {
      for (let i = 0; i < stats.length; i++) {
        await this.setTotal(stats[i]);
      }
      return stats.map((item) => this[item].total);
    },
    /**
     * 总和
     */
    async setTotal(stat: STAT) {
      try {
        if (this[stat].total !== 0) {
          return this[stat].total;
        }
        await this.setSitesCount(stat);
        return this[stat].total;
      } catch {
        return 0;
      }
    },
    /**
     * 各个站点数据
     */
    async setSitesCount(stat: STAT) {
      try {
        if (this[stat].statsCount.length > 0) {
          return this[stat].statsCount;
        }
        const res = await getSitePropertiesTotal({
          siteIds: siteList,
          dataId: stat
        });
        if (res.error) {
          return [];
        }
        const data = res.data;
        getAmount(stat, data.yaxis);
        this[stat].total = data.yaxis.reduce(
          (prev, current) => (prev * 1000 + current * 1000) / 1000
        );
        return (this[stat].statsCount = data.yaxis);
      } finally {
        this.rqCount++;
      }
    },
    /**
     * 某个站点各个属性数据
     */
    async setPropertyCount(stat: STAT, site: Site) {
      try {
        if (this[stat].propertiesCount[site].length > 0) {
          return this[stat].propertiesCount[site];
        }
        const res = await getPropertySitesTotal({
          siteIds: [site],
          dataId: stat,
          properties: propertyObj[stat]
        });
        if (res.error) {
          return [];
        }
        getAmount(stat, res.data.yaxis);
        return (this[stat].propertiesCount[site] = res.data.yaxis);
      } finally {
        this.rqCount++;
      }
    },
    /**
     * 全球各个属性数据
     */
    async setTotalCount(stat: STAT) {
      try {
        if (this[stat].totalCount.length > 0 && this[stat].propertyList.length > 0) {
          return {
            xaxis: this[stat].propertyList,
            yaxis: this[stat].totalCount
          };
        }
        const res = await getPropertySitesTotal({
          siteIds: siteList,
          dataId: stat,
          properties: propertyObj[stat]
        });
        if (res.error) {
          return {
            xaxis: [],
            yaxis: []
          };
        }
        getAmount(stat, res.data.yaxis);
        this[stat].propertyList = res.data.xaxis;
        this[stat].totalCount = res.data.yaxis;
        return res.data;
      } finally {
        this.rqCount++;
      }
    },
    /**
     * 全球历史数据
     */
    async setHistoryCount(stat: STAT) {
      try {
        if (this[stat].historyCount.length > 0) {
          return this[stat].historyCount;
        }
        const res = await getPropertiesSitesTimeTotal({
          siteIds: siteList,
          dataId: stat,
          timelines: timeList
        });
        if (res.error) {
          return [];
        }
        getAmount(stat, res.data.yaxis);
        return (this[stat].historyCount = res.data.yaxis);
      } finally {
        this.rqCount++;
      }
    },
    /**
     * 某个站点历史增量数据
     */
    async setPropertyHistoryIncrement(stat: STAT, site: Site) {
      try {
        if (this[stat].propertyHistoryIncrement[site].length > 0) {
          return this[stat].propertyHistoryIncrement[site];
        }
        const res = await getTotalTimeHistory({
          siteIds: [site],
          dataId: stat,
          startTime: timeList[0],
          timelines: timeList.slice(1)
        });
        if (res.error) {
          return [];
        }
        getAmount(stat, res.data.yaxis);
        return (this[stat].propertyHistoryIncrement[site] = res.data.yaxis);
      } finally {
        this.rqCount++;
      }
    },
    /**
     * 全球历史增量数据
     */
    async setHistoryIncrement(stat: STAT) {
      try {
        if (this[stat].historyIncrement.length > 0) {
          return this[stat].historyIncrement;
        }
        const res = await getTotalTimeHistory({
          siteIds: siteList,
          dataId: stat,
          startTime: startTime,
          timelines: timelines
        });
        if (res.error) {
          return [];
        }
        getAmount(stat, res.data.yaxis);
        return (this[stat].historyIncrement = res.data.yaxis);
      } finally {
        this.rqCount++;
      }
    }
  }
});

// 再setup之外使用这个
export function useAppStoreWithOut(): Store {
  return useAppStore(store);
}

export const store = createPinia();
