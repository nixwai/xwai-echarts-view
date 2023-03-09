<template>
  <base-card :title="name + '历史增量'">
    <div ref="historyIncreaseDiscount" class="w-full h-full" />
  </base-card>
</template>
<script lang="ts" setup>
import echarts from '@/echarts';
import { useEcharts } from '@/hooks/useEcharts';
import { STAT, siteList, siteNames } from '@/types';
import { xMonths } from '@/utils/time';
import { LineChart, LineSeriesOption } from 'echarts/charts';
import {
  TooltipComponentOption,
  LegendComponentOption,
  GridComponentOption
} from 'echarts/components';
import { XAXisOption, YAXisOption } from 'echarts/types/dist/shared';
import { reactive, ref, watch } from 'vue';
import BaseCard from '@/components/baseCard/BaseCard.vue';
import { useAppStore } from '@/store';

type ECOption = echarts.ComposeOption<
  | LineSeriesOption
  | GridComponentOption
  | TooltipComponentOption
  | LegendComponentOption
  | XAXisOption
  | YAXisOption
>;

const props = defineProps<{
  name: string;
  stat: STAT;
}>();
const sites: string[] = [];
const historyIncreaseDiscount = ref<HTMLElement>();
const option = reactive<ECOption>({
  legend: {
    data: sites,
    itemWidth: 10
  },
  tooltip: {
    trigger: 'axis',
    axisPointer: {
      type: 'shadow'
    }
  },
  grid: {
    top: 50,
    bottom: 50,
    left: 60,
    right: 10
  },
  xAxis: {
    type: 'category',
    data: xMonths.slice(1),
    axisTick: {
      show: false
    },
    axisLine: {
      show: false
    }
  },
  yAxis: {},
  dataZoom: [
    {
      type: 'slider',
      show: true,
      bottom: 15,
      height: 0,
      startValue: xMonths.length - 11,
      endValue: xMonths.length - 2,
      moveHandleSize: 15,
      textStyle: {
        color: '#fff'
      },
      borderColor: '#90979c10'
    },
    {
      type: 'inside',
      show: true,
      height: 15,
      start: 1,
      end: 35
    }
  ],
  series: []
});

echarts.use(LineChart);

useEcharts({ dom: historyIncreaseDiscount, option: option });

const useStore = useAppStore();

watch(
  () => props.stat,
  () => {
    getData();
  },
  {
    immediate: true
  }
);

/**
 * 获取数据
 */
async function getData() {
  sites.length = 0;
  option.series = [
    {
      name: '全球',
      type: 'line',
      data: [],
      emphasis: {
        focus: 'series'
      },
      symbol: 'circle',
      smooth: true
    }
  ];
  sites.push('全球');

  useStore
    .setHistoryIncrement(props.stat)
    .then((res) => {
      if (Array.isArray(option.series)) {
        option.series[0].data = res;
      }
    })
    .catch(() => null);

  for (let i = 0; i < siteList.length; i++) {
    useStore
      .setPropertyHistoryIncrement(props.stat, siteList[i])
      .then((res) => {
        if (Array.isArray(option.series)) {
          sites.push(siteNames[i]);
          option.series.push({
            name: siteNames[i],
            type: 'line',
            data: res,
            emphasis: {
              focus: 'series'
            },
            smooth: true,
            lineStyle: {
              type: 'dashed',
              opacity: 0.5
            },
            itemStyle: {
              opacity: 0.5
            }
          });
        }
      })
      .catch(() => null);
  }
}
</script>
