<template>
  <div class="store-search">
    <SearchBar />
    <StoreList />
  </div>
</template>

<script setup lang="ts">
  import SearchBar from '@/domain/common/components/SearchBar.vue';
  import StoreList from './StoreList.vue';
</script>

<style scoped>
  .store-search {
    min-width: 25rem;
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
    padding: 1rem;
    height: 100%;
    background-color: #faf9ff;
    border-radius: 1.5rem;
  }
</style>
