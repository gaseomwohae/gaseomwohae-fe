<script setup lang="ts">
  import Drawer from '@/domain/common/components/drawer/Drawer.vue';
  import Header from '@/domain/common/components/header/Header.vue';
  import { useTripStore } from '@/stores/tripStore';
  import { onMounted, computed } from 'vue';
  import NoneSelectTravel from '@/domain/common/components/NoneSelectTravel.vue';
  import { useRoute } from 'vue-router';

  const route = useRoute();
  const tripStore = useTripStore();

  // 특정 라우트 이름을 기준으로 컴포넌트 표시 여부 결정
  const isVisible = computed(() => {
    console.log('route.name', route.name);
    return route.name === 'Home'; // 'desiredRouteName'을 원하는 라우트 이름으로 변경
  });
  console.log('isVisible', isVisible.value);
  onMounted(() => {
    // 예시: 초기 데이터를 설정
    tripStore.setTripSimpleList([
      {
        id: 1,
        name: '부산여행',
      },
      {
        id: 2,
        name: '서울여행',
      },
    ]);
    tripStore.setSelectedTripId(null);
    tripStore.setParticipantList([
      {
        id: 1,
        name: '홍길동',
        isActive: true,
      },
      {
        id: 2,
        name: '김길동',
        isActive: false,
      },
      {
        id: 3,
        name: '이길동',
        isActive: false,
      },
    ]);
  });
  // console.log(tripStore.tripSimpleList);
  // console.log(tripStore.participantList);
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
