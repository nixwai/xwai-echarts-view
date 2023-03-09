<template>
  <base-card title="全球服务分布地图">
    <div ref="worldUserMap" class="w-full h-full" />
  </base-card>
</template>
<script lang="ts" setup>
import BaseCard from '@/components/baseCard/BaseCard.vue';
import echarts from '@/echarts';
import { useEcharts } from '@/hooks/useEcharts';
import {
  EffectScatterChart,
  EffectScatterSeriesOption,
  LinesChart,
  LinesSeriesOption,
  MapChart,
  MapSeriesOption
} from 'echarts/charts';
import { GeoComponentOption, TooltipComponentOption } from 'echarts/components';
import { ref, reactive } from 'vue';
import map from '@/static/map.json';
import { useAppStore } from '@/store';
import { countryObj } from '@/types/response';
import { countriesCoordMap } from '@/types/countries';

type ECOption = echarts.ComposeOption<
  | MapSeriesOption
  | GeoComponentOption
  | EffectScatterSeriesOption
  | LinesSeriesOption
  | TooltipComponentOption
>;

const worldUserMap = ref<HTMLElement>();
const option = reactive<ECOption>({
  geo: {
    map: 'WorldMap',
    aspectScale: 0.8,
    silent: false,
    roam: false,
    z: 0,
    zoom: 1.25,
    itemStyle: {
      areaColor: 'rgba(0, 15, 40, 0.5)',
      shadowColor: 'rgba(0, 0, 0, 0.5)',
      shadowBlur: 5,
      shadowOffsetX: 2,
      shadowOffsetY: 3,
      borderColor: 'rgba(0, 0, 0, 0)',
      borderWidth: 0.5
    },
    emphasis: {
      itemStyle: {
        areaColor: '#2AB8FF',
        borderWidth: 1
      },
      label: {
        show: false
      }
    }
  },
  tooltip: {},
  series: [
    {
      name: '用户', // 系列名称，用于tooltip的显示，legend 的图例筛选，在 setOption 更新数据和配置项时用于指定对应的系列。见上：可以在tooltip中获取到
      type: 'map', // 指定是地图类型
      map: 'WorldMap', // 和上面registerMap中的一直
      aspectScale: 0.8, // 长宽比
      zoom: 1.25,
      zlevel: 0,
      itemStyle: {
        areaColor: '#5DA9EC',
        borderColor: 'rgba(255, 255, 255, 1)',
        borderWidth: 0.5
      },
      emphasis: {
        itemStyle: {
          areaColor: '#0DA9EC'
        },
        label: {
          show: false
        }
      },
      select: {
        itemStyle: {
          areaColor: '#5DA9EC',
          borderColor: 'rgba(255, 255, 255, 1)',
          borderWidth: 0.3
        },
        label: {
          show: false
        }
      },
      label: {
        show: false
      },
      tooltip: {
        show: false
      }
    },
    {
      type: 'effectScatter',
      zlevel: 2,
      coordinateSystem: 'geo',
      animation: false,
      itemStyle: {
        color: '#FF8204',
        shadowBlur: 10,
        shadowColor: '#333'
      },
      symbolSize: 5,
      rippleEffect: {
        period: 5,
        number: 5,
        scale: 6,
        brushType: 'stroke'
      },
      data: [],
      tooltip: {
        formatter: '{b}'
      }
    },
    {
      type: 'lines',
      zlevel: 1,
      effect: {
        show: true,
        period: 3, // 箭头指向速度，值越小速度越快
        trailLength: 0.7, // 特效尾迹长度[0,1]值越大，尾迹越长重
        color: '#ddd',
        symbol: 'arrow', // 箭头图标
        symbolSize: 3 // 图标大小
      },
      lineStyle: {
        color: '#FF8204',
        width: 0.1, // 尾迹线条宽度
        opacity: 0.2, // 尾迹线条透明度
        curveness: 0.3 // 尾迹线条曲直度
      },
      data: [],
      tooltip: {
        show: false
      }
    }
  ]
});
// 初始化
echarts.use([MapChart, EffectScatterChart, LinesChart]);
const { showLoading, hideLoading } = useEcharts({ dom: worldUserMap, option: option });
// 加载地图
showLoading();
echarts.registerMap('WorldMap', map as any);
hideLoading();
// 加载数据
const useStore = useAppStore();
useStore
  .setTotalCount('statUser')
  .then(({ xaxis, yaxis }) => {
    if (Array.isArray(option.series)) {
      // data:线图数据
      const data: {
        name: string;
        value: number;
        coords: [number, number][];
      }[] = [];
      xaxis.forEach((item, index) => {
        if (countriesCoordMap[countryObj[item]]) {
          data.push({
            name: countryObj[item],
            value: yaxis[index],
            coords: [countriesCoordMap['广东'], countriesCoordMap[countryObj[item]]]
          });
        }
      });
      // 添加线图数据
      option.series[2] && (option.series[2].data = data);
      // 添加散点图数据
      option.series[1].data = data.map((item) => ({
        name: item.name,
        value: [...item.coords[1], item.value]
      }));
    }
  })
  .catch(() => null);
</script>
