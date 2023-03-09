<template>
  <loading-view
    v-if="rqCount === 0 || rqCount < initCount"
    :rq-count="rqCount"
    :init-count="initCount"
  />
  <home-view v-else class="animate-fadeIn" />
  <github-link />
</template>

<script lang="ts" setup>
import HomeView from '@/views/HomeView.vue';
import { computed } from 'vue';
import GithubLink from './components/gitbubLink/GithubLink.vue';
import { useAppStore } from './store';
import LoadingView from './views/LoadingView.vue';

const useStore = useAppStore();

const rqCount = computed(() => useStore.getRqCount);
const initCount = computed(() => useStore.getInitCount);

useStore.setInitData();
</script>

<style scoped>
.animate-fadeIn {
  animation: fadeIn ease 2s;
}

@keyframes fadeIn {
  0% {
    opacity: 0;
  }
  100% {
    opacity: 100;
  }
}
</style>
