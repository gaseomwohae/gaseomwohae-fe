import type { ApiResponse } from '@/domain/common/model/response.type';
import axiosInstance from '@/domain/common/util/axios';
import type { TripInfo } from '../model/tripInfo.type';
import type { TripSimple } from '@/domain/common/model/TripSimple.type';
import { useTripStore, useTripInfoStore } from '@/stores/tripStore';

class HomeService {
  async createTrip(tripRequest: {
    name: string;
    destination: string;
    startDate: string;
    endDate: string;
  }) {
    try {
      const response = await axiosInstance.post<ApiResponse<TripInfo>>('/api/travel', tripRequest);
      const apiResponse = response.data;

      if (apiResponse.code === 200 && apiResponse.success) {
        console.log('Trip created successfully:', apiResponse.message);
        await this.getTravelList();
      } else {
        console.error('Failed to create trip:', apiResponse.message);
      }
    } catch (error) {
      console.error('Error occurred while creating trip:', error);
    }
  }

  async getTravelList() {
    const tripStore = useTripStore();
    const tripInfoStore = useTripInfoStore();
    try {
      const response = await axiosInstance.get<ApiResponse<TripSimple[]>>('/api/travel');
      const apiResponse = response.data;

      if (apiResponse.code === 200 && apiResponse.success) {
        const travels = apiResponse.data || [];

        tripStore.setTripSimpleList(travels);

        if (travels.length > 0) {
          const latestTravel = travels[0];

          const tripInfo = {
            trip: latestTravel,
            tripStartDate: latestTravel.startDate,
            tripEndDate: latestTravel.endDate,
            participants: [],
            tripRoute: {
              startDestination: {
                id: 1,
                name: '출발지',
                latitude: 0,
                longitude: 0,
                imgSrc: ''
              },
              endDestination: {
                id: 2,
                name: latestTravel.destination,
                latitude: 0,
                longitude: 0,
                imgSrc: ''
              },
              travelTime: '미정'
            },
            supplies: [],
            accomodations: [],
            localVisitors: [],
            budget: 0
          };

          tripInfoStore.setTripInfo(tripInfo);
        }

        tripStore.setParticipantList([
          {
            id: 1,
            name: '홍길동',
            isActive: true,
          },
          {
            id: 2,
            name: '김길동',
            isActive: false,
          },
          {
            id: 3,
            name: '이길동',
            isActive: false,
          },
        ]);
      } else {
        console.error('여행 정보를 가져오는데 실패했습니다. 메시지:', apiResponse.message);
      }
    } catch (error) {
      console.error('API 호출 중 오류 발생:', error);
    }
  }

  async updateTrip(travelId: number, tripRequest: {
    name: string;
    destination: string;
    startDate: string;
    endDate: string;
  }) {
    const tripStore = useTripStore();
    const tripInfoStore = useTripInfoStore();

    try {
      const response = await axiosInstance.put<ApiResponse<null>>(`/api/travel/${travelId}`, tripRequest);
      const apiResponse = response.data;

      if (apiResponse.code === 200 && apiResponse.success) {
        console.log('Trip updated successfully:', apiResponse.message);

        // 갱신된 데이터를 사용하여 tripInfo 상태 업데이트
        const updatedTripInfo = {
          trip: {
            id: travelId,
            name: tripRequest.name,
            destination: tripRequest.destination,
            startDate: tripRequest.startDate,
            endDate: tripRequest.endDate,
            createdAt: new Date().toISOString(), // 예시로 현재 시간을 사용
            updatedAt: new Date().toISOString(),
            deletedAt: null
          },
          tripStartDate: tripRequest.startDate,
          tripEndDate: tripRequest.endDate,
          participants: [],
          tripRoute: {
            startDestination: {
              id: 1,
              name: '출발지',
              latitude: 0,
              longitude: 0,
              imgSrc: ''
            },
            endDestination: {
              id: 2,
              name: tripRequest.destination,
              latitude: 0,
              longitude: 0,
              imgSrc: ''
            },
            travelTime: '미정'
          },
          supplies: [],
          accomodations: [],
          localVisitors: [],
          budget: 0
        };

        tripInfoStore.setTripInfo(updatedTripInfo);

        // tripSimpleList에서 해당 tripId를 가진 항목을 갱신
        const updatedTripSimpleList = tripStore.tripSimpleList.map(trip =>
          trip.id === travelId ? { ...trip, ...tripRequest } : trip
        );
        tripStore.setTripSimpleList(updatedTripSimpleList);
      } else {
        console.error('Failed to update trip:', apiResponse.message);
      }
    } catch (error) {
      console.error('Error occurred while updating trip:', error);
    }
  }
}

export const homeService = new HomeService(); 