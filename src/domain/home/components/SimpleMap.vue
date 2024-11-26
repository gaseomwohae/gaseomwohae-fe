<script setup lang="ts">
  import { mapService } from '@/domain/travel/service/map.service';
  import { onMounted } from 'vue';
  import { useTripInfoStore } from '@/stores/tripStore';
  import { computed, watch, ref } from 'vue';
  const tripInfoStore = useTripInfoStore(); 
  const position = computed(() => tripInfoStore.tripInfo?.position);
  const map = ref<kakao.maps.Map | null>(null);
  watch(position, (newPosition) => {
    console.log('newPosition', newPosition);
    if (newPosition) {
      var markerPosition  = new window.kakao.maps.LatLng(newPosition.y, newPosition.x); 
      map.value?.setCenter(markerPosition);

// 마커를 생성합니다
      var marker = new window.kakao.maps.Marker({
        position: markerPosition
      });
      marker.setMap(map.value);
    }
  });

  onMounted(() => {
    map.value = mapService.initMap('mapContainer', position.value?.y ?? 33.450701, position.value?.x ?? 126.570667, 3);
    var markerPosition  = new window.kakao.maps.LatLng(position.value?.y ?? 33.450701, position.value?.x ?? 126.570667); 
    var marker = new window.kakao.maps.Marker({
        position: markerPosition
      });
      marker.setMap(map.value);
    
  });
</script>

<template>
  <div id="mapContainer" style="width: 520px; height: 580px; border-radius: 20px"></div>
</template>

<style scoped>
  /* 스타일을 여기에 추가하세요 */
</style>

