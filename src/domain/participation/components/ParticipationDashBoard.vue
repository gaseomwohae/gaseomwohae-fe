<script setup lang="ts">
  import ParticipationProfile from './ParticipationProfile.vue';
  import { ref } from 'vue';
  import DropDownItem from '../../common/components/DropDownItem.vue';
  const isOpen = ref(false);
  import AcceptLottie from '@/domain/common/components/AcceptLottie.vue';

  const lottieAnimation = ref<any>(null);

  const onMenuClick = () => {
    isOpen.value = !isOpen.value;
  };

  const showAnimation = () => {
    lottieAnimation.value.showAnimation();
  };
  const onSelectItem = () => {
    isOpen.value = false;
    showAnimation();
  };
</script>

<template>
  <div class="participation-dash-outside-layout">
    <AcceptLottie ref="lottieAnimation" title="초대가 완료되었습니다." />
    <div class="participation-dash-menu-layout">
      <img src="/src/assets/icons/menu.png" @click="onMenuClick" />
      <transition name="fade">
        <div v-show="isOpen" class="drop-down-item-container">
          <DropDownItem text="초대하기" @selectItem="onSelectItem" />
          <DropDownItem id="app" text="추방하기" @selectItem="onSelectItem" />
        </div>
      </transition>
    </div>

    <div class="participation-dash-board-layout">
      <ParticipationProfile />
      <ParticipationProfile />
      <ParticipationProfile />
      <ParticipationProfile />
    </div>
  </div>
</template>

<style scoped>
  img {
    width: 48px;
    height: 48px;
  }

  img:hover {
    cursor: pointer;
  }

  .participation-dash-outside-layout {
    background-color: white;
    height: 100%;
    width: 100%;
    border-radius: 20px;
    padding: 100px;
    display: flex;
    flex-direction: column;
    gap: 20px;
    align-items: end;
  }

  .participation-dash-board-layout {
    display: flex;
    flex-direction: row;
    width: 100%;
    height: 100%;
    flex-wrap: wrap;
    gap: 60px;
  }

  .drop-down-item-container {
    background-color: white;
    position: absolute;
    top: 30%;
    transform: translate(-80%, 0px);
    border-radius: 10px;
    display: flex;
    flex-direction: column;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    width: 250px;
    opacity: 1;
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
    transform: translate(-80%, -30px);
  }

  .fade-enter-to,
  .fade-leave-from {
    opacity: 1;
    transform: translate(-80%, 0px);
  }
</style>
