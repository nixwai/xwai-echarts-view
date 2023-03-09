<template>
  <base-card :title="name + '种类占比'">
    <div ref="propertyPie" class="w-full h-full" />
  </base-card>
</template>

<script lang="ts" setup>
import echarts from '@/echarts';
import { useEcharts } from '@/hooks/useEcharts';
import { STAT } from '@/types';
import { PieChart, PieSeriesOption } from 'echarts/charts';
import {
  PolarComponent,
  PolarComponentOption,
  TitleComponentOption,
  TooltipComponentOption
} from 'echarts/components';
import { AngleAxisOption, RadiusAxisOption } from 'echarts/types/dist/shared';
import { reactive, ref, watch } from 'vue';
import BaseCard from '@/components/baseCard/BaseCard.vue';
import { useAppStore } from '@/store';

type ECOption = echarts.ComposeOption<
  | PieSeriesOption
  | TitleComponentOption
  | TooltipComponentOption
  | PolarComponentOption
  | AngleAxisOption
  | RadiusAxisOption
>;

const props = defineProps<{
  name: string;
  stat: STAT;
  dataObj: { [keys: string]: string };
}>();

const propertyPie = ref<HTMLElement>();
const option = reactive<ECOption>({
  tooltip: {
    trigger: 'item',
    formatter: '{b} : {c} ({d}%)'
  },
  polar: {},
  angleAxis: {
    interval: 1,
    type: 'category',
    data: [],
    z: 10,
    axisLine: {
      show: false,
      lineStyle: {
        color: '#0B4A6B',
        width: 1,
        type: 'solid'
      }
    },
    axisLabel: {
      interval: 0,
      show: true,
      color: '#0B4A6B',
      margin: 8,
      fontSize: 16
    }
  },
  radiusAxis: {
    min: 0,
    max: 10,
    interval: 25,
    axisLine: {
      show: false,
      lineStyle: {
        color: '#0B3E5E',
        width: 1,
        type: 'solid'
      }
    },
    axisLabel: {
      formatter: '{value} %',
      show: false,
      padding: [0, 0, 20, 0],
      color: '#0B3E5E',
      fontSize: 16
    },
    axisTick: {
      show: false
    },
    splitLine: {
      show: false
    }
  },
  series: {
    type: 'pie',
    radius: ['0%', '80%'],
    // roseType: "radius",
    zlevel: 10,
    itemStyle: {
      borderRadius: 15
    },
    startAngle: 200,
    label: {
      fontSize: 14,
      formatter: ['{b|{b}}', '{d|{d}%}'].join('\n'),
      rich: {
        b: {
          color: '#999',
          lineHeight: 20
        },
        d: {
          color: '#3bd2fe',
          fontFamily: 'Lato',
          fontWeight: 100,
          fontSize: 14,
          height: 20
        }
      }
    },
    labelLine: {
      show: true,
      length: 5,
      length2: 15,
      smooth: true,
      lineStyle: {
        width: 2
      }
    },
    data: []
  }
});

echarts.use([PieChart, PolarComponent]);

useEcharts({ dom: propertyPie, option: option });

const useStore = useAppStore();

watch(
  () => props.stat,
  (val) => {
    useStore
      .setTotalCount(val)
      .then((res) => {
        if (!Array.isArray(option.series)) {
          option.series?.data?.splice(0, option.series.data.length);
          const { nameList, dataList } =
            val === 'statUser'
              ? filterUser(res.xaxis, res.yaxis)
              : { nameList: res.xaxis, dataList: res.yaxis };
          for (let i = 0; i < dataList.length; i++) {
            option.series?.data?.push({
              value: dataList[i],
              name: props.dataObj[nameList[i]],
              itemStyle: {
                shadowBlur: 5,
                shadowColor: 'rgba(0, 0, 0, .2)',
                shadowOffsetX: 1,
                shadowOffsetY: 1
              }
            });
          }
        }
      })
      .catch(() => null);
  },
  {
    immediate: true
  }
);

/**
 * 将用户量统计中少于1000筛选为其他
 */
function filterUser(xList: string[], yList: number[]) {
  let otherSum = 0;
  const nameList = [];
  const dataList = yList.filter((item, index) => {
    if (item < 1000) {
      otherSum += item;
      return false;
    }
    nameList.push(xList[index]);
    return true;
  });
  nameList.push('other');
  dataList.push(otherSum);
  return { nameList, dataList };
}
</script>
