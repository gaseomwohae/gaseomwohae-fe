import type { Place, PlaceWithReview } from '@/domain/travel/model/travel.type';
import { defineStore } from 'pinia';
import { ref } from 'vue';

export const usePlaceStore = defineStore('place', () => {
  const searchedPlaces = ref<Place[]>([]);
  const placeDetail = ref<PlaceWithReview | null>(null);

  const updateSearchedPlaces = (newPlace: Place[]) => {
    searchedPlaces.value = newPlace;
  };

  const updatePlaceDetail = (place: Place) => {
    placeDetail.value = {
      ...place,
      reviews: [], // TODO: 서버 요청보내서 추가
    };
  };

  return {
    searchedPlaces,
    updateSearchedPlaces,
    placeDetail,
    updatePlaceDetail,
  };
});
