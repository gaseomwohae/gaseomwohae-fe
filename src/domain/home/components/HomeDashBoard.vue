<script setup lang="ts">
  import InfoCard from './InfoCard.vue';
  import Accommodation from './Accommodation.vue';
  import type { LocationWeather } from '@/domain/home/model/weather.type';
  import WeatherCard from './weather/WeatherCard.vue';
  import SupplyList from './check_list/SupplyList.vue';
  import SimpleMap from './SimpleMap.vue';
  import { ref, onMounted, computed } from 'vue';
  import Chart from './Chart.vue';
  import { useTripInfoStore } from '@/stores/tripStore';
  import { SUPPLIES } from '@/domain/supply/constants/supplies';
  import type { SupplyCategory } from '@/domain/supply/components/model/supply.type';
  import { travelService } from '@/domain/travel/service/travel.service';
  import {
    Chart as ChartJS,
    Title,
    Tooltip,
    Legend,
    BarElement,
    CategoryScale,
    LinearScale,
  } from 'chart.js';

  const tripInfoStore = useTripInfoStore();
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
    ],
  };

  const selectedColor = ref('blue');
  const attrs = computed(() => {
    if (!tripInfo.value?.trip.startDate || !tripInfo.value?.trip.endDate) {
      return [];
    }

    return [
      {
        key: 'tripPeriod',
        highlight: true,
        dates: {
          start: new Date(tripInfo.value.trip.startDate),
          end: new Date(tripInfo.value.trip.endDate),
        },
      },
    ];
  });

  onMounted(() => {
    // 차트 초기화 등 다른 필요한 초기화 작업만 수행
    ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale);
  });

  const tripInfo = computed(() => tripInfoStore.tripInfo);

  const localVisitors = computed(() => {
    if (!tripInfo.value?.localVisitors) return [];
    return tripInfo.value.localVisitors;
  });

  // 기간 계산
  const getTripDuration = computed(() => {
    if (!tripInfo.value) return '0일';
    const start = new Date(tripInfo.value.trip.startDate);
    const end = new Date(tripInfo.value.trip.endDate);
    const diffTime = Math.abs(end.getTime() - start.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return `${diffDays}일`;
  });

  // 참여자 수 계산
  const getParticipantsCount = computed(() => {
    if (!tripInfo.value?.participants) return '0명';
    return `${tripInfo.value.participants.length}명`;
  });

  // 목적지 정보
  const getDestination = computed(() => {
    if (!tripInfo.value?.trip.destination) return '-';
    return tripInfo.value.trip.destination;
  });

  // 숙소 수 계산
  const getAccommodationsCount = computed(() => {
    if (!tripInfo.value?.accomodations) return '0개';
    return `${tripInfo.value.accomodations.length}개`;
  });

  // 예산 계산
  const getBudget = computed(() => {
    if (!tripInfo.value?.trip.budget) return '0원';
    return `${tripInfo.value.trip.budget.toLocaleString()}원`;
    // 또는
    // return new Intl.NumberFormat('ko-KR').format(tripInfo.value.budget) + '원';
  });

  // 여행 날짜 범위
  const getTripDateRange = computed(() => {
    if (!tripInfo.value?.trip.startDate || !tripInfo.value?.trip.endDate) return '-';
    return `${tripInfo.value.trip.startDate} ~ ${tripInfo.value.trip.endDate}`;
  });

  // 참여자 이름 목록
  const getParticipantNames = computed(() => {
    if (!tripInfo.value?.participants) return '-';
    return (
      tripInfo.value.participants
        .map((p) => p.name)
        .slice(0, 2) // 처음 2명만 표시
        .join(', ') + (tripInfo.value.participants.length > 2 ? ' 외' : '')
    );
  });

  // 여행 경로 정보
  const getTripRouteInfo = computed(() => {
    if (!tripInfo.value?.trip) return '-';
    return `${tripInfo.value.trip.destination}`;
  });

  // 각 카테고리에서 랜덤하게 아이템을 선택하는 헬퍼 함수
  const getRandomItems = (category: SupplyCategory, count: number = 2) => {
    const items = SUPPLIES[category];
    const shuffled = [...items].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, count);
  };
</script>

<template>
  <div class="dashboard-side-layout">
    <div class="dashboard-left-layout">
      <div class="dashboard-short-info-card-layout">
        <InfoCard title="기간" :content="getTripDuration" :subContent="getTripDateRange" />
        <InfoCard
          title="참여자"
          :content="getParticipantsCount"
          :subContent="getParticipantNames"
        />
        <InfoCard title="목적지" :content="getDestination" :subContent="getTripRouteInfo" />
        <InfoCard title="예산" :content="getBudget" />
      </div>
      <div class="dashboard-info-card-layout">
        <Accommodation v-if="tripInfo" :accommodations="tripInfo.accomodations" />
        <div class="dashboard-info-column-layout">
          <WeatherCard :locationWeather="locationWeather" />
          <SupplyList v-if="tripInfo" :supplies="tripInfo.supplies" />
        </div>
        <div class="dashboard-right-layout">
          <Chart v-if="tripInfo" :localVisitors="localVisitors" />
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
