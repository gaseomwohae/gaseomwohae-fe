<template>
  <div class="schedule-page">
    <div id="map-container"></div>
    <div class="side-bar">
      <PlaceList v-if="sideBarVisible" />
      <ScheduleList v-if="sideBarVisible" />
      <div class="side-bar__store-detail">
        <PlaceDetail v-if="sideBarVisible" />
        <button @click="toggleStoreReview">
          <img
            v-if="sideBarVisible"
            src="@/assets/icons/close.png"
            style="width: 0.5rem; height: 1rem"
          />
          <img v-else src="@/assets/icons/open.png" style="width: 0.5rem; height: 1rem" />
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { useMapStore } from '@/stores/map.store';
  import { onMounted, ref, onUnmounted } from 'vue';
  import { mapService } from '../service/map.service';
  import PlaceDetail from './PlaceDetail.vue';
  import PlaceList from './PlaceList.vue';
  import ScheduleList from './ScheduleList.vue';
  import { travelService } from '@/domain/travel/service/travel.service';
  import { useTripInfoStore } from '@/stores/tripStore';
import { scheduleService } from '../service/schedule.service';
  const sideBarVisible = ref(true);
  const mapStore = useMapStore();
  const pollingInterval = ref<number | null>(null);

  const startPolling = (tripId: number) => {
    pollingInterval.value = setInterval(async () => {
      try {
      await  scheduleService.getScheduleList(tripId);
      } catch (error) {
        console.error('Failed to fetch travel detail:', error);
      }
    }, 500);
  };

  onMounted(async () => {
    const tripInfoStore = useTripInfoStore();
    console.log('tripInfoStore.tripInfo', tripInfoStore.tripInfo);
    if (tripInfoStore.tripInfo?.trip.id !== undefined) {
      await travelService.getTravelDetail(tripInfoStore.tripInfo.trip.id);
      startPolling(tripInfoStore.tripInfo.trip.id);
    }
    console.log('Before map init');
    const map = mapService.initMap('map-container', 33.450701, 126.570667, 3);
    console.log('Map created:', map);
    mapStore.setMap(map);
    console.log('After setMap:', mapStore.map);
  });

  onUnmounted(() => {
    if (pollingInterval.value) {
      clearInterval(pollingInterval.value);
      pollingInterval.value = null;
    }
  });

  function toggleStoreReview() {
    sideBarVisible.value = !sideBarVisible.value;
  }
</script>

<style scoped>
  .schedule-page {
    position: relative;
    width: 100%;
    height: 100%;
  }

  .map-container {
    width: 100%;
    height: 100%;
  }
  .side-bar {
    z-index: 2;
    left: -1rem;
    position: absolute;
    top: 0;
    display: flex;
    flex-direction: row;
    gap: 1rem;
    width: fit-content;
    height: 100%;
    padding: 1rem;
  }

  .side-bar__store-detail {
    display: flex;
    flex-direction: row;
    align-items: center;
  }

  .side-bar__store-detail button {
    background-color: #ffffff;
    border-radius: 0 0.5rem 0.5rem 0;
    width: 1.5rem;
    height: 4rem;
    cursor: pointer;
    display: flex;
    justify-content: center;
    align-items: center;
    box-shadow: 1px 1px 1px 1px rgba(0, 0, 0, 0.1);
  }

  .side-bar__store-detail button:hover {
    background-color: #faf9ff;
  }

  #map-container {
    width: 100%;
    height: 100%;
    border-radius: 1rem;
  }
</style>
