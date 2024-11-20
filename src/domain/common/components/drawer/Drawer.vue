<script setup lang="ts">
  import { useRouter } from 'vue-router';
  import Button from '../../components/Button.vue';
  import Logo from '../Logo.vue';
  import DrawerButton from './DrawerButton.vue';
  import ProfileButton from './ProfileButton.vue';

  const router = useRouter();
</script>
<template>
  <div class="drawer-layout">
    <div class="logo-layout" @click="router.push({ name: 'Home' })">
      <Logo />
    </div>
    <Button value="계획 수정하기" fontSize="14px" height="46px" />
    <div class="drawer-button-layout">
      <DrawerButton text="홈" src="home" @click="router.push({ name: 'Home' })" routeName="Home" />
      <DrawerButton
        text="일정"
        src="schedule"
        @click="router.push({ name: 'Schedule' })"
        routeName="Schedule"
      />
      <DrawerButton
        text="준비물"
        src="travel_supplies"
        @click="router.push({ name: 'TravelSupplies' })"
        routeName="TravelSupplies"
      />
      <DrawerButton
        text="참여자"
        src="participants"
        @click="router.push({ name: 'Participants' })"
        routeName="Participants"
      />
    </div>
    <ProfileButton />
  </div>
</template>

<style scoped>
  .logo-layout {
    cursor: pointer;
  }

  .drawer-layout {
    display: flex;
    flex-direction: column;
    align-items: center;
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
