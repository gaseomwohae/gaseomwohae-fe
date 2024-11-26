import type { Place, PlaceWithReview, Review } from '@/domain/travel/model/travel.type';
import { defineStore } from 'pinia';
import { ref } from 'vue';
import { reviewService } from '@/domain/review/service/review.service';

// 날짜 포맷팅 함수 (예시)
const formatDateTime = (dateTime: string): string => {
  const date = new Date(dateTime);
  return date.toLocaleString(); // 원하는 포맷으로 변경
};

export const usePlaceStore = defineStore('place', () => {
  const searchedPlaces = ref<Place[]>([]);
  const placeDetail = ref<PlaceWithReview | null>(null);

  const updateSearchedPlaces = (newPlace: Place[]) => {
    searchedPlaces.value = newPlace;
  };

  const updatePlaceDetail = async (place: Place) => {
    try {
      const response = await reviewService.getReviewsByPlaceId(place.id);
      if (response.code === 200) {
        const formattedReviews = response.data.map(review => ({
          ...review,
          createdAt: formatDateTime(review.createdAt),
        }));
        placeDetail.value = {
          ...place,
          reviews: formattedReviews,
        };
      } else {
        console.error('Failed to fetch reviews:', response.message);
        placeDetail.value = {
          ...place,
          reviews: [],
        };
      }
    } catch (error) {
      console.error('Error occurred while fetching reviews:', error);
      placeDetail.value = {
        ...place,
        reviews: [],
      };
    }
  };

  const createReview = async (reviewData: {
    placeId: number;
    rating: number;
    content: string;
    image: string;
  }) => {
    try {
      const response = await reviewService.createReview(reviewData);
      if (response.code === 200) {
        // 리뷰 생성 후 리뷰 목록 갱신
        await updatePlaceDetail({ id: reviewData.placeId } as Place);
      } else {
        console.error('Failed to create review:', response.message);
      }
    } catch (error) {
      console.error('Error occurred while creating review:', error);
    }
  };

  return {
    searchedPlaces,
    updateSearchedPlaces,
    placeDetail,
    updatePlaceDetail,
    createReview,
  };
});
