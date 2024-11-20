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
    <Button value="로그인" />
  </form>
  <Button value="회원가입" backgroundColor="#FAF9FF" fontColor="#000000" @click="loginHandler" />
</template>

<script setup lang="ts">
  import Button from '@/domain/common/components/Button.vue';
  import { ref } from 'vue';
  import type { LoginRequest } from '../model/auth.type';
  import { authService } from '../service/AuthService';
  import AuthHeader from './AuthHeader.vue';
  import InputField from './InputField.vue';

  const loginForm = ref<LoginRequest>({ email: '', password: '' });
  const loginHandler = async () => {
    await authService.login(loginForm.value);
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
</style>
