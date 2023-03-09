<template>
  <div class="flex p-2">
    <div class="flex flex-col flex-1 p-3 rounded base-card">
      <p class="text-lg font-bold text-gray-600">{{ title }}</p>
      <div class="flex-1">
        <slot />
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup>
defineProps<{
  title: string;
}>();
</script>

<style scoped>
.base-card {
  background-color: rgb(239, 241, 245);
  box-shadow: 7px 7px 12px rgba(206, 206, 206, 0.4), -7px -7px 12px rgba(255, 255, 255, 0.9),
    inset 0 0 0 rgba(255, 255, 255, 0.9), inset 0 0 0 rgba(0, 0, 0, 0.4);
}
</style>
