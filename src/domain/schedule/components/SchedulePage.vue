<template>
  <div class="schedule-container">
    <div class="map-container">
      <WideMap />
    </div>
    <div class="side-bar">
      <StoreSearch v-if="sideBarVisible" />
      <TimeTable v-if="sideBarVisible" />
      <div class="side-bar__store-detail">
        <StoreReview v-if="sideBarVisible" />
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
  import { ref } from 'vue';
  import StoreReview from './StoreReview.vue';
  import StoreSearch from './StoreSearch.vue';
  import TimeTable from './TimeTable.vue';
  import WideMap from './WideMap.vue';

  const sideBarVisible = ref(true);

  function toggleStoreReview() {
    sideBarVisible.value = !sideBarVisible.value;
  }
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
</style>
