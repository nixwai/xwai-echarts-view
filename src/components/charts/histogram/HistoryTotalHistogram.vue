<template>
  <base-card :title="name + '历史统计'">
    <div ref="historyTotalBar" class="w-full h-full" />
    <data-zoom-component />
  </base-card>
</template>

<script lang="ts" setup>
import echarts from '@/echarts';
import { useEcharts } from '@/hooks/useEcharts';
import { STAT } from '@/types';
import { xMonths } from '@/utils/time';
import { BarChart, BarSeriesOption } from 'echarts/charts';
import {
  TooltipComponentOption,
  DataZoomComponentOption,
  DataZoomComponent,
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
  | DataZoomComponentOption
  | XAXisOption
  | YAXisOption
>;

const props = defineProps<{
  name: string;
  stat: STAT;
}>();

const historyTotalBar = ref<HTMLElement>();
const option = reactive<ECOption>({
  tooltip: {
    trigger: 'axis',
    axisPointer: {
      type: 'shadow'
    }
  },
  grid: {
    top: 20,
    bottom: 55,
    left: 60,
    right: 10
  },
  xAxis: {
    data: xMonths,
    axisTick: {
      show: false
    },
    axisLine: {
      show: false
    }
  },
  yAxis: {
    min: (value) => (2 * value.min - value.max < 0 ? 0 : 2 * value.min - value.max)
  },
  dataZoom: [
    {
      type: 'slider',
      show: true,
      bottom: 20,
      height: 0,
      startValue: xMonths.length - 10,
      endValue: xMonths.length - 1,
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

echarts.use(BarChart);

useEcharts({ dom: historyTotalBar, option: option });

const useStore = useAppStore();

watch(
  () => props.stat,
  (val) => {
    useStore
      .setHistoryCount(val)
      .then((res) => {
        option.series = {
          name: props.name,
          type: 'bar',
          data: res,
          itemStyle: {
            color: '#43a2e2',
            borderRadius: [4, 4, 0, 0],
            shadowBlur: 3,
            shadowColor: 'rgba(0, 0, 0, .2)',
            shadowOffsetX: 2,
            shadowOffsetY: 2
          }
        };
      })
      .catch(() => null);
  },
  {
    immediate: true
  }
);
</script>
