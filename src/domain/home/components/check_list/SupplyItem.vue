<script setup lang="ts">
  import type { SupplyItem } from '@/domain/supply/components/model/supply.type';
  const props = defineProps<{
    supply: SupplyItem;
  }>();
</script>
<template>
  <div class="check-item-layout">
    <img :src="props.supply.image" />
    <div class="check-item-title-text">{{ props.supply.name }}</div>
  </div>
</template>

<style scoped>
  img {
    width: 30px;
    height: 30px;
  }
  .check-item-layout {
    display: flex;
    flex-direction: row !important;
    gap: 10px;
  }

  .check-item-title-text {
    font-size: 14px;
    font-weight: 700;
  }
</style>
