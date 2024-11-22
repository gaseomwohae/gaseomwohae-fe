<script setup lang="ts">
  import Drawer from '@/domain/common/components/drawer/Drawer.vue';
  import Header from '@/domain/common/components/header/Header.vue';
</script>

<template>
  <div class="dashboard-layout">
    <Drawer />
    <div class="dashboard-content-layout">
      <Header />
      <div class="dashboard-content-layout-inner">
        <router-view />
      </div>
    </div>
  </div>
</template>

<style scoped>
  .dashboard-layout {
    display: flex;
    flex-direction: row;
    width: fit-content;
    width: 100%;
    gap: 40px;
    height: calc(100vh - 60px);
  }

  .dashboard-content-layout {
    height: 100%;
    width: calc(100vw - 290px);
    display: flex;
    flex-direction: column;
    gap: 30px;
  }

  .dashboard-content-layout-inner {
    height: calc(100vh - 170px);
  }
</style>
