<script setup lang="ts">
  const props = defineProps<{
    text: string;
  }>();

  const emit = defineEmits(['selectItem']);

  const onSelectItem = () => {
    emit('selectItem');
  };
</script>

<template>
  <div class="drop-down-item" @click="onSelectItem">
    <span class="drop-down-item-text">{{ props.text }}</span>
  </div>
</template>

<style scoped>
  .drop-down-item {
    padding: 20px 13.5px;
  }
  .drop-down-item-text {
    font-size: 12px;
    font-weight: 400;
  }

  .drop-down-item:first-child {
    border-top-left-radius: 10px;
    border-top-right-radius: 10px;
  }

  .drop-down-item:last-child {
    border-bottom-left-radius: 10px;
    border-bottom-right-radius: 10px;
  }

  .drop-down-item:hover {
    background-color: #faf9ff;
    cursor: pointer;
  }
</style>
