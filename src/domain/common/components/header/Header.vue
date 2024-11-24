<script setup lang="ts">
  import HeaderDropDown from './HeaderDropDown.vue';
  import Participation from './Participation.vue';
  import { storeToRefs } from 'pinia';
  
  import { useTripInfoStore } from '@/stores/tripInfoStore';
  const tripStore = useTripStore();
  const { tripSimpleList, selectedTripId, participantList } = storeToRefs(tripStore);
</script>
<template>
  <div class="header-layout">
    <HeaderDropDown
      :trip-simple-list="tripSimpleList"
      :selected-trip-id="selectedTripId"
    />
    <Participation :participant-list="participantList" />
  </div>
</template>
<style scoped>
  .header-layout {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: end;
    width: 100%;
    height: 80px;
    border-bottom: 1px solid rgba(0, 0, 0, 0.2);
    padding-bottom: 8px;
  }
</style>
