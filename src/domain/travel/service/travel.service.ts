import axiosInstance from '@/domain/common/util/axios';
import type { ApiResponse } from '@/domain/common/model/response.type';
import { mapApiResponseToTravelDetail } from '@/domain/travel/model/travelDetai.type';
import type { ParticipantApiResponse } from '@/domain/common/model/Participant.type';
import type { Schedule } from '@/domain/travel/model/travel.type';
import type { TripSimple } from '@/domain/common/model/TripSimple.type';
import { useTripInfoStore } from '@/stores/tripStore';
import type { Place } from '@/domain/travel/model/travel.type';
import { useScheduleStore } from '@/stores/schedule.store';
import type { Supplies } from '@/domain/supply/components/model/supply.type';
import type { WeatherInfo } from '@/domain/travel/model/travel.type';

class TravelService {
  async getTravelDetail(travelId: number): Promise<void> {
    const tripInfoStore = useTripInfoStore();

    try {
      const response = await axiosInstance.get<ApiResponse<{ travel: TripSimple; participants: ParticipantApiResponse[]; schedules: Schedule[]; accommodations: Place[]; supplies: Supplies; weatherInfo: WeatherInfo[] }>>(`/api/travel/${travelId}`);
      const apiResponse = response.data;

      if (apiResponse.code === 200 && apiResponse.success) {
        console.log('Travel detail fetched successfully:', apiResponse.message);
        const travelDetail = mapApiResponseToTravelDetail(apiResponse.data);
        console.log('travelDetail.participants', travelDetail.participants);

        const city = travelDetail.travel.destination.split(' ')[0];
        const district = travelDetail.travel.destination.split(' ')[1];

        console.log('city', city);

        // 위치 설정
        const position = await this.fetchPosition(city, district);

        // tripInfo에 할당
        tripInfoStore.setTripInfo({
          trip: travelDetail.travel,
          participants: travelDetail.participants,
          supplies: travelDetail.supplies,
          accomodations: travelDetail.accommodations, 
          localVisitors: [], // 필요에 따라 추가
          schedules: travelDetail.schedules,
          weatherInfos: travelDetail.weatherInfos,
          position,
        });
        console.log('tripInfoStore.tripInfo', tripInfoStore.tripInfo);
        
        const scheduleStore = useScheduleStore();
        scheduleStore.setScheduleList(travelDetail.schedules);
      } else {
        console.error('Failed to fetch travel detail:', apiResponse.message);
      }

    } catch (error) {
      console.error('Error occurred while fetching travel detail:', error);
    }
  }

  private async fetchPosition(city: string, district: string): Promise<{ x: number; y: number }> {
    try {
      const response = await axiosInstance.get<ApiResponse<{ x: number; y: number }>>(`/api/region/locations`, {
        params: { city, district },
      });
      const apiResponse = response.data;

      if (apiResponse.code === 200 && apiResponse.success) {
        console.log('Location fetched successfully:', apiResponse.message);
        return apiResponse.data;
      } else {
        console.error('Failed to fetch location:', apiResponse.message);
        return { x: 0, y: 0 }; // 기본값 설정
      }
    } catch (error) {
      console.error('Error occurred while fetching location:', error);
      return { x: 0, y: 0 }; // 기본값 설정
    }
  }
}

export const travelService = new TravelService();
