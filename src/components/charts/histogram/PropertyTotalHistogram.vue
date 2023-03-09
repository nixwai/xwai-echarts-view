<template>
  <base-card :title="name + '种类统计'">
    <div ref="deviceTotalBar" class="w-full h-full" />
  </base-card>
</template>

<script lang="ts" setup>
import echarts from '@/echarts';
import { useEcharts } from '@/hooks/useEcharts';
import { STAT, siteList, siteNames } from '@/types';
import { BarChart, BarSeriesOption } from 'echarts/charts';
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
  | BarSeriesOption
  | GridComponentOption
  | TooltipComponentOption
  | LegendComponentOption
  | XAXisOption
  | YAXisOption
>;

const props = defineProps<{
  name: string;
  stat: STAT;
  dataObj: { [keys: string]: string };
}>();
const sites: string[] = [];
const deviceTotalBar = ref<HTMLElement>();
const option = reactive<ECOption>({
  legend: {
    data: sites
  },
  color: ['#1BD666', '#F2CF5B', '#D7179B', '#2B8FF4'],
  tooltip: {
    trigger: 'axis',
    axisPointer: {
      type: 'shadow'
    }
  },
  grid: {
    top: 30,
    bottom: 20,
    left: 100,
    right: 20
  },
  xAxis: {
    type: 'value',
    splitNumber: 2
  },
  yAxis: {
    type: 'category',
    data: [],
    axisTick: {
      show: false
    },
    axisLine: {
      show: false
    }
  },
  series: []
});

echarts.use(BarChart);

const { clearChart } = useEcharts({ dom: deviceTotalBar, option: option });

const useStore = useAppStore();

watch(
  () => props.stat,
  (val) => {
    clearChart();
    sites.length = 0;
    option.series = [
      {
        name: '总量',
        type: 'bar',
        barGap: '-100%',
        itemStyle: {
          color: props.stat !== 'statUser' ? '#00000022' : '#3db89f',
          shadowColor: 'rgba(0, 0, 0, 0.3)',
          shadowBlur: 4,
          shadowOffsetX: 1,
          shadowOffsetY: 1
        },
        barMaxWidth: 10,
        label: {
          show: true,
          position: 'right',
          color: '#ccc'
        },
        data: []
      }
    ];
    if (props.stat !== 'statUser') {
      option.yAxis = {
        data: Object.values(props.dataObj)
      };
    } else {
      option.yAxis = {
        data: []
      };
    }

    // 获取全球
    useStore
      .setTotalCount(val)
      .then((res) => {
        if (Array.isArray(option.series)) {
          option.series[0].data = res.yaxis;
          if (props.stat === 'statUser') {
            const newNames = Array.from(new Set(res.xaxis)).map((item) => props.dataObj[item]);
            option.yAxis = {
              data: newNames
            };
          }
        }
      })
      .catch(() => null);

    // 分别获取各个站点的，统计用户时不需要
    if (props.stat !== 'statUser') {
      for (let i = 0; i < siteList.length; i++) {
        useStore
          .setPropertyCount(val, siteList[i])
          .then((res) => {
            if (Array.isArray(option.series)) {
              sites.push(siteNames[i]);
              option.series.push({
                name: siteNames[i],
                type: 'bar',
                stack: 'data',
                data: res,
                barMaxWidth: 25,
                itemStyle: {
                  shadowColor: 'rgba(0, 0, 0, 0.3)',
                  shadowBlur: 4,
                  shadowOffsetX: 1,
                  shadowOffsetY: 1
                }
              });
            }
          })
          .catch(() => null);
      }
    }
  },
  {
    immediate: true
  }
);
</script>
