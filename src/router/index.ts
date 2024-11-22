import LoginForm from '@/domain/auth/components/LoginForm.vue';
import SignUpForm from '@/domain/auth/components/SignUpForm.vue';
import ParticipationDashBoard from '@/domain/participation/components/ParticipationDashBoard.vue';
import { createRouter, createWebHistory } from 'vue-router';
import HomeDashBoard from '../domain/home/components/HomeDashBoard.vue';
import SchedulePage from '../domain/schedule/components/SchedulePage.vue';
import { useAuthStore } from '../stores/auth';
import AuthPage from '../views/AuthPage.vue';
import DashBoardPage from '../views/DashBoardPage.vue';
const routes = [
  {
    path: '/',
    name: 'Home',
    component: DashBoardPage,
    // meta: { requiresAuth: true }, // 인증이 필요한 라우트
    children: [
      {
        path: 'travel/:id',
        name: 'Travel',
        component: HomeDashBoard,
      },
      {
        path: 'travel/:id/schedule',
        name: 'Schedule',
        component: SchedulePage,
        // meta: { requiresAuth: true }, // 인증이 필요한 라우트
      },
      {
        path: 'travel/:id/supplies',
        name: 'TravelSupplies',
        component: HomeDashBoard,
        // meta: { requiresAuth: true }, // 인증이 필요한 라우트
      },
      {
        path: 'travel/:id/participants',
        name: 'Participants',
        component: ParticipationDashBoard,
        // meta: { requiresAuth: true }, // 인증이 필요한 라우트
      },
    ],
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
