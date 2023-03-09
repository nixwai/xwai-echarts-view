<template>
  <div
    class="p-4 border-3 border-solid rounded-md cursor-pointer base-card"
    :style="{ borderColor: showBorder ? color : 'rgb(239, 241, 245)' }"
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

<style scoped>
.base-card {
  background-color: rgb(239, 241, 245);
  box-shadow: 7px 7px 12px rgba(206, 206, 206, 0.4), -7px -7px 12px rgba(255, 255, 255, 0.9),
    inset 0 0 0 rgba(255, 255, 255, 0.9), inset 0 0 0 rgba(0, 0, 0, 0.4);
}
</style>
