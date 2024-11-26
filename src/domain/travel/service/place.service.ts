import axios from 'axios';
import axiosInstance from '@/domain/common/util/axios';
import type { ApiResponse } from "@/domain/common/model/response.type";
import type { Place } from '@/domain/travel/model/travel.type';
import { usePlaceStore } from '@/stores/place.store';

class PlaceService {
  // 여러 장소 생성하기
  async createPlaces(places: Place[]): Promise<void> {
    try {
      const response = await axiosInstance.post<ApiResponse<{ id: number; rating: number }[]>>('/api/place', places);
      const apiResponse = response.data;

      if (apiResponse.code === 200 && apiResponse.success) {
        console.log('Places created successfully:', apiResponse.message);
        this.updatePlaceRatings(apiResponse.data);
      } else {
        console.error('Failed to create places:', apiResponse.message);
      }
    } catch (error: any) {
      console.error('Error occurred while creating places:', error);
      throw error;
    }
  }

  // 응답으로 받은 id와 rating을 사용하여 placeStore의 rating 갱신
  private updatePlaceRatings(ratings: { id: number; rating: number }[]) {
    const placeStore = usePlaceStore();
    console.log('updatePlaceRatings', placeStore.searchedPlaces);
    const updatedPlaces = placeStore.searchedPlaces.map(place => {
      const ratingInfo = ratings.find(r => r.id === place.id);
      console.log('ratingInfo', ratingInfo);
      if (ratingInfo) {
        return { ...place, rating: ratingInfo.rating };
      }
      return place;
    });
    placeStore.updateSearchedPlaces(updatedPlaces);

  }

  async getPlaceImage(placeName: string): Promise<string> {
    const response = await axios.get('http://localhost:3000/api/search/image', {
      params: { query: placeName },
    });
    return response.data.imageUrl;
  }
}

export default new PlaceService();
