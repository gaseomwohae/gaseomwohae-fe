import axiosInstance from '@/domain/common/util/axios';
import type { ApiResponse } from '@/domain/common/model/response.type';
import { useAuthStore } from '@/stores/auth';
class UserService {
  async logout() {
  const authStore = useAuthStore();

    authStore.logout();

    return await axiosInstance.post<ApiResponse<void>>('/api/auth/logout');
  }
}

export const userService = new UserService();
