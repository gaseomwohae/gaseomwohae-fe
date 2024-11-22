<script setup lang="ts">
  import Button from './Button.vue';
</script>

<template>
  <div class="none-select-travel-layout">
    <p class="none-select-travel-text">헉!</p>
    <p class="none-select-travel-sub-text">아직 계획중인 여행이 없어요.😢</p>
    <p class="none-select-travel-sub-detail-text">
      새로운 여행 계획을 세우거나 기존 여행을 선택해주세요.
    </p>
  </div>
</template>

<style scoped>
  .none-select-travel-layout {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: 100%;
    gap: 20px;
  }
  .none-select-travel-text {
    font-size: 150px;
    font-weight: 800;
  }
  .none-select-travel-sub-text {
    font-size: 24px;
    font-weight: 800;
  }
  .none-select-travel-sub-detail-text {
    font-size: 14px;
    font-weight: 400;
  }
</style>
