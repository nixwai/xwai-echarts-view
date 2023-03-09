export interface IXYObject {
  xaxis: string[];
  yaxis: number[];
}

export interface IXSObject {
  xaxis: string[];
  series: {
    [keys: string]: number[];
  };
}

/**
 * 云存储购买数属性说明
 */
export const cloudServiceObj = {
  'super-ai-year  ': '30天循环存储\n高级年度套餐',
  'basic-ai-year  ': '7天循环存储\n高级年度套餐',
  'super-ai-month ': '30天循环存储\n高级月度套餐',
  'basic-ai-month ': '7天循环存储\n高级月度套餐',
  'super-year': '30天循环存储\n基础年度套餐',
  'basic-year': '7天循环存储\n基础年度套餐',
  'super-month': '30天循环存储\n基础月度套餐',
  'basic-month': '7天循环存储\n基础月度套餐',
  'basic-ai-trial ': '7天循环存储\n基础试用套餐'
};

/**
 * 设备说明
 */
export const deviceObj = {
  '010801': 'EX',
  '010701': 'Gateway',
  '011001': 'Home Station',
  '011002': 'Mini Station',
  '010409': 'Keypad',
  '010802': 'EX Pro',
  '010329': 'X1-Lite',
  '010408': 'Motion Detector ',
  '010320': 'X1',
  '010324': 'Capsule CCS-B',
  '010407': 'SmartButton',
  '010501': 'Sentry',
  '011101': 'EX Battery',
  '010601': 'Aegis',
  '010401': 'Door Sensor',
  '010325': 'Capsule CC-CD',
  '010901': 'Sentry Battery',
  '010330': 'XC Connect',
  '010334': 'X1-GS',
  '010402': 'Doorbell Button',
  '010326': 'X1 Lite Connect',
  '010333': 'XC'
};

/**
 * 国家
 */
