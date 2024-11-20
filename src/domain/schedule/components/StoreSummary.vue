<template>
  <div class="store-card">
    <img :src="storeData.img" alt="store" />
    <div class="store-card__info">
      <div class="store-card__header">
        <div class="store-card__category font-caption">{{ storeData.category }}</div>
        <div class="store-card__name font-l font-bold">{{ storeData.name }}</div>
      </div>
      <div class="store-card__body">
        <div class="store-card__address font-s">{{ storeData.address }}</div>
        <ReviewRate :reviewRate="storeData.reviewRate" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
  import type { Store } from '../model/store.type';
  import ReviewRate from './ReviewRate.vue';

  const storeData = withDefaults(defineProps<Store>(), {
    id: 1,
    img: 'https://search.pstatic.net/common/?src=https%3A%2F%2Fldb-phinf.pstatic.net%2F20230328_14%2F16799977826750ra8V_JPEG%2F320387422_892651581733361_6537465896771139005_n.jpg',
    category: '햄버거',
    name: '버거베이',
    address: '부산시 기장군',
    reviewRate: 4.5,
    description: '맛있는 햄버거 맛집',
  });
</script>

<style scoped>
  .store-card {
    width: 100%;
    height: fit-content;
    display: flex;
    align-items: center;
    flex-direction: row;
    gap: 1.5rem;
    background-color: #fff;
    border-radius: 1.5rem;
    padding: 1rem;
  }

  img {
    width: 6rem;
    height: 6rem;
    border-radius: 1.5rem;
  }

  .store-card__info {
    width: 100%;
    height: 6rem;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    padding: 0.5rem 0;
  }

  .store-card__header {
    width: 100%;
    height: fit-content;
    display: flex;
    flex-direction: column;
    gap: 0.25rem;
  }

  .store-card__body {
    width: 100%;
    height: fit-content;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
  }
</style>
./ReviewRate.vue
