import axios from 'axios';
import axiosInstance from '@/domain/common/util/axios';

import type { Place } from '@/domain/travel/model/travel.type';
import type { ApiResponse } from "@/domain/common/model/response.type";

class PlaceService {
  // 장소 생성하기
  async createPlace(place: Place): Promise<ApiResponse<null>> {
    try {
      const response = await axiosInstance.post<ApiResponse<null>>('/api/place', place);
      const apiResponse = response.data;

      if (apiResponse.code === 200 && apiResponse.success) {
        console.log('Place created successfully:', apiResponse.message);
      } else {
        console.error('Failed to create place:', apiResponse.message);
      }
      return apiResponse;
    } catch (error: any) {
      // 에러 응답이 있고, 'Resource already exists' 메시지인 경우
      if (error.response?.data?.message === 'Resource already exists') {
        console.log('Place already exists, skipping error');
        return error.response.data;
      }
      
      console.error('Error occurred while creating place:', error);
      throw error;
    }
  }

  
  async getPlaceImage(placeName: string): Promise<string> {
    const response = await axios.get('http://localhost:3000/api/search/image', {
      params: { query: placeName },
    });
    return response.data.imageUrl;
  }
}

export default new PlaceService();
