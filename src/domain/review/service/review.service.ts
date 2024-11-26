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

  // 리뷰 생성
  async createReview(reviewData: {
    placeId: number;
    rating: number;
    content: string;
    image: string;
  }): Promise<ApiResponse<null>> {
    try {
      const response = await axiosInstance.post<ApiResponse<null>>(`/api/review`, reviewData);
      return response.data;
    } catch (error: any) {
      console.error('Error occurred while creating review:', error);
      throw error;
    }
  }
}

export const reviewService = new ReviewService();
