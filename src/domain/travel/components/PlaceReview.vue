<template>
  <div class="place-review">
    <div class="place-review__header">
      <div class="place-review__header__info">
        <div class="place-review__header__profile">
          <img :src="review?.user?.profile" />
          <div class="place-review__header__name font-m font-bold">
            {{ review?.user?.name }}
          </div>
        </div>
        <div class="place-review__header__rate">
          <ReviewBlock :reviewRate="review?.reviewRate" />
        </div>
      </div>
      <div class="place-review__header__date font-caption">{{ review?.createdAt }}</div>
    </div>
    <div class="place-review__content">
      <img :src="review?.photo" />
      <div class="place-review__content__text font-s" v-html="review?.reviewText"></div>
    </div>
  </div>
</template>

<script setup lang="ts">
  import type { Review } from '../model/travel.type';
  import ReviewBlock from './ReviewBlock.vue';

  defineProps<{
    review: Review;
  }>();
</script>

<style scoped>
  .place-review__header__profile img {
    width: 1.8rem;
    height: 1.8rem;
    border-radius: 1rem;
  }

  .place-review__header__profile {
    display: flex;
    align-items: center;
    gap: 0.5rem;
  }

  .place-review__header__info {
    display: flex;
    align-items: center;
    gap: 0.5rem;
  }

  .place-review__header {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .place-review__content img {
    width: 10rem;
    height: 10rem;
    border-radius: 1rem;
    object-fit: cover;
  }

  .place-review__content {
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }

  .place-review {
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }
</style>
