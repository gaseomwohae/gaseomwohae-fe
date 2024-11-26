import axiosInstance from '@/domain/common/util/axios';
import type { Review } from '@/domain/travel/model/travel.type';
import type { ApiResponse } from '@/domain/common/model/response.type';

class ReviewService {
  // 특정 장소의 리뷰 조회
  async getReviewsByPlaceId(placeId: number): Promise<ApiResponse<Review[]>> {
    try {
      const response = await axiosInstance.get<ApiResponse<Review[]>>(`/api/review`, {
        params: { placeId },
      });
      return response.data;
    } catch (error: any) {
      console.error('Error occurred while fetching reviews:', error);
      throw error;
    }
  }
}

export const reviewService = new ReviewService();
