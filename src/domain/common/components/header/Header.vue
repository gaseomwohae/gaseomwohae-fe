<script setup lang="ts">
  import HeaderDropDown from './HeaderDropDown.vue';
  import Participation from './Participation.vue';
  import { storeToRefs } from 'pinia';
  import { computed } from 'vue';
  import { useRoute } from 'vue-router';

  import { useTripStore } from '@/stores/tripStore';
  const route = useRoute();
  const tripStore = useTripStore();
  const { tripSimpleList, selectedTripId, participantList } = storeToRefs(tripStore);

  // 현재 경로가 /travel로 시작하는지 확인
  const isInTravelPath = computed(() => route.path.startsWith('/travel'));
</script>
<template>
  <div class="header-layout">
    <HeaderDropDown
      :trip-simple-list="tripSimpleList"
      :selected-trip-id="selectedTripId"
    />
    <Participation 
      v-if="isInTravelPath"
      :participant-list="participantList" 
    />
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
