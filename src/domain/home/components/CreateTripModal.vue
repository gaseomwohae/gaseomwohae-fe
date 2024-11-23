<script setup lang="ts">
import Modal from './Modal.vue';
import InputField from '@/domain/auth/components/InputField.vue';
import Button from '@/domain/common/components/Button.vue';
import AcceptLottie from '@/domain/common/components/AcceptLottie.vue';
import { ref } from 'vue';
import { useTripInfoStore } from '@/stores/tripStore';
import type { TripInfo } from '../model/tripInfo.type';
const props = defineProps<{
  show: boolean;
}>();

const emit = defineEmits(['close', 'create']);

const tripStore = useTripInfoStore();
const acceptLottieRef = ref<InstanceType<typeof AcceptLottie> | null>(null);

const formData = ref({
  startDate: '',
  endDate: '',
  destination: ''
});

const handleSubmit = () => {
  // 여기서 새로운 여행 정보 생성 로직 추가
  tripStore.clearTripInfo();
   
  const newTripInfo: TripInfo = {
    trip: {
      id: Date.now(), // 임시 ID 생성
      name: `${formData.value.destination} 여행`
    },
    tripStartDate: formData.value.startDate,
    tripEndDate: formData.value.endDate,
    tripRoute: {
      startDestination: {
        id: 1,
        name: '출발지',
        latitude: 0,
        longitude: 0,
        imgSrc: ''
      },
      endDestination: {
        id: 2,
        name: formData.value.destination,
        latitude: 0,
        longitude: 0,
        imgSrc: ''
      },
      travelTime: '미정'
    },
    participants: [],
    supplies: [],
    accomodations: [],
    budget: 0,
    localVisitors: []
  };

  tripStore.createTrip(newTripInfo); // tripStore에 createTrip 메서드 필요
  emit('create');
  emit('close');
  
  acceptLottieRef.value?.showAnimation();
};
</script>

<template>
  <div>
    <Modal v-if="show" header="여행 계획하기">
      <template #body>
        <div class="edit-form">
          <InputField
            type="date"
            id="startDate"
            label="시작일"
            v-model="formData.startDate"
            placeholder="여행 시작일"
          />
          <InputField
            type="date"
            id="endDate"
            label="종료일"
            v-model="formData.endDate"
            placeholder="여행 종료일"
          />
          <InputField
            type="text"
            id="destination"
            label="목적지"
            v-model="formData.destination"
            placeholder="여행 목적지"
          />
        </div>
      </template>
      
      <template #footer>
        <div class="modal-footer">
          <Button value="취소" @click="emit('close')" backgroundColor="#f5f5f5" color="#333" />
          <Button value="생성" @click="handleSubmit" />
        </div>
      </template>
    </Modal>
    
    <AcceptLottie 
      ref="acceptLottieRef"
      title="새로운 여행이 생성되었습니다"
    />
  </div>
</template>

<style scoped>
.edit-form {
  display: flex;
  flex-direction: column;
  gap: 20px;
  min-width: 400px;
}

.modal-footer {
  display: flex;
  justify-content: flex-end;
  gap: 10px;
}
</style> 