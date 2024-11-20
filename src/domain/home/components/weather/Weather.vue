<script setup lang="ts">
  import type { Weather } from '@/domain/home/model/weather.type';
  const props = defineProps<{
    weather: Weather;
  }>();
</script>
<template>
  <div class="weather-layout">
    <img src="/src/assets/icons/rain.png" alt="weather" />
    <div class="weather-temperature-text">{{ props.weather.temperature }}</div>
    <div class="weather-dayofweek-text">{{ props.weather.dayOfWeek }}</div>
  </div>
</template>
<style scoped>
  .weather-layout {
    width: fit-content;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 7px;
    height: fit-content;
  }
  img {
    width: 28px;
    height: 24px;
  }

  .weather-temperature-text {
    font-size: 12px;
    font-weight: 700;
  }
  .weather-dayofweek-text {
    font-size: 12px;
    color: #a1a8b2;
    font-weight: 400;
    white-space: nowrap; /* 줄넘김 방지 */
  }
</style>
