<template>
  <Modal v-if="show" header="리뷰 생성" @close="closeModal">
    <template #body>
      <div class="form-group">
        <label for="rating">평점</label>
        <div class="star-rating">
          <span
            v-for="star in 5"
            :key="star"
            class="star"
            :class="{ filled: star <= reviewData.rating }"
            @click="setRating(star)"
          >
            ★
          </span>
        </div>
      </div>
      <div class="form-group">
        <label for="content">내용</label>
        <textarea
          id="content"
          v-model="reviewData.content"
          class="styled-input"
          required
        ></textarea>
        <p v-if="error" class="error-message">{{ error }}</p>
      </div>
      <!-- <div class="form-group">
        <label for="image">이미지 URL</label>
        <input type="text" id="image" v-model="reviewData.image" class="styled-input" required />
      </div> -->
    </template>

    <template #footer>
      <div class="modal-footer">
        <button class="cancel-button" @click="closeModal">취소</button>
        <button class="submit-button" @click="submitReview" :disabled="isSubmitting">
          {{ isSubmitting ? '검증 중...' : '생성' }}
        </button>
      </div>
    </template>
  </Modal>
</template>

<script setup lang="ts">
  import Modal from '@/domain/home/components/Modal.vue';
  import { openAi } from '@/domain/travel/utils/openai';
  import { usePlaceStore } from '@/stores/place.store';
  import { defineExpose, ref } from 'vue';

  const placeStore = usePlaceStore();
  const show = ref(false);
  const error = ref('');
  const isSubmitting = ref(false);

  const reviewData = ref({
    placeId: placeStore.placeDetail?.id ?? 0,
    rating: 0,
    content: '',
    image: '',
  });

  const closeModal = () => {
    show.value = false;
    error.value = '';
    reviewData.value = {
      placeId: placeStore.placeDetail?.id ?? 0,
      rating: 0,
      content: '',
      image: '',
    };
  };

  const submitReview = async () => {
    if (!reviewData.value.content) {
      error.value = '리뷰 내용을 입력해주세요.';
      return;
    }

    isSubmitting.value = true;
    error.value = '';

    try {
      // OpenAI로 리뷰 검증
      const isValid = await openAi(reviewData.value.content);
      console.log(isValid);

      if (isValid.toLowerCase() === 'true') {
        await placeStore.createReview(reviewData.value);
        closeModal();
      } else {
        error.value = '부적절한 리뷰입니다. 다시 작성해주세요.';
      }
    } catch (e) {
      error.value = '리뷰 검증 중 오류가 발생했습니다.';
      console.error(e);
    } finally {
      isSubmitting.value = false;
    }
  };

  const openModal = () => {
    show.value = true;
  };

  const setRating = (star: number) => {
    reviewData.value.rating = star;
  };

  // defineExpose를 사용하여 부모 컴포넌트에서 사용할 수 있도록 노출
  defineExpose({
    openModal,
  });
</script>

<style scoped>
  .form-group {
    margin-bottom: 1rem;
  }

  .star-rating {
    display: flex;
    gap: 0.5rem;
  }

  .star {
    font-size: 2rem;
    cursor: pointer;
    color: #ccc;
    transition: color 0.2s;
  }

  .star.filled {
    color: #ffcc00;
  }

  .styled-input {
    width: 100%;
    padding: 0.5rem;
    border: 1px solid #ddd;
    border-radius: 0.25rem;
    font-size: 1rem;
    transition: border-color 0.2s;
  }

  .styled-input:focus {
    border-color: #4caf50;
    outline: none;
  }

  .submit-button,
  .cancel-button {
    padding: 0.5rem 1rem;
    border: none;
    border-radius: 0.25rem;
    cursor: pointer;
  }

  .submit-button {
    background-color: #4caf50;
    color: white;
  }

  .cancel-button {
    background-color: #f44336;
    color: white;
    margin-left: 0.5rem;
  }

  .modal-footer {
    display: flex;
    justify-content: flex-end;
    gap: 10px;
  }

  .error-message {
    color: #f44336;
    font-size: 0.875rem;
    margin-top: 0.5rem;
  }
</style>
