<script setup lang="ts">
  import Profile from './Profile.vue';
  import { useTripStore } from '@/stores/tripStore';
  import { computed } from 'vue';
  const tripStore = useTripStore();
  // const participantList = tripStore.participantList;
  const tripSimpleList = tripStore.tripSimpleList;
  const participantList = computed(() => tripStore.participantList);
  console.log('tripStore', tripStore);
  console.log(tripSimpleList);
  console.log(participantList);
</script>

<template>
  <div class="participation-layout">
    <Profile
      v-for="participant in participantList"
      :participant="participant"
      :key="participant.id"
    />
  </div>
</template>

<style scoped>
  .participation-layout {
    display: flex;
    flex-direction: row;
    gap: 20px;
    align-items: center;
    justify-content: center;
  }
</style>
