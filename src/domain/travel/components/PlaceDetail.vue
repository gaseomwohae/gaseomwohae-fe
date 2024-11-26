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
        <button class="create-review-button" @click="createReviewModalRef.openModal">
          리뷰 생성
        </button>
      </div>
      <div class="place-review__review-section__reviews">
        <div v-for="review in placeDetail?.reviews" :key="review.id">
          <PlaceReview :review="review" />
        </div>
      </div>
    </div>
    <CreateReviewModal ref="createReviewModalRef" />
  </div>
</template>

<script setup lang="ts">
  import PlaceReview from './PlaceReview.vue';
  import { usePlaceStore } from '@/stores/place.store';
  import { storeToRefs } from 'pinia';
  import PlaceSummary from './PlaceSummary.vue';
  import CreateReviewModal from '@/domain/review/components/CreateReviewModal.vue';
  import { ref } from 'vue';

  const placeStore = usePlaceStore();
  const { placeDetail } = storeToRefs(placeStore);

  const createReviewModalRef = ref();
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

  .place-review__place-section__description {
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

  .create-review-button {
    margin-left: auto;
    padding: 0.5rem 1rem;
    background-color: #4caf50;
    color: white;
    border: none;
    border-radius: 0.25rem;
    cursor: pointer;
  }
</style>
