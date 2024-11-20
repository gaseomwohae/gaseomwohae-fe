import axiosInstance from '@/domain/common/util/axios';
import type { LoginRequest, SignUpRequest } from '../model/auth.type';

class AuthService {
  async signUp(signUpRequest: SignUpRequest): Promise<void> {
    const response = await axiosInstance.post('/api/auth/signup', signUpRequest);
    return response;
  }

  async login(loginRequest: LoginRequest): Promise<void> {
    const response = await axiosInstance.post('/api/auth/login', loginRequest);
    return response;
  }
}

export const authService = new AuthService();
