<template>
  <div class="flex p-2">
    <div class="flex flex-col flex-1 p-3 bg-white rounded">
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
