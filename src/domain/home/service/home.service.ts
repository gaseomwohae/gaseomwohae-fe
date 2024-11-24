import type { ApiResponse } from '@/domain/common/model/response.type';
import axiosInstance from '@/domain/common/util/axios';
import type { TripInfo } from '../model/tripInfo.type';
import type { TripSimple } from '@/domain/common/model/TripSimple.type';

class HomeService {
  async createTrip(tripRequest: {
    name: string;
    destination: string;
    startDate: string;
    endDate: string;
  }) {
    return await axiosInstance.post<ApiResponse<TripInfo>>('/api/travel', tripRequest);
  }
  async getTravelList() {
    return await axiosInstance.get<ApiResponse<TripSimple[]>>('/api/travel');
  }
}

export const homeService = new HomeService(); 