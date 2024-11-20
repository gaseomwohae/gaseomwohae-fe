<script setup>
  import Logo from '../Logo.vue';
  import DrawerButton from './DrawerButton.vue';
</script>
<template>
  <div class="drawer-layout">
    <Logo />
    <div class="drawer-button-layout">
      <DrawerButton text="홈" src="home" />
      <DrawerButton text="일정" src="schedule" />
      <DrawerButton text="준비물" src="travel_supplies" />
      <DrawerButton text="참여자" src="participants" />
    </div>
  </div>
</template>

<style scoped>
  .drawer-layout {
    display: flex;
    flex-direction: column;
    align-items: start;
    background-color: #fff;
    gap: 40px;
    padding: 30px;
    border-radius: 20px;
    width: 290px;
    height: 100vh;
  }

  .drawer-button-layout {
    display: flex;
    flex-direction: column;
    align-items: start;
    width: 100%;
    gap: 20px;
  }
</style>
