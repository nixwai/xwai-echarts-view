<template>
  <base-card :title="title">
    <div ref="averageTotalBar" class="w-full h-full" />
  </base-card>
</template>

<script lang="ts" setup>
import echarts from '@/echarts';
import { useEcharts } from '@/hooks/useEcharts';
import { useAppStore } from '@/store';
import { STAT as STAT } from '@/types';
import { BarChart, BarSeriesOption } from 'echarts/charts';
import {
  PolarComponent,
  PolarComponentOption,
  TitleComponentOption,
  TooltipComponentOption
} from 'echarts/components';
import {
  AngleAxisOption,
  LegendComponentOption,
  RadiusAxisOption,
  XAXisOption,
  YAXisOption
} from 'echarts/types/dist/shared';
import { reactive, ref, watch } from 'vue';
import BaseCard from '@/components/baseCard/BaseCard.vue';

type ECOption = echarts.ComposeOption<
  | BarSeriesOption
  | TitleComponentOption
  | LegendComponentOption
  | AngleAxisOption
  | RadiusAxisOption
  | PolarComponentOption
  | TooltipComponentOption
  | XAXisOption
  | YAXisOption
>;

const props = defineProps<{
  title: string;
  outName: string;
  outStat: STAT;
  inName: string;
  inStat: STAT;
  isPre?: boolean;
}>();

const averageTotalBar = ref<HTMLElement>();
const legendData: string[] = [];
const dataCount = [0, 0];
let per = 0;
const option = reactive<ECOption>({
  title: {
    text: '{a|' + 0 + '}{c|%}',
    left: 'center',
    top: '34%',
    textStyle: {
      rich: {
        a: {
          fontSize: '1.4rem'
        },
        c: {
          fontSize: '0.6rem'
        }
      }
    }
  },
  color: [
    '#0EA3D3',
    '#AD0BE6',
    '#F7430A',
    '#26C978',
    '#66FD81',
    '#FBD657',
    '#FB8F75',
    '#E07BCE',
    '#9D50E0',
    '#634FDA'
  ].sort(() => (Math.random() > 0.5 ? -1 : 1)),
  legend: {
    icon: 'circle',
    show: true,
    data: legendData,
    selectedMode: false,
    bottom: -5,
    textStyle: {
      color: '#000'
    }
  },
  angleAxis: {
    type: 'value',
    min: 0,
    max: 0,
    axisLine: {
      show: false
    },
    axisTick: {
      show: false
    },
    splitLine: {
      show: false
    },
    axisLabel: {
      show: false
    }
  },
  radiusAxis: {
    type: 'category',
    data: legendData,
    z: 100,
    axisLine: {
      show: false
    },
    axisTick: {
      show: false
    },
    axisLabel: {
      show: true,
      margin: 12,
      formatter: (value: string, index: number) => String(dataCount[index]),
      color: '#999',
      interval: 0
    }
  },
  polar: {
    radius: ['25%', '90%'],
    center: ['50%', '42%']
  },
  tooltip: {
    show: true
  },
  series: []
});

echarts.use([BarChart, PolarComponent]);

useEcharts({ dom: averageTotalBar, option: option });

const useStore = useAppStore();

watch(
  () => props,
  () => {
    option.series = [];
    legendData.length = 0;
    getSeries('outside');
    getSeries('inside');
  },
  {
    immediate: true,
    deep: true
  }
);

function getSeries(type: 'outside' | 'inside'): void {
  const index = type === 'outside' ? 1 : 0;
  const name = index ? props.outName : props.inName;
  useStore
    .setTotal(index ? props.outStat : props.inStat)
    .then((res) => {
      const list = [0, 0];
      dataCount[index] = list[index] = res;
      per =
        dataCount[1] === 0
          ? 0
          : Math.floor((dataCount[0] / dataCount[1]) * 1000) / (props.isPre ? 10 : 1000);
      if (Array.isArray(option.series)) {
        legendData.push(name);
        option.series.push({
          type: 'bar',
          data: list,
          coordinateSystem: 'polar',
          name: name,
          stack: 'data',
          roundCap: true,
          showBackground: true,
          backgroundStyle: {
            color: 'rgb(242,247,255,0.5)'
          },
          barWidth: '65%',
          itemStyle: {
            shadowColor: 'rgba(0, 0, 0, 0.3)',
            shadowBlur: 5,
            shadowOffsetX: 2,
            shadowOffsetY: 2
          }
        });
        option.angleAxis = {
          max: (Math.max(...dataCount) * (Math.floor(Math.random() * 3) + 13)) / 10
        };
        option.title = {
          text: '{a|' + per + '}' + (props.isPre ? '{c|%}' : '')
        };
      }
    })
    .catch(() => null);
}
</script>
