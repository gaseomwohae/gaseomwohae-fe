<script setup lang="ts">
  defineProps<{
    title: string;
    content: string;
    subContent?: string;
  }>();
</script>

<template>
  <div class="info-card-layout">
    <div class="info-card-title-text">{{ title }}</div>
    <div class="info-card-content-text">{{ content }}</div>
    <div class="info-card-sub-content-text">{{ subContent }}</div>
  </div>
</template>

<style scoped>
  .info-card-layout {
    width: 250px;
    display: flex;
    flex-direction: column;
    padding: 30px;
    background-color: white;
    border-radius: 25px;
    gap: 15px;
    height: fit-content;
  }

  .info-card-title-text {
    font-size: 20px;
    font-weight: 700;
    color: #9aa2ad;
  }

  .info-card-content-text {
    font-size: 28px;
    font-weight: 800;
    color: black;
  }
  .info-card-sub-content-text {
    font-size: 14px;
    font-weight: 700;
    color: black;
  }
</style>
