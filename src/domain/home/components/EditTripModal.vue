<script setup lang="ts">
  import Modal from './Modal.vue';
  import InputField from '@/domain/auth/components/InputField.vue';
  import Button from '@/domain/common/components/Button.vue';
  import AcceptLottie from '@/domain/common/components/AcceptLottie.vue';
  import { ref, watch, computed } from 'vue';
  import { useTripInfoStore } from '@/stores/tripStore';
  import { homeService } from '@/domain/home/service/home.service';

  const props = defineProps<{
    show: boolean;
  }>();

  const emit = defineEmits(['close', 'update']);

  const tripInfoStore = useTripInfoStore();

  // computed로 tripInfo 변화 감지
  const currentTripInfo = computed(() => tripInfoStore.tripInfo);

  const acceptLottieRef = ref<InstanceType<typeof AcceptLottie> | null>(null);

  const formData = ref({
    name: '',
    startDate: '',
    endDate: '',
    destination: '',
    budget: '',
  });

  // tripInfo가 변경될 때마다 formData 업데이트
  watch(
    currentTripInfo,
    (newTripInfo) => {
      if (newTripInfo) {
        formData.value = {
          name: newTripInfo.trip.name,
          startDate: newTripInfo.trip.startDate,
          endDate: newTripInfo.trip.endDate,
          destination: newTripInfo.trip.destination,
          budget: newTripInfo.trip.budget.toString(),
        };
      }
    },
    { immediate: true },
  );

  const handleSubmit = async () => {
    if (!currentTripInfo.value) return;

    const travelId = currentTripInfo.value.trip.id;
    const tripRequest = {
      name: formData.value.name,
      destination: formData.value.destination,
      startDate: formData.value.startDate,
      endDate: formData.value.endDate,
      budget: Number(formData.value.budget),
    };

    try {
      await homeService.updateTrip(travelId, tripRequest);
      console.log('Trip updated successfully');
      acceptLottieRef.value?.showAnimation();
      emit('close');
    } catch (error) {
      console.error('Failed to update trip:', error);
    }
  };
</script>

<template>
  <div>
    <Modal v-if="show" header="여행 정보 수정" @close="emit('close')">
      <template #body>
        <div class="edit-form">
          <InputField
            type="text"
            id="name"
            label="여행 이름"
            v-model="formData.name"
            placeholder="여행 이름"
          />
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
          <InputField
            type="number"
            id="budget"
            label="예산"
            v-model="formData.budget"
            placeholder="여행 예산"
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

    <AcceptLottie ref="acceptLottieRef" title="여행 정보가 수정되었습니다" />
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
