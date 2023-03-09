<template>
  <base-card :title="'各站点的' + name + '量'">
    <div ref="stateTotalBar" class="w-full h-full" />
  </base-card>
</template>

<script lang="ts" setup>
import echarts from '@/echarts';
import { useEcharts } from '@/hooks/useEcharts';
import { STAT, siteNames } from '@/types';
import { BarChart, BarSeriesOption } from 'echarts/charts';
import { GridComponentOption, TooltipComponentOption } from 'echarts/components';
import { XAXisOption, YAXisOption } from 'echarts/types/dist/shared';
import { reactive, ref, watch } from 'vue';
import BaseCard from '@/components/baseCard/BaseCard.vue';
import { useAppStore } from '@/store';

type ECOption = echarts.ComposeOption<
  BarSeriesOption | TooltipComponentOption | GridComponentOption | XAXisOption | YAXisOption
>;

const props = defineProps<{
  name: string;
  stat: STAT;
}>();

const myColor = ['#fbd601', '#a7e238', '#75d57e', '#5eccc3', '#43a2e2'];
const stateTotalBar = ref<HTMLElement>();
const option = reactive<ECOption>({
  tooltip: {
    trigger: 'axis',
    axisPointer: {
      type: 'shadow'
    }
  },
  grid: {
    top: 20,
    bottom: 20,
    left: 60,
    right: 10
  },
  xAxis: {
    data: siteNames,
    axisTick: {
      show: false
    },
    axisLine: {
      show: false
    }
  },
  yAxis: {},
  series: []
});

echarts.use(BarChart);

useEcharts({ dom: stateTotalBar, option: option });

const useStore = useAppStore();

watch(
  () => props.stat,
  (val) => {
    useStore
      .setSitesCount(val)
      .then((res) => {
        option.series = {
          name: props.name,
          type: 'bar',
          label: {
            show: true,
            position: 'top',
            color: '#ccc'
          },
          itemStyle: {
            color: (params) => {
              return myColor[params.dataIndex];
            },
            borderRadius: [8, 8, 0, 0],
            shadowColor: 'rgba(0, 0, 0, 0.2)',
            shadowBlur: 5,
            shadowOffsetX: 2,
            shadowOffsetY: 2
          },
          data: res
        };
      })
      .catch(() => null);
  },
  {
    immediate: true
  }
);
</script>
