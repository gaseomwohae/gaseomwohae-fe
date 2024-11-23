<script setup lang="ts">
  import SupplyCard from './SupplyCard.vue';
  import type { SupplyItem } from './model/supply.type';
  const props = defineProps<{ 
    supplies: SupplyItem[]; 
    backgroundColor: string;
  }>();
</script>

<template>
  <div class="supply-component-outside-layout" :style="{ backgroundColor: props.backgroundColor }">
    <slot name="header"></slot>

    <div class="supply-component-layout">
      <SupplyCard v-for="supply in props.supplies" :supply="supply" :key="supply.name" />
    </div>
  </div>
</template>

<style scoped>
  .supply-component-layout {
    display: flex;
    flex-direction: row;
    width: fit-content;
    flex-wrap: wrap;
    gap: 20px;
  }

  .supply-component-outside-layout {
    width: 100%;
    height: fit-content;
    padding: 30px 45px;
    border-radius: 20px;
    gap: 30px;
    display: flex;
    flex-direction: column;
  }

  .supply-component-header-title {
    font-size: 20px;
    font-weight: 700;
  }
</style>
