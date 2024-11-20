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
  import { ref } from 'vue';

  const searchValue = ref<string>('');

  const handleInput = () => {
    console.log(searchValue.value);
  };
</script>

<style scoped>
  .search-bar {
    position: relative;
    width: 100%;
  }

  .search-input {
    width: 100%;
    height: fit-content;
    border: solid 0.125rem #3a6ff9;
    border-radius: 1rem;
    padding: 1rem;
  }

  .search-icon {
    position: absolute;
    right: 1rem;
    top: 35%;
    width: 1rem;
    height: 1rem;
  }
</style>
