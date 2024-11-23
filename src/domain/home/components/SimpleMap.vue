<script setup lang="ts">
  import { mapService } from '@/domain/travel/service/map.service';
  import { onMounted } from 'vue';

  onMounted(() => {
    const map = mapService.initMap('mapContainer', 33.450701, 126.570667, 3);
  });
</script>

<template>
  <div id="mapContainer" style="width: 520px; height: 580px; border-radius: 20px"></div>
</template>

<style scoped>
  /* 스타일을 여기에 추가하세요 */
</style>
../../travel/utils/map.util
