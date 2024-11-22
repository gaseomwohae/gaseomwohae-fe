<script setup lang="ts">
  import InfoCard from './InfoCard.vue';
  import Accommodation from './Accommodation.vue';
  import type { LocationWeather } from '@/domain/home/model/weather.type';
  import WeatherCard from './weather/WeatherCard.vue';
  import CheckList from './check_list/CheckList.vue';
  import SimpleMap from './SimpleMap.vue';
  import { ref } from 'vue';
  import Chart from './Chart.vue';
  import AcceptLottie from '@/domain/common/components/AcceptLottie.vue';

  import {
    Chart as ChartJS,
    Title,
    Tooltip,
    Legend,
    BarElement,
    CategoryScale,
    LinearScale,
  } from 'chart.js';

  ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale);

  const chartData = {
    labels: ['January', 'February', 'March'],
    datasets: [{ data: [40, 20, 12] }],
  };
  const chartOptions = {
    responsive: true,
  };

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
    <div class="dashboard-left-layout">
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
        <div class="dashboard-right-layout">
          <Chart />
          <SimpleMap />
        </div>
      </div>
    </div>
    <div class="dashboard-info-column-layout">
      <VCalendar expanded borderless transparent :attributes="attrs" :color="selectedColor" />
    </div>
  </div>
</template>

<style scoped>
  .dashboard-side-layout {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    height: 100%;
  }

  .dashboard-short-info-card-layout {
    display: flex;
    flex-direction: row;
    gap: 20px;
  }
  .dashboard-left-layout {
    display: flex;
    flex-direction: column;
    height: 100%;
    gap: 20px;

    margin: 0 auto;
  }

  .dashboard-right-layout {
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
