<template>
  <div class="flex flex-col items-center justify-center w-full h-screen">
    <div class="relative flex items-center justify-center w-36 h-36">
      <img class="absolute animate-spin" src="@/assets/loading_circle_outer.png" alt="out" />
      <img
        class="absolute animate-spin"
        style="animation-direction: reverse"
        src="@/assets/loading_circle_inner.png"
        alt="in"
      />
      <img src="@/assets/logo.svg" alt="logo" class="w-16 h-16" />
    </div>
    <div class="mt-4 text-blue-400">正在获取最新数据...</div>
    <div class="mt-4 text-blue-400">请稍等（{{ rqCount + '/' + initCount }}）</div>
  </div>
</template>
<script lang="ts" setup>
defineProps<{
  rqCount: number;
  initCount: number;
}>();
</script>
