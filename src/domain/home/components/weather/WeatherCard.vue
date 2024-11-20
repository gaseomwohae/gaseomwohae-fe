<script setup lang="ts">
  import type { LocationWeather } from '@/domain/home/model/weather.type';
  import Weather from './Weather.vue';
  const props = defineProps<{
    locationWeather: LocationWeather;
  }>();
  console.log(props.locationWeather.weather);
</script>
<template>
  <div class="weather-card-layout">
    <div class="weather-card-title-text">날씨</div>
    <div class="weather-card-location-text">{{ props.locationWeather.location }}</div>
    <div class="day-of-week-weather-layout">
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
    font-size: 28px;
    font-weight: 800;
    line-height: 28px;
  }
  .weather-card-temperature-text {
    line-height: 12px;
    font-size: 12px;
    font-weight: 800;
  }
  .weather-card-dayofweek-text {
    font-size: 12px;
    font-weight: 800;
    color: #a1a8b2;
  }

  .day-of-week-weather-layout {
    display: flex;
    flex-direction: row;
    gap: 30px;
  }
</style>
