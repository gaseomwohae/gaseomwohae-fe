<script setup lang="ts">
  import Modal from './Modal.vue';
  import InputField from '@/domain/auth/components/InputField.vue';
  import Button from '@/domain/common/components/Button.vue';
  import AcceptLottie from '@/domain/common/components/AcceptLottie.vue';
  import { ref } from 'vue';
  import { homeService } from '../service/home.service';

  defineProps<{
    show: boolean;
  }>();

  const emit = defineEmits(['close', 'create']);

  const acceptLottieRef = ref<InstanceType<typeof AcceptLottie> | null>(null);

  const formData = ref({
    name: '',
    startDate: '',
    endDate: '',
    destination: '',
    budget: '',
  });

  const errorMessage = ref('');

  const handleSubmit = async () => {
    // 입력값 검증
    if (!formData.value.name) {
      errorMessage.value = '여행 이름을 입력해주세요.';
      return;
    }
    if (!formData.value.startDate) {
      errorMessage.value = '시작일을 입력해주세요.';
      return;
    }
    if (!formData.value.endDate) {
      errorMessage.value = '종료일을 입력해주세요.';
      return;
    }
    if (!formData.value.destination) {
      errorMessage.value = '목적지를 입력해주세요.';
      return;
    }
    if (!formData.value.budget) {
      errorMessage.value = '예산을 입력해주세요.';
      return;
    }

    // 날짜 유효성 검증
    const startDate = new Date(formData.value.startDate);
    const endDate = new Date(formData.value.endDate);

    if (endDate < startDate) {
      errorMessage.value = '종료일은 시작일보다 늦어야 합니다.';
      return;
    }

    try {
      await homeService.createTrip({
        name: formData.value.name,
        destination: formData.value.destination,
        startDate: formData.value.startDate,
        endDate: formData.value.endDate,
        budget: Number(formData.value.budget),
      });

      acceptLottieRef.value?.showAnimation();
      emit('close');
    } catch (error) {
      console.error(error);
      errorMessage.value = '여행 생성 중 오류가 발생했습니다.';
    }
  };
</script>

<template>
  <div>
    <Modal v-if="show" header="여행 계획하기" @close="emit('close')">
      <template #body>
        <div class="edit-form">
          <InputField
            type="text"
            id="name"
            label="여행 이름"
            v-model="formData.name"
            placeholder="여행 이름을 입력해주세요"
            required
          />
          <InputField
            type="date"
            id="startDate"
            label="시작일"
            v-model="formData.startDate"
            placeholder="여행 시작일"
            required
          />
          <InputField
            type="date"
            id="endDate"
            label="종료일"
            v-model="formData.endDate"
            placeholder="여행 종료일"
            required
          />
          <InputField
            type="text"
            id="destination"
            label="목적지"
            v-model="formData.destination"
            placeholder="여행 목적지"
            required
          />
          <InputField
            type="number"
            id="budget"
            label="예산"
            v-model="formData.budget"
            placeholder="여행 예산을 입력해주세요"
            required
          />

          <div v-if="errorMessage" class="error-message">
            {{ errorMessage }}
          </div>
        </div>
      </template>

      <template #footer>
        <div class="modal-footer">
          <Button value="취소" @click="emit('close')" backgroundColor="#f5f5f5" color="#000" />
          <Button value="생성" @click="handleSubmit" />
        </div>
      </template>
    </Modal>

    <AcceptLottie ref="acceptLottieRef" title="새로운 여행이 생성되었습니다" />
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
