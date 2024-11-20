<template>
  <div class="review-container">
    <img src="@/assets/images/star.png" />
    <span class="review-rate font-xs">{{ reviewRate }}</span>
  </div>
</template>

<script setup lang="ts">
  defineProps<{
    reviewRate: number;
  }>();
</script>

<style scoped>
  .review-container {
    width: fit-content;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 0.25rem;
  }

  img {
    width: 0.75rem;
    height: 0.75rem;
  }

  .review-rate {
    height: 0.75rem;
  }
</style>
