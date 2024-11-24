<script setup lang="ts">
import Modal from './Modal.vue';
import InputField from '@/domain/auth/components/InputField.vue';
import Button from '@/domain/common/components/Button.vue';
import AcceptLottie from '@/domain/common/components/AcceptLottie.vue';
import { ref, watch, computed } from 'vue';
import { useTripInfoStore } from '@/stores/tripStore';

const props = defineProps<{
  show: boolean;
}>();

const emit = defineEmits(['close', 'update']);

const tripStore = useTripInfoStore();

// computed로 tripInfo 변화 감지
const currentTripInfo = computed(() => tripStore.tripInfo);

const acceptLottieRef = ref<InstanceType<typeof AcceptLottie> | null>(null);

const formData = ref({
  startDate: '',
  endDate: '',
  destination: ''
});

// tripInfo가 변경될 때마다 formData 업데이트
watch(currentTripInfo, (newTripInfo) => {
  if (newTripInfo) {
    formData.value = {
      startDate: newTripInfo.tripStartDate,
      endDate: newTripInfo.tripEndDate,
      destination: newTripInfo.tripRoute.endDestination.name
    };
  }
}, { immediate: true });

const handleSubmit = () => {
  if (!currentTripInfo.value) return;

  const updatedTripInfo = {
    ...currentTripInfo.value,
    tripStartDate: formData.value.startDate,
    tripEndDate: formData.value.endDate,
    tripRoute: {
      ...currentTripInfo.value.tripRoute,
      endDestination: {
        ...currentTripInfo.value.tripRoute.endDestination,
        name: formData.value.destination
      }
    }
  };

  tripStore.updateTripInfo(updatedTripInfo);
  acceptLottieRef.value?.showAnimation();
  emit('close');
};
</script>

<template>
  <div>
    <Modal v-if="show" header="여행 정보 수정" @close="emit('close')">
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
          <Button value="취소" @click="emit('close')" backgroundColor="#f5f5f5" fontColor="#000" />
          <Button value="수정" @click="handleSubmit" />
        </div>
      </template>
    </Modal>
    
    <AcceptLottie 
      ref="acceptLottieRef"
      title="여행 정보가 수정되었습니다"
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