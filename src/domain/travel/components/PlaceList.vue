<template>
  <div class="place-list">
    <SearchBar />
    <div
      class="place"
      v-for="place in placeList"
      :key="place.id"
      draggable="true"
      @dragstart="dragStart(place)"
    >
      <PlaceSummary :place="place" />
    </div>
  </div>
</template>

<script setup lang="ts">
  import { usePlaceStore } from '@/stores/place.store';
  import { useScheduleStore } from '@/stores/schedule.store';
  import { computed } from 'vue';
  import type { Place } from '../model/travel.type';
  import PlaceSummary from './PlaceSummary.vue';
  import SearchBar from './SearchBar.vue';

  const placeStore = usePlaceStore();
  const placeList = computed(() => placeStore.searchedPlaces);

  const scheduleStore = useScheduleStore();

  const dragStart = (place: Place) => {
    scheduleStore.setDraggingSchedule({
      id: 0,
      date: '',
      startTime: '',
      endTime: '',
      place,
    });
  };
</script>

<style scoped>
  .place-list {
    display: flex;
    flex-direction: column;
    gap: 10px;
    height: 100%;
    width: 25rem;
    overflow: auto;
    background-color: #faf9ff;
    border-radius: 1.5rem;
  }

  .place {
    background-color: #fff;
    border-radius: 1.5rem;
    padding: 1rem;
    cursor: grab;
  }

  .place:active {
    cursor: grabbing;
  }

  .place-search {
    min-width: 25rem;
    width: 25rem;
    max-width: 25rem;
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
    padding: 1rem;
    height: 100%;
    background-color: #faf9ff;
    border-radius: 1.5rem;
  }
</style>
./SearchBar.vue
