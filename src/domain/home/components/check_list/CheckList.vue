<script setup lang="ts">
  import CheckItemComponent from './CheckItem.vue';
  import type { CheckItem } from '@/domain/home/model/check_item.type';
  const checkItems: CheckItem[] = [
    { title: '체크리스트 1', isChecked: false },
    { title: '체크리스트 2', isChecked: false },
    { title: '체크리스트 3', isChecked: false },
  ];
</script>

<template>
  <div class="check-list-layout">
    <div class="check-list-title-text">체크리스트</div>
    <div class="check-item-layout">
      <CheckItemComponent
        v-for="checkItem in checkItems"
        :key="checkItem.title"
        :checkItem="checkItem"
      />
    </div>
  </div>
</template>

<style scoped>
  .check-list-layout {
    height: 100%;
    background-color: white;
    border-radius: 20px;
    padding: 30px;
    display: flex;
    flex-direction: column;
    gap: 10px;
  }
  .check-list-title-text {
    font-size: 20px;
    font-weight: 700;
    color: #9aa2ad;
  }
  .check-item-layout {
    display: flex;
    flex-direction: column;
    gap: 10px;
  }
</style>
