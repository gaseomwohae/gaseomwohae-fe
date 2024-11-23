<template>
  <div v-if="place">
    <div class="place-card" @click="selectPlace">
      <img :src="place.imgUrl" alt="place" />
      <div class="place-card__info">
        <div class="place-card__header">
          <div class="place-card__category font-caption">{{ place.category }}</div>
          <div class="place-card__name font-l font-bold">{{ place.name }}</div>
        </div>
        <div class="place-card__body">
          <div class="place-card__address font-s">{{ place.address }}</div>
          <ReviewBlock :reviewRate="place.reviewRate" />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { usePlaceStore } from '@/stores/place.store';
  import type { Place } from '../model/travel.type';
  import ReviewBlock from './ReviewBlock.vue';

  const props = defineProps<{
    place: Place;
  }>();

  const place = props.place;

  const placeStore = usePlaceStore();

  const selectPlace = () => {
    placeStore.updatePlaceDetail(place);
  };
</script>

<style scoped>
  .place-card {
    width: 100%;
    height: fit-content;
    display: flex;
    align-items: center;
    flex-direction: row;
    gap: 1.5rem;
    background-color: transparent;
  }

  img {
    width: 5rem;
    height: 5rem;
    min-width: 5rem;
    min-height: 5rem;
    border-radius: 1.5rem;
    object-fit: cover;
  }

  .place-card__info {
    width: 100%;
    height: 5rem;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    padding: 0rem 0;
  }

  .place-card__header {
    width: 100%;
    height: fit-content;
    display: flex;
    flex-direction: column;
    gap: 0rem;
  }

  .place-card__body {
    width: 100%;
    height: fit-content;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
  }
</style>
