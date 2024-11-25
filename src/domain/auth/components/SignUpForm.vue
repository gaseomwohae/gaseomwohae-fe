<script setup lang="ts">
  import Logo from '@/domain/common/components/Logo.vue';
  import { ref } from 'vue';
  import { useRouter } from 'vue-router';
  import Button from '../../common/components/Button.vue';
  import type { SignUpForm } from '../model/auth.type';
  import { authService } from '../service/AuthService';
  import InputField from './InputField.vue';
  import type { ApiResponse } from '@/domain/common/model/response.type';

  const router = useRouter();
  const errorMessage = ref<string>('');

  const signUpForm = ref<SignUpForm>({
    email: '',
    name: '',
    password: '',
    passwordConfirm: '',
    profileImage: '/src/assets/icons/profile.png',
  });

  const signUpHandler = async () => {
    try {
      // 비밀번호 확인 검증
      if (signUpForm.value.password !== signUpForm.value.passwordConfirm) {
        errorMessage.value = '비밀번호가 일치하지 않습니다.';
        return;
      }

      const { ...signUpRequest } = signUpForm.value;
      const response = await authService.signUp(signUpRequest);
      const apiResponse = response.data as ApiResponse<null>;

      if (apiResponse.code === 200) {
        // 회원가입 성공 시 로그인 페이지로 이동
        router.replace({ name: 'Login' });
      } else {
        errorMessage.value = apiResponse.message || '회원가입에 실패했습니다.';
      }
    } catch (error) {
      console.error(error);
      errorMessage.value = '회원가입 처리 중 오류가 발생했습니다.';
    }
  };
</script>

<template>
  <div class="auth-header-layout">
    <Logo />
    <span class="auth-header-font">에서 사용할 계정을 생성해 주세요</span>
  </div>

  <div class="signup-form-container">
    <InputField
      label="이메일"
      id="email"
      type="email"
      placeholder="이메일을 입력해주세요."
      v-model="signUpForm.email"
    />
    <InputField
      label="이름"
      id="name"
      placeholder="이름을 입력해주세요."
      v-model="signUpForm.name"
    />
    <InputField
      label="비밀번호"
      type="password"
      id="password"
      placeholder="비밀번호를 입력해주세요."
      v-model="signUpForm.password"
    />
    <InputField
      label="비밀번호 확인"
      type="password"
      id="passwordConfirm"
      placeholder="비밀번호를 한번 더 입력해주세요."
      v-model="signUpForm.passwordConfirm"
    />

    <!-- 에러 메시지 표시 -->
    <div v-if="errorMessage" class="error-message">
      {{ errorMessage }}
    </div>

    <Button value="회원가입" @click="signUpHandler" />
  </div>
</template>

<style scoped>
  .signup-form-container {
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: stretch;
    gap: 20px;
  }

  .error-message {
    color: #ff4444;
    font-size: 14px;
    margin-top: 8px;
    text-align: center;
  }

  .auth-header-font {
    font-size: 24px;
    font-weight: bold;
    font-family: 'NanumGothic';
    margin: 0 60px 0 0 !important;
  }

  .auth-header-layout {
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 7.25px;
  }
</style>
