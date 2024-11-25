import axiosInstance from '@/domain/common/util/axios';
import type { ApiResponse } from '@/domain/common/model/response.type';
import { useAuthStore } from '@/stores/auth';

type UserInfo = {
  name: string;
  email: string;
  profileImage: string;
};

class UserService {
  async logout() {
    const authStore = useAuthStore();

    authStore.logout();

    return await axiosInstance.post<ApiResponse<void>>('/api/auth/logout');
  }

  async getUserInfo(): Promise<UserInfo | null> {
    try {
      const response = await axiosInstance.get<ApiResponse<UserInfo>>('/api/user');
      const apiResponse = response.data;

      if (apiResponse.code === 200 && apiResponse.success) {
        console.log('User info fetched successfully:', apiResponse.data);
        return apiResponse.data;
      } else {
        console.error('Failed to fetch user info:', apiResponse.message);
        return null;
      }
    } catch (error) {
      console.error('Error occurred while fetching user info:', error);
      return null;
    }
  }
}

export const userService = new UserService();
