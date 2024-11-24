<script setup lang="ts">
  import DropDownItem from '../DropDownItem.vue';
  import { ref } from 'vue';

  defineProps<{
    isCollapsed?: boolean;
  }>();

  const isOpen = ref(false);

  const toggleDropdown = () => {
    console.log('onToggleDropDown', !isOpen.value);
    isOpen.value = !isOpen.value;
  };

  const onSelectItem = () => {
    isOpen.value = false;
  };
</script>

<template>
  <div class="profile-button-container">
    <button 
      class="profile-button-layout profile-button profile-font" 
      :class="{ 'collapsed': isCollapsed }"
      @click="toggleDropdown"
    >
      <div class="profile-layout">
        <img src="/src/assets/icons/profile.png" alt="profile" class="profile-layout" />
        <div class="profile-badge"></div>
      </div>
      <span v-show="!isCollapsed">프로필</span>
    </button>
    <transition name="fade">
      <div v-show="isOpen" class="drop-down-item-container">
        <DropDownItem text="내 정보" @selectItem="onSelectItem" />
        <DropDownItem text="로그아웃" @selectItem="onSelectItem" />
      </div>
    </transition>
  </div>
</template>

<style scoped>
  .profile-button-container {
    width: 100%;
    position: relative;
    margin-top: auto;
  }

  .drop-down-item-container {
    background-color: white;
    position: absolute;
    top: 100%;
    border-radius: 10px;
    display: flex;
    flex-direction: column;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    width: 250px;
    opacity: 1;
    transform: translateY(-180px);
    transition:
      opacity 0.2s ease-in-out,
      transform 0.2s ease-in-out;
  }

  .fade-enter-active,
  .fade-leave-active {
    transition:
      opacity 0.2s ease-in-out,
      transform 0.2s ease-in-out;
  }

  .fade-enter-from,
  .fade-leave-to {
    opacity: 0;
    transform: translateY(-160px);
  }

  .fade-enter-to,
  .fade-leave-from {
    opacity: 1;
    transform: translateY(-180px);
  }

  .profile-button-layout {
    display: flex;
    flex-direction: row;
    align-items: center;
    padding: 10px;
    gap: 10px;
    transition: all 0.3s ease;
  }

  .profile-button-layout.collapsed {
    justify-content: center;
  }

  .profile-button {
    width: 100%;
    height: 55px;
    border-radius: 20px;
    background-color: #fff;
    cursor: pointer;
    border: 1px solid rgba(0, 0, 0, 0.2);
  }

  .profile-button:hover {
    background-color: #faf9ff;
  }

  .profile-font {
    font-size: 16px;
    font-weight: 400;
  }

  img {
    height: 35px;
    width: 35px;
  }

  .profile-layout {
    position: relative;
  }

  .profile-badge {
    display: inline-block; /* todo 초대 알림이 올 시 display 변경 */
    position: absolute;
    right: 0px;
    top: 0px;
    width: 8px;
    height: 8px;
    border-radius: 50%;
    background-color: #3a6ff9;
  }
</style>
