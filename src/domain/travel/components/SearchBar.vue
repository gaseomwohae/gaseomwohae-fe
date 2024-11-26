<template>
  <div class="search-bar">
    <input
      class="search-input font-xs font-bold"
      type="text"
      v-model="searchValue"
      placeholder="방문하고 싶은 곳을 검색해보세요"
      @keyup.enter="handleInput"
    />
    <img class="search-icon" src="@/assets/icons/search.png" alt="search" />
  </div>
</template>

<script setup lang="ts">
  import type { Place } from '@/domain/travel/model/travel.type';
  import { mapService } from '@/domain/travel/service/map.service';
  import { useMapStore } from '@/stores/map.store';
  import { usePlaceStore } from '@/stores/place.store';
  import { computed, ref } from 'vue';
  import placeService from '@/domain/travel/service/place.service';

  const searchValue = ref<string>('');
  const placeStore = usePlaceStore();
  const mapStore = useMapStore();
  const map = computed(() => mapStore.map);

  const handleInput = async () => {
    if (!map.value || !searchValue.value) return;

    const places: Place[] = await mapService.searchPlaces(map.value, searchValue.value);
    for (const place of places) {
      console.log(place.name);
    }
    await placeService.createPlaces(places);

    placeStore.updateSearchedPlaces(places);
  };

  // 예시로 사용할 장소 리스트
  const places: Place[] = [
    // ... 장소 객체들
  ];

  // 장소 리스트를 한 번에 생성
  const createAllPlaces = async () => {
    try {
      const response = await placeService.createPlaces(places);
      if (response.success) {
        console.log('All places created successfully');
      } else {
        console.error('Failed to create all places:', response.message);
      }
    } catch (error) {
      console.error('Error occurred while creating all places:', error);
    }
  };

  createAllPlaces();
</script>

<style scoped>
  .search-bar {
    position: sticky;
    position: relative;
    width: 100%;
  }

  .search-input {
    width: 100%;
    height: 4rem;
    border: solid 0.25rem #3a6ff9;
    border-radius: 1.5rem;
    padding: 1rem;
    font-size: 1rem;
    background-color: #ffffff;
  }

  .search-icon {
    position: absolute;
    right: 1rem;
    top: 30%;
    width: 1.5rem;
    height: 1.5rem;
  }
</style>
