<script setup lang="ts">
  import type { CheckItem } from '@/domain/home/model/check_item.type';
  const props = defineProps<{
    checkItem: CheckItem;
  }>();
</script>
<template>
  <div class="check-item-layout">
    <input type="checkbox" :checked="props.checkItem.isChecked" :id="props.checkItem.title" />
    <label class="check-item-title-text" :for="props.checkItem.title">{{
      props.checkItem.title
    }}</label>
  </div>
</template>

<style scoped>
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
