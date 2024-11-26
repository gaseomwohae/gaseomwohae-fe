<template>
  <div v-if="placeDetail" class="place-review" :key="placeDetail.id">
    <div class="place-review__place-section">
      <div class="place-review__place-section__summary">
        <PlaceSummary
          :place="{
            id: placeDetail.id,
            name: placeDetail.name,
            address: placeDetail.address,
            category: placeDetail.category,
            thumbnail: placeDetail.thumbnail,
            roadAddress: placeDetail.roadAddress,
            phone: placeDetail.phone,
            url: placeDetail.url,
            x: placeDetail.x,
            y: placeDetail.y,
            createdAt: placeDetail.createdAt,
            updatedAt: placeDetail.updatedAt,
            deletedAt: placeDetail.deletedAt,
            rating: placeDetail.rating,
          }"
        />
      </div>
    </div>

    <div class="place-review__review-section">
      <div class="place-review__review-section__header font-2xl font-bold">
        리뷰({{ placeDetail?.reviews.length }})
      </div>
      <div class="place-review__review-section__reviews">
        <div v-for="review in placeDetail?.reviews" :key="review.id">
          <PlaceReview :review="review" />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { usePlaceStore } from '@/stores/place.store';
  import { storeToRefs } from 'pinia';
  import PlaceSummary from './PlaceSummary.vue';

  const placeStore = usePlaceStore();
  const { placeDetail } = storeToRefs(placeStore);
</script>

<style scoped>
  .place-review {
    min-width: 25rem;
    width: 25rem;
    height: 100%;
    display: flex;
    flex-direction: column;
    gap: 1rem;
    background-color: #faf9ff;
    padding: 1rem;
    border-radius: 1.5rem;
    overflow: auto;
  }

  .place-review__place-section {
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
    background-color: #ffffff;
    border-radius: 1.5rem;
    padding: 1.5rem;
  }

  .place-review__ place-section__description {
    letter-spacing: 0.02rem;
    line-height: 1.3;
  }

  .place-review__review-section {
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 2rem;
    background-color: #ffffff;
    border-radius: 1.5rem;
    padding: 1.5rem;
  }

  .place-review__review-section__reviews {
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
  }
</style>
