<template>
  <div v-if="storeReview" class="store-review">
    <div class="store-review__store-section">
      <div class="store-review__store-section__summary">
        <StoreSummary :store="storeReview?.name" />
      </div>
      <div class="store-review__store-section__description" v-html="storeReview?.description"></div>
    </div>

    <div class="store-review__review-section">
      <div class="store-review__review-section__header font-2xl font-bold">
        리뷰({{ storeReview?.reviews.length }})
      </div>
      <div class="store-review__review-section__reviews">
        <div v-for="review in storeReview?.reviews" :key="review.id">
          <UserReview :review="review" />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { useStoreStore } from '@/stores/store';
  import { ref, watch } from 'vue';
  import type { StoreReview } from '../model/store.type';
  import storeService from '../service/store.service';
  import StoreSummary from './StoreSummary.vue';
  import UserReview from './UserReview.vue';

  const storeReview = ref<StoreReview | null>(null);
  const storeStore = useStoreStore();

  watch(
    () => storeStore.selectedStoreId,
    async (newId) => {
      if (newId !== null) {
        storeReview.value = await storeService.getReview(newId);
      } else {
        storeReview.value = null;
      }
    },
  );
</script>

<style scoped>
  .store-review {
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

  .store-review__store-section {
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
    background-color: #ffffff;
    border-radius: 1.5rem;
    padding: 1.5rem;
  }

  .store-review__store-section__description {
    letter-spacing: 0.02rem;
    line-height: 1.3;
  }

  .store-review__review-section {
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 2rem;
    background-color: #ffffff;
    border-radius: 1.5rem;
    padding: 1.5rem;
  }

  .store-review__review-section__reviews {
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
  }
</style>
