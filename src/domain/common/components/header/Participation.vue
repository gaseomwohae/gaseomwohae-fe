<script setup lang="ts">
  import Profile from './Profile.vue';
</script>

<template>
  <div class="participation-layout">
    <Profile />
    <Profile />
  </div>
</template>

<style scoped>
  .participation-layout {
    display: flex;
    flex-direction: row;
    gap: 20px;
    align-items: center;
    justify-content: center;
  }
</style>
