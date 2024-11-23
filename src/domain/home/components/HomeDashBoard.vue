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
  import type { TripInfo } from '../model/tripInfo.type';
  import { SUPPLIES } from '@/domain/supply/constants/supplies';
  import type { SupplyCategory } from '@/domain/supply/components/model/supply.type';


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
  if (!tripInfo.value?.tripStartDate || !tripInfo.value?.tripEndDate) {
    return [];
  }

  return [{
    key: 'tripPeriod',
    highlight: true,
    dates: {
        start: new Date(tripInfo.value.tripStartDate),
        end: new Date(tripInfo.value.tripEndDate)
      }
    }];
});

  onMounted(() => {
    const dummyTripInfo: TripInfo = {
      trip: {
        id: 1,
        name: '제주도 여행',
      },
      tripStartDate: '2024-03-20',
      tripEndDate: '2024-03-23',
      participants: [
        {
          id: 1,
          name: '김여행',
          isActive: true
    },
    {
      id: 2,
      name: '이모험',
      isActive: true
    },
    {
      id: 3,
      name: '박여행',
      isActive: true
    }
  ],
  tripRoute: {
    startDestination: {
      id: 1,
      name: '김포공항',
      latitude: 37.5586,
      longitude: 126.7944,
      imgSrc: 'gimpo-airport.jpg'
    },
    endDestination: {
      id: 2,
      name: '제주국제공항',
      latitude: 33.5067,
      longitude: 126.4927,
      imgSrc: 'jeju-international-airport.jpg'
    },
    travelTime: '1시간 10분'
  },
  supplies: [
    {
      supply: getRandomItems('REQUIRED', 3),
      category: 'REQUIRED'
    },
    {
      supply: getRandomItems('ELECTRONIC', 3),
      category: 'ELECTRONIC'
    },
    {
      supply: getRandomItems('BEAUTY', 3),
      category: 'BEAUTY'
    },
    {
      supply: getRandomItems('CLOTHES', 3),
      category: 'CLOTHES'
    },
    {
      supply: getRandomItems('EMERGENCY', 3),
      category: 'EMERGENCY'
    },
    {
      supply: getRandomItems('ETC', 3),
      category: 'ETC'
    }
  ],
  accomodations: [
    {
      id: 3,
      name: '제주 히든 클리프 호텔',
      latitude: 33.4405,
      longitude: 126.3947,
      imgSrc: 'jeju-hidden-cliff-hotel.jpg'
    },
    {
      id: 4,
      name: '롯데호텔 제주',
      latitude: 33.2482,
      longitude: 126.4132,
      imgSrc: 'lotte-hotel-jeju.jpg'
    }
  ],
  localVisitors: [
    {
      name: '제주도 현지인 가이드',
      visitorCount: 152,
      destination: {
        id: 1,
        name: '김포공항',
        latitude: 37.5586,
        longitude: 126.7944,
        imgSrc: 'gimpo-airport.jpg'
      }
    },
    {
      name: '제주 토박이 해녀',
      visitorCount: 98,
      destination: {
        id: 2,
        name: '제주국제공항',
        latitude: 33.5067,
        longitude: 126.4927,
        imgSrc: 'jeju-international-airport.jpg'
      }
    }
    ],
    budget: 2000000
    };
    
    // store에 더미데이터 설정
    tripInfoStore.setTripInfo(dummyTripInfo);
  });

  const tripInfo = computed(() => tripInfoStore.tripInfo);

  const localVisitors = computed(() => {
    if (!tripInfo.value?.localVisitors) return [];
    return tripInfo.value.localVisitors;
  });

  // 기간 계산
const getTripDuration = computed(() => {
  if (!tripInfo.value) return '0일';
  const start = new Date(tripInfo.value.tripStartDate);
  const end = new Date(tripInfo.value.tripEndDate);
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
  if (!tripInfo.value?.tripRoute?.endDestination?.name) return '-';
  return tripInfo.value.tripRoute.endDestination.name;
});

// 숙소 수 계산
const getAccommodationsCount = computed(() => {
  if (!tripInfo.value?.accomodations) return '0개';
  return `${tripInfo.value.accomodations.length}개`;
});

// 예산 계산
const getBudget = computed(() => {
  if (!tripInfo.value?.budget) return '0원';
  return `${tripInfo.value.budget.toLocaleString()}원`;
  // 또는
  // return new Intl.NumberFormat('ko-KR').format(tripInfo.value.budget) + '원';
});



// 여행 날짜 범위
const getTripDateRange = computed(() => {
  if (!tripInfo.value?.tripStartDate || !tripInfo.value?.tripEndDate) return '-';
  return `${tripInfo.value.tripStartDate} ~ ${tripInfo.value.tripEndDate}`;
});

// 참여자 이름 목록
const getParticipantNames = computed(() => {
  if (!tripInfo.value?.participants) return '-';
  return tripInfo.value.participants
    .map(p => p.name)
    .slice(0, 2) // 처음 2명만 표시
    .join(', ') + (tripInfo.value.participants.length > 2 ? ' 외' : '');
});

// 여행 경로 정보
const getTripRouteInfo = computed(() => {
  if (!tripInfo.value?.tripRoute) return '-';
  const { startDestination, endDestination, travelTime } = tripInfo.value.tripRoute;
    return `${startDestination.name} → ${endDestination.name}  ${travelTime}`;
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
        <InfoCard title="참여자" :content="getParticipantsCount" :subContent="getParticipantNames" />
        <InfoCard title="목적지" :content="getDestination" :subContent="getTripRouteInfo" />
        <InfoCard title="예산" :content="getBudget" />
      </div>
      <div class="dashboard-info-card-layout">
        <Accommodation v-if="tripInfo" :accommodations="tripInfo.accomodations"/>
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
