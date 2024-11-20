<template>
  <div class="side-bar">
    <StoreSearch />
    <StoreReview />
  </div>
</template>

<script setup lang="ts">
  import StoreReview from './StoreReview.vue';
  import StoreSearch from './StoreSearch.vue';
</script>

<style scoped>
  .side-bar {
    display: flex;
    flex-direction: row;
    gap: 20px;
    background-color: #f5f5f5;
  }
</style>
