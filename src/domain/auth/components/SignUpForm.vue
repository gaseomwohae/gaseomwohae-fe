<script setup lang="ts">
  import Logo from '@/domain/common/components/Logo.vue';
  import { ref } from 'vue';
  import Button from '../../common/components/Button.vue';
  import type { SignUpRequest } from '../model/auth.type';
  import { authService } from '../service/AuthService';
  import InputField from './InputField.vue';

  const signUpForm = ref<SignUpRequest>({ email: '', name: '', password: '', passwordConfirm: '' });

  const signUpHandler = async () => {
    await authService.signUp(signUpForm.value);
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
    color: red;
    font-size: 12px;
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
