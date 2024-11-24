<script setup lang="ts">
  import Drawer from '@/domain/common/components/drawer/Drawer.vue';
  import Header from '@/domain/common/components/header/Header.vue';
  import { useTripStore } from '@/stores/tripStore';
  import { onMounted, computed } from 'vue';
  import NoneSelectTravel from '@/domain/common/components/NoneSelectTravel.vue';
  import { useRoute } from 'vue-router';
  import { homeService } from '@/domain/home/service/home.service';
  import { useTripInfoStore } from '@/stores/tripStore';

  const route = useRoute();
  const tripStore = useTripStore();
  const tripInfoStore = useTripInfoStore();

  const isVisible = computed(() => {
    console.log('route.name', route.name);
    return route.name === 'Home';
  });

  onMounted(async () => {
    try {
      const response = await homeService.getTravelList();
      const apiResponse = response.data;
      
      if (apiResponse.code === 200 && apiResponse.data) {
        const travels = apiResponse.data;
        
        tripStore.setTripSimpleList(travels);
        
        if (travels.length > 0) {
          const latestTravel = travels[0];
          
          const tripInfo = {
            trip: latestTravel,
            tripStartDate: latestTravel.startDate,
            tripEndDate: latestTravel.endDate,
            participants: [],
            tripRoute: {
              startDestination: {
                id: 1,
                name: '출발지',
                latitude: 0,
                longitude: 0,
                imgSrc: ''
              },
              endDestination: {
                id: 2,
                name: latestTravel.destination,
                latitude: 0,
                longitude: 0,
                imgSrc: ''
              },
              travelTime: '미정'
            },
            supplies: [],
            accomodations: [],
            localVisitors: [],
            budget: 0
          };
          
          tripInfoStore.setTripInfo(tripInfo);
        }

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
      } else {
        console.error('여행 정보를 가져오는데 실패했습니다.');
      }
    } catch (error) {
      console.error('API 호출 중 오류 발생:', error);
    }
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
