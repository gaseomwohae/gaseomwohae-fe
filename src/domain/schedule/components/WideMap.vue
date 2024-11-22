<script setup lang="ts">
  import { onMounted } from 'vue';

  const loadKakaoMap = () => {
    const container = document.getElementById('mapContainer');
    if (!container) {
      console.error('Map container not found!');
      return; // 컨테이너가 없으면 예외 처리
    }

    const script = document.createElement('script');
    script.src =
      'https://dapi.kakao.com/v2/maps/sdk.js?appkey=46b99b5a41d376c32bafb4625e59a55d&autoload=false';
    document.head.appendChild(script);

    script.onload = () => {
      window.kakao.maps.load(() => {
        const options = {
          center: new window.kakao.maps.LatLng(33.450701, 126.570667),
          level: 3, // 지도 확대 레벨
        };
        new window.kakao.maps.Map(container, options);
      });
    };
  };

  onMounted(() => {
    loadKakaoMap();
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
