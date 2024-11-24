import axiosInstance from '@/domain/common/util/axios';
import type { ApiResponse } from '@/domain/common/model/response.type';
import type { LoginRequest, SignUpRequest } from '../model/auth.type';

class AuthService {
  async signUp(signUpRequest: SignUpRequest) {
    const response = await axiosInstance.post('/api/user/signup', signUpRequest);
    return response;
  }

  async login(loginRequest: LoginRequest) {
    return await axiosInstance.post<ApiResponse<null>>('/api/auth/login', loginRequest);
  }
}

export const authService = new AuthService();
