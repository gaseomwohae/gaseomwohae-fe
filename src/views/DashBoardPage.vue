<script setup lang="ts">
  import Drawer from '@/domain/common/components/drawer/Drawer.vue';
  import Header from '@/domain/common/components/header/Header.vue';
  import { useTripStore } from '@/stores/tripStore';
  import { onMounted, computed } from 'vue';
  import NoneSelectTravel from '@/domain/common/components/NoneSelectTravel.vue';
  import { useRoute } from 'vue-router';
  import { homeService } from '@/domain/home/service/home.service';
  import { participationService } from '@/domain/participation/service/participation.service';
  const route = useRoute();
  const tripStore = useTripStore();

  const isVisible = computed(() => {
    console.log('route.name', route.name);
    return route.name === 'Home';
  });

  onMounted(async () => {
    await homeService.getTravelList();
    await participationService.getInvitations(); // 상태 갱신
  });
</script>

<template>
  <div class="dashboard-layout">
    <Drawer />
    <div class="dashboard-content-layout">
      <Header
        :trip-simple-list="tripStore.tripSimpleList"
        :selected-trip-id="tripStore.selectedTripId"
      />
      <div class="dashboard-content-layout-inner">
        <router-view v-if="!isVisible" />
        <NoneSelectTravel v-if="isVisible" />
      </div>
    </div>
  </div>
</template>

<style scoped>
  .dashboard-layout {
    display: flex;
    flex-direction: row;
    width: fit-content;
    width: 100%;
    gap: 40px;
    height: calc(100vh - 60px);
  }

  .dashboard-content-layout {
    height: 100%;
    width: calc(100vw - 290px);
    display: flex;
    flex-direction: column;
    gap: 30px;
  }

  .dashboard-content-layout-inner {
    height: calc(100vh - 170px);
  }
</style>
