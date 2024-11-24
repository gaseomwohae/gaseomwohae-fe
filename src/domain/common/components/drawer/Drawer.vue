<script setup lang="ts">
  import Logo from '../Logo.vue';
  import DrawerButton from './DrawerButton.vue';
  import Button from '../../components/Button.vue';
  import ProfileButton from './ProfileButton.vue';
  import { useRouter, useRoute } from 'vue-router';
  import { useTripStore } from '@/stores/tripStore';
  import { computed, ref } from 'vue';
  import EditTripModal from '@/domain/home/components/EditTripModal.vue';
  import CreateTripModal from '@/domain/home/components/CreateTripModal.vue';

  const tripStore = useTripStore();
  const router = useRouter();
  const route = useRoute();

  const selectedTripId = computed(() => {
    return tripStore.selectedTripId;
  });

  const buttonText = computed(() => {
    return route.name === 'Home' ? '여행 계획하기' : '여행 수정하기';
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

  const showEditModal = ref(false);
  const showCreateModal = ref(false);

  const handleEditClick = () => {
    if (route.name === 'Home') {
      showCreateModal.value = true;
    } else {
      showEditModal.value = true;
    }
  };

  const handleModalClose = () => {
    showEditModal.value = false;
    showCreateModal.value = false;
  };

  const handleTripUpdate = () => {
    showEditModal.value = false;
  };

  const handleTripCreate = () => {
    showCreateModal.value = false;
  };

  const isCollapsed = ref(false);

  const toggleDrawer = () => {
    isCollapsed.value = !isCollapsed.value;
  };
</script>

<template>
  <div class="drawer-layout" :class="{ 'collapsed': isCollapsed }">
    <div class="logo-layout" @click="navigateTo('Travel')" v-if="!isCollapsed">
      <Logo />
    </div>
    <Button 
      v-show="!isCollapsed"
      :value="buttonText" 
      fontSize="14px" 
      height="46px" 
      @click="handleEditClick" 
    />
    <div class="drawer-button-layout">
      <DrawerButton 
        text="홈" 
        src="home" 
        @click="navigateTo('Travel')" 
        routeName="Travel"
        :isCollapsed="isCollapsed"
      />
      <DrawerButton
        text="일정"
        src="schedule"
        @click="navigateTo('Schedule')"
        routeName="Schedule"
        :isCollapsed="isCollapsed"
      />
      <DrawerButton
        text="준비물"
        src="travel_supplies"
        @click="navigateTo('TravelSupplies')"
        routeName="TravelSupplies"
        :isCollapsed="isCollapsed"
      />
      <DrawerButton
        text="참여자"
        src="participants"
        @click="navigateTo('Participants')"
        routeName="Participants"
        :isCollapsed="isCollapsed"
      />
    </div>
    <EditTripModal 
      :show="showEditModal"
      @close="handleModalClose"
      @update="handleTripUpdate"
    />
    <CreateTripModal 
      :show="showCreateModal"
      @close="handleModalClose"
      @create="handleTripCreate"
    />
    
    <button class="toggle-button" @click="toggleDrawer">
      <img
        :src="isCollapsed ? '/src/assets/icons/open.png' : '/src/assets/icons/close.png'"
        alt="toggle drawer"
      />
    </button>
    <ProfileButton :isCollapsed="isCollapsed" />

  </div>
</template>

<style scoped>
  .logo-layout {
    cursor: pointer;
  }

  .drawer-layout {
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
    background-color: #fff;
    gap: 40px;
    padding: 30px;
    border-radius: 20px;
    min-width: 290px;
    height: 100%;
    transition: min-width 0.3s ease;
  }

  .drawer-layout.collapsed {
    min-width: 100px;
    padding: 30px 10px;
  }

  .drawer-button-layout {
    display: flex;
    flex-direction: column;
    align-items: start;
    width: 100%;
    gap: 20px;
  }

  .toggle-button {
    position: absolute;
    right: -20px;
    top: 50%;
    transform: translateY(-50%);
    width: 40px;
    height: 40px;
    border-radius: 50%;
    background-color: white;
    border: 1px solid rgba(0, 0, 0, 0.1);
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  }

  .toggle-button img {
    width: 0.5rem;
    height: 1rem;
  }

  .toggle-button:hover {
    background-color: #f5f5f5;
  }

  .profile-button-layout {
    margin-top: auto;
  }
</style>
