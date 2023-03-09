<template>
  <div
    class="p-4 bg-white border-2 border-solid rounded-md cursor-pointer"
    :style="{ borderColor: showBorder ? color : '#fff' }"
  >
    <div class="flex items-center justify-between">
      <div class="w-12 h-12 p-3 rounded-full" :style="{ background: color }">
        <img class="w-full h-full" :src="img" />
      </div>
      <p class="text-base font-bold text-gray-500 2xl:text-xl xl:text-base md:text-xl">
        {{ title }}
      </p>
    </div>
    <div class="mt-1 text-right">
      <p class="text-2xl font-bold text-gray-700 2xl:text-3xl xl:text-2xl md:text-3xl">
        {{ count }}
      </p>
    </div>
  </div>
</template>
<script lang="ts" setup>
defineProps<{
  img: string;
  title: string;
  count: number;
  color: string;
  showBorder: boolean;
}>();
</script>
