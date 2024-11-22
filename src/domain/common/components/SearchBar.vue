<template>
  <div class="search-bar">
    <input
      class="search-input font-xs font-bold"
      type="text"
      v-model="searchValue"
      placeholder="방문하고 싶은 곳을 검색해보세요"
      @keyup.enter="handleInput"
    />
    <img class="search-icon" src="@/assets/icons/search.png" alt="search" />
  </div>
</template>

<script setup lang="ts">
  import type { Store } from '@/domain/schedule/model/store.type';
  import { searchPlaces } from '@/domain/schedule/utils/map.util';
  import { useStoreStore } from '@/stores/store';
  import { ref } from 'vue';
  const searchValue = ref<string>('');
  const store = useStoreStore();

  const handleInput = async () => {
    const stores: Store[] = await searchPlaces(searchValue.value);
    store.setSearchedStores(stores);
  };
</script>

<style scoped>
  .search-bar {
    position: sticky;
    position: relative;
    width: 100%;
  }

  .search-input {
    width: 100%;
    height: 4rem;
    border: solid 0.25rem #3a6ff9;
    border-radius: 1.5rem;
    padding: 1rem;
    font-size: 1rem;
    background-color: #ffffff;
  }

  .search-icon {
    position: absolute;
    right: 1rem;
    top: 30%;
    width: 1.5rem;
    height: 1.5rem;
  }
</style>
