<script setup lang="ts">
  import type { SupplyItem } from './model/supply.type';

  const props = defineProps<{
    supply: SupplyItem;
  }>();
</script>

<template>
  <div class="supply-card-layout">
    <img :src="props.supply.src" />
    <div class="supply-card-header">{{ props.supply.name }}</div>
  </div>
</template>

<style scoped>
  .supply-card-layout {
    background-color: white;
    height: fit-content;
    padding: 10px;
    width: fit-content;
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 10px;
    border-radius: 10px;
  }
  .supply-card-header {
    font-size: 20px;
    font-weight: 700;
  }

  img {
    height: 30px;
    width: 30px;
  }
</style>
