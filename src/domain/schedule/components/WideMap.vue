<script setup lang="ts">
  import { onMounted } from 'vue';
  import { loadKakaoMap } from '../utils/map.util';

  onMounted(async () => {
    loadKakaoMap('mapContainer', 33.450701, 126.570667, 4);
  });
</script>

<template>
  <div id="mapContainer"></div>
</template>

<style scoped>
  #mapContainer {
    width: 100%;
    height: 100%;
    border-radius: 20px;
  }
</style>
