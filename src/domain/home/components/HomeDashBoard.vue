<script setup lang="ts">
  import InfoCard from './InfoCard.vue';
  import Accommodation from './Accommodation.vue';
  import type { LocationWeather } from '@/domain/home/model/weather.type';
  import WeatherCard from './weather/WeatherCard.vue';
  import CheckList from './check_list/CheckList.vue';
  import SimpleMap from './SimpleMap.vue';
  import { ref } from 'vue';

  const locationWeather: LocationWeather = {
    location: '서울',
    weather: [
      {
        weather: '맑음',
        temperature: '22°C',
        dayOfWeek: '월요일',
      },
      {
        weather: '흐림',
        temperature: '18°C',
        dayOfWeek: '화요일',
      },
      {
        weather: '비',
        temperature: '20°C',
        dayOfWeek: '수요일',
      },
      {
        weather: '맑음',
        temperature: '19°C',
        dayOfWeek: '목요일',
      },
      {
        weather: '구름 많음',
        temperature: '21°C',
        dayOfWeek: '금요일',
      },
    ],
  };

  const selectedColor = ref('blue');
  const attrs = ref([
    {
      key: 'test',
      highlight: true,
      dates: { start: new Date(2024, 11, 15), end: new Date(2024, 11, 19) },
    },
  ]);
</script>

<template>
  <div class="dashboard-side-layout">
    <div class="dashboard-layout">
      <div class="dashboard-short-info-card-layout">
        <InfoCard title="참여자 수" content="100명" subContent="총 참여자 수" />
        <InfoCard title="참여자 수" content="100명" subContent="총 참여자 수" />
        <InfoCard title="참여자 수" content="100명" subContent="총 참여자 수" />
        <InfoCard title="참여자 수" content="100명" subContent="총 참여자 수" />
      </div>
      <div class="dashboard-info-card-layout">
        <Accommodation />
        <div class="dashboard-info-column-layout">
          <WeatherCard :locationWeather="locationWeather" />
          <CheckList />
        </div>
        <div class="dashboard-layout">
          <SimpleMap />
          <div class="dashboard-info-column-layout"></div>
        </div>
      </div>
    </div>
    <div class="dashboard-info-column-layout">
      <VCalendar expanded borderless transparent :attributes="attrs" :color="selectedColor" />
    </div>
  </div>
</template>

<style scoped>
  .vc-title-wrapper {
    background-color: transparent !important; /* 배경색 제거 */
    padding: 0 !important; /* 패딩 제거 또는 조정 */
    /* 추가 스타일 */
    border: none !important; /* 테두리 제거 */
    box-shadow: none !important; /* 그림자 제거 */
  }

  .dashboard-side-layout {
    display: flex;
    flex-direction: row;
    gap: 20px;
    height: 100%;
  }

  .dashboard-short-info-card-layout {
    display: flex;
    flex-direction: row;
    gap: 20px;
  }
  .dashboard-layout {
    display: flex;
    flex-direction: column;
    height: 100%;
    gap: 20px;
  }
  .dashboard-info-card-layout {
    display: flex;
    flex-direction: row;
    overflow: hidden;
    gap: 20px;
  }

  .dashboard-info-column-layout {
    width: 250px;
    display: flex;
    flex-direction: column;
    gap: 20px;
  }

  .calendar-layout {
    width: 340px;
    height: 360px;
  }
</style>
