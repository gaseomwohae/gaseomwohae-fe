<template>
  <div class="schedule-container">
    <div class="map-container">
      <WideMap />
    </div>
    <div class="side-bar">
      <StoreSearch />
      <StoreReview />
      <TimeTable />
    </div>
  </div>
</template>

<script setup lang="ts">
  import StoreReview from './StoreReview.vue';
  import StoreSearch from './StoreSearch.vue';
  import TimeTable from './TimeTable.vue';
  import WideMap from './WideMap.vue';
</script>

<style scoped>
  .schedule-container {
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
    position: absolute;
    top: 0;
    display: flex;
    flex-direction: row;
    gap: 20px;
    width: fit-content;
    height: 100%;
    padding: 1rem;
  }
</style>
