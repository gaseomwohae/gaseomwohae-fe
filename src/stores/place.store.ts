import type { Place, PlaceWithReview } from '@/domain/travel/model/travel.type';
import { defineStore } from 'pinia';
import { ref } from 'vue';
import { reviewService } from '@/domain/review/service/review.service';

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
        placeDetail.value = {
          ...place,
          reviews: response.data || [],
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

  return {
    searchedPlaces,
    updateSearchedPlaces,
    placeDetail,
    updatePlaceDetail,
  };
});
