<template>
  <div class="time-slot">
    <span class="time-slot__time font-caption">{{ time }}</span>
  </div>
</template>

<script setup lang="ts">
  defineProps<{
    time: string;
  }>();
</script>

<style scoped>
  .time-slot {
    display: flex;
    flex-direction: row;
    align-items: center;
    padding: 0.5rem;
    width: 100%;
    height: 8rem;
    background-color: #faf9ff;
    border-bottom: dashed 0.00625rem #00000020;
    user-select: none;
  }
</style>
