<template>
  <div class="auth-header-layout">
    <p class="auth-header-font">새로운 시작, 새로운 여행</p>
    <p class="auth-header-font"><Logo /> 에서 시작해보세요.</p>
  </div>
</template>

<script setup>
  import Logo from '@/domain/common/components/Logo.vue';
</script>

<style scoped>
  .auth-header-layout {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 0px;
    margin: 0;
  }

  .auth-header-font {
    font-size: 24px;
    font-weight: bold;
  }
</style>
