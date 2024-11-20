import LoginForm from '@/domain/auth/components/LoginForm.vue';
import SignUpForm from '@/domain/auth/components/SignUpForm.vue';
import { createRouter, createWebHistory } from 'vue-router';
import { useAuthStore } from '../stores/auth';
import AuthPage from '../views/AuthPage.vue';
import HomePage from '../views/HomPage.vue';

const routes = [
  {
    path: '/',
    name: 'Home',
    component: HomePage,
    // meta: { requiresAuth: true }, // 인증이 필요한 라우트
  },
  {
    path: '/schedule',
    name: 'Schedule',
    component: HomePage,
    // meta: { requiresAuth: true }, // 인증이 필요한 라우트
  },
  {
    path: '/travel_supplies',
    name: 'TravelSupplies',
    component: HomePage,
    // meta: { requiresAuth: true }, // 인증이 필요한 라우트
  },
  {
    path: '/participants',
    name: 'Participants',
    component: HomePage,
    // meta: { requiresAuth: true }, // 인증이 필요한 라우트
  },
  {
    path: '/auth',
    name: 'Auth',
    component: AuthPage,
    children: [
      {
        path: 'login',
        name: 'Login',
        component: LoginForm,
      },
      {
        path: 'signup',
        name: 'SignUp',
        component: SignUpForm,
      },
    ],
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

// 네비게이션 가드
router.beforeEach((to, from, next) => {
  const authStore = useAuthStore();
  if (to.meta.requiresAuth && !authStore.isAuthenticated) {
    next({ name: 'Login' }); // 로그인 페이지로 리디렉션
  } else {
    next();
  }
});

export default router;
