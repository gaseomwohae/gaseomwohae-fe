<template>
  <div class="user-review">
    <div class="user-review__header">
      <div class="user-review__header__info">
        <div class="user-review__header__profile">
          <img :src="review?.userInfo?.profile" />
          <div class="user-review__header__name font-m font-bold">{{ review?.userInfo?.name }}</div>
        </div>
        <div class="user-review__header__rate">
          <ReviewRate :reviewRate="review?.rate" />
        </div>
      </div>
      <div class="user-review__header__date font-caption">{{ review?.createdAt }}</div>
    </div>
    <div class="user-review__content">
      <img :src="review?.photo" />
      <div class="user-review__content__text font-s" v-html="review?.review"></div>
    </div>
  </div>
</template>

<script setup lang="ts">
  import type { UserReview } from '../model/store.type';
  import ReviewRate from './ReviewRate.vue';

  defineProps<{
    review: UserReview;
  }>();
</script>

<style scoped>
  .user-review__header__profile img {
    width: 1.8rem;
    height: 1.8rem;
    border-radius: 1rem;
  }

  .user-review__header__profile {
    display: flex;
    align-items: center;
    gap: 0.5rem;
  }

  .user-review__header__info {
    display: flex;
    align-items: center;
    gap: 0.5rem;
  }

  .user-review__header {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .user-review__content img {
    width: 10rem;
    height: 10rem;
    border-radius: 1rem;
    object-fit: cover;
  }

  .user-review__content {
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }

  .user-review {
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }
</style>
