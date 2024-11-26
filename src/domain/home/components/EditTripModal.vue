<script setup lang="ts">
  import Modal from './Modal.vue';
  import InputField from '@/domain/auth/components/InputField.vue';
  import Button from '@/domain/common/components/Button.vue';
  import AcceptLottie from '@/domain/common/components/AcceptLottie.vue';
  import { ref, watch, computed } from 'vue';
  import { useTripInfoStore } from '@/stores/tripStore';
  import { homeService } from '@/domain/home/service/home.service';
  import axiosInstance from '@/domain/common/util/axios';

  const props = defineProps<{
    show: boolean;
  }>();

  const emit = defineEmits(['close', 'update']);

  const tripInfoStore = useTripInfoStore();

  // computed로 tripInfo 변화 감지
  const currentTripInfo = computed(() => tripInfoStore.tripInfo);

  const acceptLottieRef = ref<InstanceType<typeof AcceptLottie> | null>(null);

  const formData = ref({
    name: currentTripInfo.value?.trip.name ?? '',
    startDate: currentTripInfo.value?.trip.startDate ?? '',
    endDate: currentTripInfo.value?.trip.endDate ?? '',
    city: currentTripInfo.value?.trip.destination.split(' ')[0] ?? '',
    district: currentTripInfo.value?.trip.destination.split(' ')[1] ?? '',
    destination: currentTripInfo.value?.trip.destination ?? '',
    budget: currentTripInfo.value?.trip.budget.toString() ?? '',
  });

  // 여행 목적지 목록
  const cities = [
    '서울특별시',
    '부산광역시',
    '대구광역시',
    '인천광역시',
    '광주광역시',
    '대전광역시',
    '울산광역시',
    '세종특별자치시',
    '경기도',
    '강원도',
    '충청북도',
    '충청남도',
    '전라북도',
    '전라남도',
    '경상북도',
    '경상남도',
    '제주도',
  ];

  const districts = ref<string[]>([]);

  watch(
    currentTripInfo,
    (newTripInfo) => {
      if (newTripInfo) {
        formData.value = {
          name: newTripInfo.trip.name,
          startDate: newTripInfo.trip.startDate,
          endDate: newTripInfo.trip.endDate,
          city: newTripInfo.trip.destination.split(' ')[0],
          district: newTripInfo.trip.destination.split(' ')[1] || '',
          destination: newTripInfo.trip.destination,
          budget: newTripInfo.trip.budget.toString(),
        };
        if (formData.value.city) {
          fetchDistricts();
        }
      }
    },
    { immediate: true },
  );

  const fetchDistricts = async () => {
    try {
      const response = await axiosInstance.get(`/api/region/districts`, {
        params: { city: formData.value.city },
      });
      if (response.data.code === 200) {
        districts.value = response.data.data;
      } else {
        console.error('Failed to fetch districts:', response.data.message);
      }
    } catch (error) {
      console.error('Error occurred while fetching districts:', error);
    }
  };

  const fetchLocation = async () => {
    if (formData.value.city && formData.value.district) {
      try {
        const response = await axiosInstance.get(`/api/region/locations`, {
          params: { city: formData.value.city, district: formData.value.district },
        });
        if (response.data.code === 200) {
          const { x, y } = response.data.data;
          formData.value.destination = `${formData.value.city} ${formData.value.district}`;
          console.log(`Location coordinates: x=${x}, y=${y}`);
        } else {
          console.error('Failed to fetch location:', response.data.message);
        }
      } catch (error) {
        console.error('Error occurred while fetching location:', error);
      }
    }
  };

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
          <div class="form-group">
            <div class="form-group" style="font-size: 12px; font-weight: bold; margin-bottom: 10px">
              목적지
            </div>
            <label for="destination">시/도</label>
            <select
              id="destination"
              v-model="formData.city"
              class="styled-select"
              @change="fetchDistricts"
            >
              <option v-for="city in cities" :key="city" :value="city">{{ city }}</option>
            </select>
          </div>
          <div class="form-group" v-if="districts.length">
            <label for="district">구/군</label>
            <select
              id="district"
              v-model="formData.district"
              class="styled-select"
              @change="fetchLocation"
            >
              <option v-for="district in districts" :key="district" :value="district">
                {{ district }}
              </option>
            </select>
          </div>
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

  .form-group {
    margin-bottom: 1rem;
  }

  .styled-select {
    width: 100%;
    padding: 0.5rem;
    border: 1px solid #ddd;
    border-radius: 0.25rem;
    font-size: 1rem;
    transition: border-color 0.2s;
  }

  .styled-select:focus {
    outline: none;
  }
</style>
