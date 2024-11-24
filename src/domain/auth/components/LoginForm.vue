<template>
  <AuthHeader />

  <form class="login-form-layout" @submit.prevent="loginHandler">
    <InputField
      type="email"
      v-model="loginForm.email"
      id="email"
      placeholder="이메일을 입력해주세요."
      required
    />

    <InputField
      type="password"
      v-model="loginForm.password"
      id="password"
      placeholder="비밀번호를 입력해주세요."
      required
    />
    <Button value="로그인" @click="loginHandler" />
  </form>
  <RouterLink to="/auth/signup" class="signup-button-layout">
    <Button value="회원가입" backgroundColor="#FAF9FF" fontColor="#000000" height="50px" width="100%" />
  </RouterLink>
  <div v-if="errorMessage" class="error-message">
    {{ errorMessage }}
  </div>
</template>

<script setup lang="ts">
  import Button from '@/domain/common/components/Button.vue';
  import { ref } from 'vue';
  import { useRouter } from 'vue-router';
  import { useAuthStore } from '@/stores/auth';
  import type { ApiResponse } from '@/domain/common/model/response.type';
  import { authService } from '../service/AuthService';
  import AuthHeader from './AuthHeader.vue';
  import InputField from './InputField.vue';
  import type { LoginRequest } from '../model/auth.type';

  const router = useRouter();
  const authStore = useAuthStore();
  const loginForm = ref<LoginRequest>({ email: '', password: '' });
  const errorMessage = ref<string>('');

  const loginHandler = async () => {
    try {
      const response = await authService.login(loginForm.value);
      const apiResponse = response.data as ApiResponse<null>;
      
      if (apiResponse.code === 200) {
        authStore.login();
        router.replace({ name: 'Home' });
      } else {
        errorMessage.value = '로그인에 실패했습니다.';
      }
    } catch (error) {
      console.error(error);
      errorMessage.value = '로그인 처리 중 오류가 발생했습니다.';
    }
  };
</script>

<style scoped>
  .login-form-layout {
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 20px;
  }
  .signup-button-layout {
    width: 100%;
  }
  .error-message {
    color: #ff4444;
    font-size: 14px;
    margin-top: 8px;
    text-align: center;
  }
</style>
