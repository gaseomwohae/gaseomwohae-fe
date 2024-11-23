<script setup lang="ts">
  import type { SupplyItem } from '@/domain/supply/components/model/supply.type';
  const props = defineProps<{
    supply: SupplyItem;
  }>();
</script>
<template>
  <div class="check-item-layout">
    <!-- <input type="checkbox" :checked="props.checkItem.isChecked" :id="props.checkItem.title" />
    <label class="check-item-title-text" :for="props.checkItem.title">{{
      props.checkItem.title
    }}</label> -->

    <img :src="props.supply.src" /> 
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
    font-weight: 400;
  }
</style>
