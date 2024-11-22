<template>
  <div v-if="store">
    <div class="store-card" @click="selectStore">
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
  </div>
</template>

<script setup lang="ts">
  import type { Store } from '../model/store.type';
  import ReviewRate from './ReviewRate.vue';
  const props = defineProps<{
    store: Store;
  }>();

  const storeData = props.store;

  const emits = defineEmits(['selectStore']);

  function selectStore() {
    emits('selectStore', storeData.id);
  }
</script>

<style scoped>
  .store-card {
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

  .store-card__info {
    width: 100%;
    height: 5rem;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    padding: 0rem 0;
  }

  .store-card__header {
    width: 100%;
    height: fit-content;
    display: flex;
    flex-direction: column;
    gap: 0rem;
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
