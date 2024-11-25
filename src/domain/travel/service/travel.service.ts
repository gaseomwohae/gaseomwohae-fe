import axiosInstance from '@/domain/common/util/axios';
import type { ApiResponse } from '@/domain/common/model/response.type';
import { mapApiResponseToTravelDetail } from '@/domain/travel/model/travelDetai.type';
import type { ParticipantApiResponse } from '@/domain/common/model/Participant.type';
import type { Schedule } from '@/domain/travel/model/schedule.type';
import type { TripSimple } from '@/domain/common/model/TripSimple.type';
import { useTripInfoStore } from '@/stores/tripStore';
import type { Place } from '@/domain/travel/model/travel.type';
class TravelService {
  async getTravelDetail(travelId: number): Promise<void> {
    const tripInfoStore = useTripInfoStore();

    try {
      const response = await axiosInstance.get<ApiResponse<{ travel: TripSimple; participants: ParticipantApiResponse[]; schedules: Schedule[];  accommodations: Place[] }>>(`/api/travel/${travelId}`);
      const apiResponse = response.data;

      if (apiResponse.code === 200 && apiResponse.success) {
        console.log('Travel detail fetched successfully:', apiResponse.message);
        const travelDetail = mapApiResponseToTravelDetail(apiResponse.data);
        console.log('travelDetail.participants', travelDetail.participants);
        // tripInfo에 할당
        tripInfoStore.setTripInfo({
          trip: travelDetail.travel,
          participants: travelDetail.participants,
          supplies: [], // 필요에 따라 추가
          accomodations: travelDetail.accommodations, 
          localVisitors: [], // 필요에 따라 추가
          budget: 0 // 필요에 따라 추가
        });
      } else {
        console.error('Failed to fetch travel detail:', apiResponse.message);
      }

    } catch (error) {
      console.error('Error occurred while fetching travel detail:', error);
    }
  }
}

export const travelService = new TravelService();
