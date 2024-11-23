import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useMapStore = defineStore('map', () => {
  const map = ref<kakao.maps.Map | null>(null);

  const setMap = (newMap: kakao.maps.Map) => {
    console.log('Setting map:', newMap);
    map.value = newMap;
  };

  return {
    map,
    setMap,
  };
});
