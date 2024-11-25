<script setup lang="ts">
  import Profile from './Profile.vue';
  import { useTripInfoStore } from '@/stores/tripStore';
  import { computed } from 'vue';
  const tripInfoStore = useTripInfoStore();
  const participantList = computed(() => tripInfoStore.tripInfo?.participants);
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
