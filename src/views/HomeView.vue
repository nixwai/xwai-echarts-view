<template>
  <div class="flex w-full h-screen p-2">
    <div class="w-1/4">
      <history-total-histogram :name="name" :stat="stat" class="h-1/3" />
      <history-increase-discount :name="name" :stat="stat" class="h-1/3" />
      <sate-total-histogram :name="name" :stat="stat" class="h-1/3" />
    </div>
    <div class="flex flex-col w-1/2">
      <stat-menu @click="handleClick" />
      <world-user-map class="flex-1" />
      <div class="flex h-1/4">
        <proportion-total-histogram
          title="服务购买率"
          out-name="用户量"
          out-stat="statUser"
          in-name="订阅用户量"
          in-stat="statCloudStorageUser"
          :is-pre="true"
          class="w-1/2 h-full"
        />
        <proportion-total-histogram
          title="人均设备数"
          out-name="用户量"
          out-stat="statUser"
          in-name="设备量"
          in-stat="statDevice"
          class="w-1/2 h-full"
        />
      </div>
    </div>
    <div class="w-1/4">
      <property-pie :name="name" :stat="stat" :data-obj="dataObj" class="h-1/3" />
      <property-total-histogram :name="name" :stat="stat" :data-obj="dataObj" class="h-2/3" />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { deviceObj, cloudServiceObj, countryObj } from '@/types/response';
import HistoryTotalHistogram from '@/components/charts/histogram/HistoryTotalHistogram.vue';
import SateTotalHistogram from '@/components/charts/histogram/SateTotalHistogram.vue';
import PropertyTotalHistogram from '@/components/charts/histogram/PropertyTotalHistogram.vue';
import HistoryIncreaseDiscount from '@/components/charts/discount/HistoryIncreaseDiscount.vue';
import ProportionTotalHistogram from '@/components/charts/histogram/ProportionTotalHistogram.vue';
import PropertyPie from '@/components/charts/pie/PropertyPie.vue';
import { STAT } from '@/types';
import StatMenu from '../components/menu/StatMenu.vue';
import { Ref, ref } from 'vue';
import WorldUserMap from '@/components/charts/map/WorldUserMap.vue';

const stat: Ref<STAT> = ref('statUser');
const dataObj: Ref<{ [keys: string]: string }> = ref(countryObj);
const name = ref('用户');

function handleClick({ dataId }: { dataId: STAT; color: string }) {
  stat.value = dataId;
  switch (dataId) {
    case 'statUser': {
      dataObj.value = countryObj;
      name.value = '用户';
      break;
    }
    case 'statDevice': {
      dataObj.value = deviceObj;
      name.value = '设备';
      break;
    }
    case 'statCloudStorageService': {
      dataObj.value = cloudServiceObj;
      name.value = '套餐订阅';
      break;
    }
    case 'statCloudStorageAmount': {
      dataObj.value = cloudServiceObj;
      name.value = '套餐收益';
      break;
    }
  }
}
</script>
