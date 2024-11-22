<script setup lang="ts">
  import type { TripSimpleList } from '@/domain/common/model/TripSimple.type';

  import { ref } from 'vue';
  import { useTripStore } from '@/stores/tripStore';
  import { useRouter } from 'vue-router';
  const tripStore = useTripStore();
  const router = useRouter();
  const props = defineProps<{
    tripSimpleList: TripSimpleList;
    selectedTripId: number | null;
  }>();

  const isOpen = ref(false);

  const onToggleDropDown = () => {
    console.log('onToggleDropDown', !isOpen.value);
    isOpen.value = !isOpen.value;
  };

  const onSelectItem = (id: number) => {
    isOpen.value = false;
    tripStore.setSelectedTripId(id);
    router.replace({ name: 'Travel', params: { id: id.toString() } });
  };

  const showCreateTripModal = () => {
    isOpen.value = false;
  };
</script>

<template>
  <div class="header-drop-down-layout">
    <div class="header-drop-down-text-container" @click="onToggleDropDown">
      <span class="header-drop-down-text">{{
        props.selectedTripId
          ? props.tripSimpleList.find((trip) => trip.id === props.selectedTripId)?.name
          : '여행 선택'
      }}</span>
      <img src="/src/assets/icons/chevron_down.png" />
    </div>

    <transition name="fade">
      <div v-show="isOpen" class="drop-down-item-container">
        <div
          v-for="trip in props.tripSimpleList"
          :key="trip.id"
          class="drop-down-item"
          @click="onSelectItem(trip.id)"
        >
          <span class="drop-down-item-text">{{ trip.name }}</span>
        </div>

        <!-- <div class="drop-down-item" @click="onSelectItem">
          <span class="drop-down-item-text">부산여행</span>
        </div>
        <div class="drop-down-item" @click="onSelectItem">
          <span class="drop-down-item-text">부산여행</span>
        </div>
        <div class="drop-down-item" @click="onSelectItem">
          <span class="drop-down-item-text">부산여행</span>
        </div> -->

        <div class="drop-down-item" @click="showCreateTripModal">
          <span class="drop-down-item-add-text">+ 새로 추가하기</span>
        </div>
      </div>
    </transition>
  </div>
</template>

<style scoped>
  .header-drop-down-layout {
    position: relative;
    z-index: 2;
  }

  .header-drop-down-text {
    font-size: 24px;
    font-weight: 700;
  }

  .drop-down-item-container {
    background-color: white;
    position: absolute;
    top: 140%;
    border-radius: 10px;
    display: flex;
    flex-direction: column;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    width: 250px;
    opacity: 1;
    transform: translateY(10px);
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
    transform: translateY(0px);
  }

  .fade-enter-to,
  .fade-leave-from {
    opacity: 1;
    transform: translateY(10px);
  }

  .header-drop-down-text-container {
    cursor: pointer;
    display: flex;
    flex-direction: row;
    align-items: end;
    gap: 8px;
    font-size: 24px;
    font-weight: 700;
  }
  .drop-down-item {
    padding: 20px 13.5px;
  }
  .drop-down-item-text {
    font-size: 12px;
    font-weight: 400;
  }

  .drop-down-item:first-child {
    border-top-left-radius: 10px;
    border-top-right-radius: 10px;
  }

  .drop-down-item:last-child {
    border-bottom-left-radius: 10px;
    border-bottom-right-radius: 10px;
  }

  .drop-down-item:hover {
    background-color: #faf9ff;
    cursor: pointer;
  }

  .drop-down-item-add-text {
    font-size: 12px;
    font-weight: 800;
    color: #346aff;
  }
</style>
