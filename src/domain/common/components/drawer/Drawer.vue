<script setup lang="ts">
  import Logo from '../Logo.vue';
  import DrawerButton from './DrawerButton.vue';
  import Button from '../../components/Button.vue';
  import ProfileButton from './ProfileButton.vue';
  import { useRouter } from 'vue-router';
  import { useTripStore } from '@/stores/tripStore';
  import { computed } from 'vue';

  const tripStore = useTripStore();
  const router = useRouter();

  const selectedTripId = computed(() => {
    return tripStore.selectedTripId;
  });

  const buttonText = computed(() => {
    return selectedTripId.value !== null ? '계획 수정하기' : '여행 계획하기';
  });

  const navigateTo = (name: string) => {
    if (selectedTripId.value !== null) {
      router.push({ name: name, params: { id: selectedTripId.value } });
    }
  };

  const navigateToTravel = () => {
    if (selectedTripId.value !== null) {
      router.push({ name: 'Travel', params: { id: selectedTripId.value } });
    }
  };
</script>

<template>
  <div class="drawer-layout">
    <div class="logo-layout" @click="navigateTo('Travel')">
      <Logo />
    </div>
    <Button :value="buttonText" fontSize="14px" height="46px" @click="navigateToTravel" />
    <div class="drawer-button-layout">
      <DrawerButton text="홈" src="home" @click="navigateTo('Travel')" routeName="Travel" />
      <DrawerButton
        text="일정"
        src="schedule"
        @click="navigateTo('Schedule')"
        routeName="Schedule"
      />
      <DrawerButton
        text="준비물"
        src="travel_supplies"
        @click="navigateTo('TravelSupplies')"
        routeName="TravelSupplies"
      />
      <DrawerButton
        text="참여자"
        src="participants"
        @click="navigateTo('Participants')"
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
    min-width: 290px;
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
