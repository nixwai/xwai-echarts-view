import { mock } from 'mockjs';
import { countryObj } from '@/types/response.ts';

function getCount(n) {
  const list = [];
  for (let i = 0; i < n; i++) {
    list.push(Math.floor(1000 + Math.random() * 10000));
  }
  return list;
}

function getCounty(n) {
  const keys = Object.keys(countryObj);
  const list = [];
  for (let i = 0; i < n; i++) {
    list.push(Math.floor(1 + Math.random() * keys.length));
  }
  return list.map((i) => keys[i]);
}

/**
 * 模拟数据
 */
const data1 = () =>
  mock({
    code: 0,
    data: {
      xaxis: getCounty(4),
      yaxis: getCount(4)
    }
  });
const data2 = () =>
  mock({
    code: 0,
    data: {
      xaxis: getCounty(22),
      yaxis: getCount(22)
    }
  });
const data3 = () =>
  mock({
    code: 0,
    data: {
      xaxis: getCount(24),
      yaxis: getCount(24)
    }
  });
const data4 = () =>
  mock({
    code: 0,
    data: {
      xaxis: getCount(24),
      yaxis: getCount(24)
    }
  });

mock(/oapi\/stat\/statSPV/, 'get', () => {
  return data1();
});

mock(/oapi\/stat\/statSSV/, 'get', () => {
  return data2();
});

mock(/oapi\/stat\/statSTSPV/, 'get', () => {
  return data3();
});

mock(/oapi\/stat\/statMT3/, 'get', () => {
  return data4();
});
