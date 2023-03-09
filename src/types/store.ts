export interface IBaseState {
  total: number;
  statsCount: number[];
  propertiesCount: {
    cn: number[];
    us: number[];
    eu: number[];
    ap: number[];
  };
  propertyList: string[];
  totalCount: number[];
  historyCount: number[];
  propertyHistoryIncrement: {
    cn: number[];
    us: number[];
    eu: number[];
    ap: number[];
  };
  historyIncrement: number[];
}
