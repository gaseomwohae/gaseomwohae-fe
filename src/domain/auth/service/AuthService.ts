import axiosInstance from '@/domain/common/util/axios';
import type { LoginRequest, SignUpRequest } from '../model/auth.type';

class AuthService {
  async signUp(signUpRequest: SignUpRequest) {
    const response = await axiosInstance.post('/api/auth/signup', signUpRequest);
    return response.data;
  }

  async login(loginRequest: LoginRequest) {
    const response = await axiosInstance.post('/api/auth/login', loginRequest);
    return response.data;
  }
}

export default new AuthService();
