<script setup lang="ts">
  import type { LocationWeather } from '@/domain/home/model/weather.type';
  import Weather from './Weather.vue';
  const props = defineProps<{
    locationWeather: LocationWeather;
  }>();
</script>
<template>
  <div class="weather-card-layout">
    <div class="weather-card-title-text">날씨</div>
    <div class="weather-card-location-text">{{ props.locationWeather.location }}</div>
    <div class="day-of-week-weather-layout">
      <div class="weather-temperature-title-text">
        <div class="temperature-title-img"></div>
        <div class="weather-temperature-title-dayofweek-text">최저</div>
        <div class="weather-temperature-title-dayofweek-text">최고</div>
      </div>
      <div v-for="weather in props.locationWeather.weather" :key="weather.dayOfWeek">
        <Weather :weather="weather" />
      </div>
    </div>
  </div>
</template>

<style scoped>
  .weather-card-layout {
    width: 100%;
    height: 214px;
    background-color: white;
    border-radius: 20px;
    padding: 30px;
    display: flex;
    flex-direction: column;
    gap: 18.5px;
  }
  .weather-card-title-text {
    font-size: 20px;
    font-weight: 700;
    color: #9aa2ad;
  }
  .weather-card-location-text {
    font-size: 14px;
    font-weight: 800;
    line-height: 14px;
  }
  .weather-card-temperature-text {
    line-height: 12px;
    font-size: 12px;
    font-weight: 800;
    display: flex;
    flex-direction: column;
    gap: 10px;
  }
  .weather-card-dayofweek-text {
    font-size: 12px;
    font-weight: 800;
    color: #a1a8b2;
  }

  .day-of-week-weather-layout {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
  }

  .weather-temperature-title-text {
    width: fit-content;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 7px;
    height: fit-content;
  }
  .temperature-title-img {
    width: 28px;
    height: 24px;
  }

  .weather-temperature-title-dayofweek-text {
    font-size: 12px;
    font-weight: 600;
    white-space: nowrap; /* 줄넘김 방지 */
  }
</style>