export const countryObj: { [x: string]: string } = {
  other: '其他',
  AD: '安道尔',
  AE: '阿拉伯联合酋长国',
  AF: '阿富汗',
  AG: '安提瓜岛和巴布达',
  AI: '安圭拉岛',
  AL: '阿尔巴尼亚',
  AM: '亚美尼亚',
  AN: '荷属安的列斯群岛',
  AO: '安哥拉',
  AQ: '南极洲',
  AR: '阿根廷',
  AS: '美属萨摩亚',
  AT: '奥地利',
  AU: '澳大利亚',
  AW: '阿鲁巴岛',
  AZ: '阿塞拜疆',
  BA: '波斯尼亚和黑塞哥维那',
  BB: '巴巴多斯',
  BD: '孟加拉国',
  BE: '比利时',
  BF: '布吉纳法索',
  BG: '保加利亚',
  BH: '巴林',
  BI: '布隆迪',
  BJ: '贝宁',
  BM: '百慕大',
  BN: '文莱达鲁萨兰国',
  BO: '玻利维亚',
  BR: '巴西',
  BS: '巴哈马群岛',
  BT: '不丹',
  BV: '布维岛',
  BW: '博茨瓦纳',
  BY: '白俄罗斯',
  BZ: '伯利兹',
  CA: '加拿大',
  CC: '科科斯（基林）群岛',
  CD: '刚果民主共和国',
  CF: '中非共和国',
  CG: '刚果',
  CH: '瑞士',
  CI: '科特迪瓦',
  CK: '库克群岛',
  CL: '智利',
  CM: '喀麦隆',
  CN: '中国',
  CO: '哥伦比亚',
  CR: '哥斯达黎加',
  CU: '古巴',
  CV: '佛得角',
  CX: '圣诞岛',
  CY: '塞浦路斯',
  CZ: '捷克共和国',
  DE: '德国',
  DJ: '吉布提',
  DK: '丹麦',
  DM: '多米尼加',
  DO: '多米尼加共和国',
  DZ: '阿尔及利亚',
  EC: '厄瓜多尔',
  EE: '爱沙尼亚',
  EG: '埃及',
  EH: '西撒哈拉',
  ER: '厄立特里亚',
  ES: '西班牙',
  ET: '埃塞俄比亚',
  FI: '芬兰',
  FJ: '斐济',
  FK: '福克兰群岛(马尔维纳斯)',
  FM: '密克罗尼西亚联邦',
  FO: '法罗群岛',
  FR: '法国',
  GA: '加蓬',
  GB: '英国',
  GD: '格林纳达',
  GE: '格鲁吉亚',
  GF: '法属圭亚那',
  GH: '加纳',
  GI: '直布罗陀',
  GL: '格陵兰岛',
  GM: '冈比亚',
  GN: '几内亚',
  GP: '瓜德罗普岛',
  GQ: '赤道几内亚',
  GR: '希腊',
  GS: '南乔治亚岛和南桑威奇群岛',
  GT: '危地马拉',
  GU: '关岛',
  GW: '几内亚比绍',
  GY: '圭亚那',
  HK: '香港',
  HN: '洪都拉斯',
  HR: '克罗地亚',
  HT: '海地',
  HU: '匈牙利',
  ID: '印尼',
  IE: '爱尔兰',
  IL: '以色列',
  IN: '印度',
  IO: '英属印度洋领地',
  IQ: '伊拉克',
  IR: '伊朗伊斯兰共和国',
  IS: '冰岛',
  IT: '意大利',
  JM: '牙买加',
  JO: '约旦',
  JP: '日本',
  KE: '肯尼亚',
  KG: '吉尔吉斯斯坦',
  KH: '柬埔寨',
  KI: '基里巴斯',
  KM: '科摩罗',
  KN: '圣基茨和尼维斯',
  KP: '朝鲜',
  KR: '韩国',
  KW: '科威特',
  KY: '开曼群岛',
  KZ: '哈萨克斯坦',
  LA: '老挝人民民主共和国',
  LB: '黎巴嫩',
  LC: '圣卢西亚岛',
  LI: '列支敦斯登',
  LK: '斯里兰卡',
  LR: '利比里亚',
  LS: '莱索托',
  LT: '立陶宛',
  LU: '卢森堡',
  LV: '拉脱维亚',
  LY: '阿拉伯利比亚民众国',
  MA: '摩洛哥',
  MC: '摩纳哥',
  MD: '摩尔多瓦共和国',
  ME: '黑山',
  MG: '马达加斯加',
  MH: '马绍尔群岛',
  MK: '前南斯拉夫马其顿共和国',
  ML: '马里',
  MM: '缅甸',
  MN: '蒙古',
  MO: '澳门',
  MP: '北马里亚纳群岛',
  MQ: '马提尼克岛',
  MR: '毛利塔尼亚',
  MS: '蒙特塞拉特',
  MT: '马耳他',
  MU: '毛里求斯',
  MV: '马尔代夫',
  MW: '马拉维',
  MX: '墨西哥',
  MY: '马来西亚',
  MZ: '莫桑比克',
  NA: '纳米比亚',
  NC: '新喀里多尼亚',
  NE: '尼日尔',
  NF: '诺福克岛',
  NG: '尼日利亚',
  NI: '尼加拉瓜',
  NL: '荷兰',
  NO: '挪威',
  NP: '尼泊尔',
  NR: '瑙鲁',
  NU: '纽埃岛',
  NZ: '新西兰',
  OM: '阿曼',
  PA: '巴拿马',
  PE: '秘鲁',
  PF: '法属波利尼西亚',
  PG: '巴布新几内亚',
  PH: '菲律宾',
  PK: '巴基斯坦',
  PL: '波兰',
  PM: '圣皮埃尔岛和密克隆岛',
  PN: '皮特克恩',
  PR: '波多黎各',
  PS: '巴勒斯坦',
  PT: '葡萄牙',
  PW: '帕劳',
  PY: '巴拉圭',
  QA: '卡塔尔',
  RE: '留尼旺',
  RO: '罗马尼亚',
  RS: '塞尔维亚',
  RU: '俄罗斯联邦',
  RW: '卢旺达',
  SA: '沙特阿拉伯',
  SB: '所罗门群岛',
  SC: '塞舌尔',
  SD: '苏丹',
  SE: '瑞典',
  SG: '新加坡',
  SH: '圣赫勒拿',
  SI: '斯洛文尼亚',
  SJ: '斯瓦尔巴群岛和扬马延岛',
  SK: '斯洛伐克',
  SL: '塞拉利昂',
  SM: '圣马力诺',
  SN: '塞内加尔',
  SO: '索马里',
  SR: '苏里南',
  SS: '南苏丹',
  ST: '圣多美和普林西比',
  SV: '萨尔瓦多',
  SY: '阿拉伯叙利亚共和国',
  SZ: '斯威士兰',
  TC: '特克斯和凯科斯群岛',
  TD: '乍得',
  TG: '多哥',
  TH: '泰国',
  TJ: '塔吉克斯坦',
  TK: '托克劳',
  TL: '东帝汶',
  TM: '土库曼斯坦',
  TN: '突尼斯',
  TO: '汤加',
  TR: '土耳其',
  TT: '特立尼达和多巴哥',
  TV: '图瓦卢',
  TW: '台湾',
  TZ: '坦桑尼亚',
  UA: '乌克兰',
  UG: '乌干达',
  UM: '美国本土外小岛屿',
  US: '美国',
  UY: '乌拉圭',
  UZ: '乌兹别克斯坦',
  VA: '梵蒂冈',
  VC: '圣文森特和格林纳丁斯',
  VE: '委内瑞拉',
  VG: '维尔京群岛,英国',
  VI: '维尔京群岛,美国',
  VN: '越南',
  VU: '瓦努阿图',
  WF: '瓦利斯群岛和富图纳群岛',
  WS: '萨摩亚',
  YE: '也门',
  YT: '马约特岛',
  ZA: '南非',
  ZM: '赞比亚',
  ZW: '津巴布韦'
};
