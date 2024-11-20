<script setup lang="ts">
  import Logo from '../Logo.vue';
  import DrawerButton from './DrawerButton.vue';
  import Button from '../../components/Button.vue';
  import ProfileButton from './ProfileButton.vue';
  import { useRouter } from 'vue-router';

  const router = useRouter();
</script>
<template>
  <div class="drawer-layout">
    <div class="logo-layout" @click="router.push({ name: 'Travel', params: { id: '1' } })">
      <Logo />
    </div>
    <Button value="계획 수정하기" fontSize="14px" height="46px" />
    <div class="drawer-button-layout">
      <DrawerButton
        text="홈"
        src="home"
        @click="router.push({ name: 'Travel', params: { id: '1' } })"
        routeName="Travel"
      />
      <DrawerButton
        text="일정"
        src="schedule"
        @click="router.push({ name: 'Schedule', params: { id: '1' } })"
        routeName="Schedule"
      />
      <DrawerButton
        text="준비물"
        src="travel_supplies"
        @click="router.push({ name: 'TravelSupplies', params: { id: '1' } })"
        routeName="TravelSupplies"
      />
      <DrawerButton
        text="참여자"
        src="participants"
        @click="router.push({ name: 'Participants', params: { id: '1' } })"
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
    height: 100%;
  }

  .drawer-button-layout {
    display: flex;
    flex-direction: column;
    align-items: start;
    width: 100%;
    gap: 20px;
  }
</style>
