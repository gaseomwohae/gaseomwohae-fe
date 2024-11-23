<script setup lang="ts">
import type { TripSimpleList } from '@/domain/common/model/TripSimple.type';
import CreateTripModal from '@/domain/home/components/CreateTripModal.vue';
import AcceptLottie from '../AcceptLottie.vue';
import { ref, onMounted, watch } from 'vue';
import { useTripStore } from '@/stores/tripStore';
import { storeToRefs } from 'pinia';
import { useRouter, useRoute } from 'vue-router';

const tripStore = useTripStore();
const { tripSimpleList, selectedTripId } = storeToRefs(tripStore);
const router = useRouter();
const route = useRoute();

const isOpen = ref(false);
const showCreateModal = ref(false);
const acceptLottieRef = ref();

// tripStore의 tripSimpleList와 route.params.id를 동시에 감시
watch(
  [() => tripStore.tripSimpleList, () => route.params.id],
  async ([tripList, newId]) => {
    if (!newId) return;

    const numericId = parseInt(newId as string);
    console.log('Current ID:', numericId, typeof numericId);
    console.log('TripStore List:', tripList, typeof tripList);
    console.log('TripList IDs:', tripList.map(trip => ({ id: trip.id, type: typeof trip.id })));
    
    const tripExists = tripList.some(trip => {
      console.log('Comparing:', trip.id, typeof trip.id, 'with', numericId, typeof numericId);
      return trip.id === numericId;
    });
    
    console.log('Trip exists:', tripExists);

    if (tripExists) {
      tripStore.setSelectedTripId(numericId);
    } else if (route.name !== 'Home') {
      try {
        await acceptLottieRef.value?.showAnimation();
        await router.push({ name: 'Home' });
      } catch (error) {
        console.error('Error in navigation:', error);
      }
    }
  },
  { immediate: true }
);

const onToggleDropDown = () => {
  isOpen.value = !isOpen.value;
};

const onSelectItem = (id: number) => {
  isOpen.value = false;
  tripStore.setSelectedTripId(id);
  router.push({ name: 'Travel', params: { id: id.toString() } });
};

const showCreateTripModal = () => {
  isOpen.value = false;
  showCreateModal.value = true;
};

const handleModalClose = () => {
  showCreateModal.value = false;
};

const handleTripCreate = () => {
  showCreateModal.value = false;
};

onMounted(async () => {
  const { id } = route.params;
  if (id) {
    const numericId = parseInt(id as string);
    const tripExists = tripSimpleList.value.some(trip => trip.id === numericId);
    
    if (tripExists) {
      tripStore.setSelectedTripId(numericId);
    } else if (route.name !== 'Home') {
      await acceptLottieRef.value?.showAnimation();
      router.push({ name: 'Home' });
    }
  }
});
</script>

<template>
  <div class="header-drop-down-layout">
    <div class="header-drop-down-text-container" @click="onToggleDropDown">
      <span class="header-drop-down-text">{{
        selectedTripId
          ? tripSimpleList.find((trip) => trip.id === selectedTripId)?.name
          : '여행 선택'
      }}</span>
      <img src="/src/assets/icons/chevron_down.png" />
    </div>

    <transition name="fade">
      <div v-show="isOpen" class="drop-down-item-container">
        <div
          v-for="trip in tripSimpleList"
          :key="trip.id"
          class="drop-down-item"
          :class="{ 'selected': trip.id === selectedTripId }"
          @click="onSelectItem(trip.id)"
        >
          <span class="drop-down-item-text">{{ trip.name }}</span>
        </div>
        
        <div class="drop-down-item" @click="showCreateTripModal">
          <span class="drop-down-item-add-text">+ 새로 추가하기</span>
        </div>
      </div>
    </transition>

    <CreateTripModal 
      :show="showCreateModal"
      @close="handleModalClose"
      @create="handleTripCreate"
    />
    
    <AcceptLottie 
      ref="acceptLottieRef"
      title="접근할 수 없습니다"
      :success="false"
    />
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

.drop-down-item.selected {
  background-color: #faf9ff;
  font-weight: 600;
}
</style>
