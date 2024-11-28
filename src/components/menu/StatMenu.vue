<template>
  <div class="grid grid-cols-2 gap-2 p-2 xl:grid-cols-4">
    <stat-total-card
      v-for="item in statData"
      :key="item.title"
      :title="item.title"
      :img="item.img"
      :count="item.count"
      :color="item.color"
      :show-border="item.dataId === selectId"
      @click="handleClick(item)"
    />
  </div>
</template>
<script lang="ts" setup>
import { STAT } from '@/types';
import { reactive, Ref, ref } from 'vue';
import StatTotalCard from '@/components/statTotalCard/StatTotalCard.vue';
import { useAppStore } from '@/store';
import userIcon from '@/assets/user.png';
import deviceIcon from '@/assets/device.png';
import serviceIcon from '@/assets/service.png';
import dollarIcon from '@/assets/dollar.png';

const emit = defineEmits<{
  (e: 'click', { dataId, color }: { dataId: STAT; color: string }): void;
}>();

const statList: STAT[] = [
  'statUser',
  'statDevice',
  'statCloudStorageService',
  'statCloudStorageAmount'
];
const statData: {
  dataId: STAT;
  img: any;
  title: string;
  count: number;
  color: string;
}[] = reactive([
  {
    dataId: 'statUser',
    img: userIcon,
    title: '用户',
    count: 0,
    color: '#c66eac'
  },
  {
    dataId: 'statDevice',
    img: deviceIcon,
    title: '设备',
    count: 0,
    color: '#7fd498'
  },
  {
    dataId: 'statCloudStorageService',
    img: serviceIcon,
    title: '订阅',
    count: 0,
    color: '#899adb'
  },
  {
    dataId: 'statCloudStorageAmount',
    img: dollarIcon,
    title: '收益',
    count: 0,
    color: '#cebc76'
  }
]);
const selectId: Ref<STAT> = ref('statUser');

const useStore = useAppStore();

function handleClick({ dataId, color }: { dataId: STAT; color: string }) {
  selectId.value = dataId;
  emit('click', { dataId, color });
}

useStore
  .setTotalList(statList)
  .then((res) => {
    for (let i = 0; i < res.length; i++) {
      statData[i].count = res[i];
    }
  })
  .catch(() => null);
</script>
