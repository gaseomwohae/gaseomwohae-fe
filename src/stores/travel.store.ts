import type { Travel } from '@/domain/travel/model/travel.type';
import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useTravelStore = defineStore('travel', () => {
  const travelList = ref<Travel[]>([]);
  const selectedTravel = ref<Travel | null>(null);

  // TODO: 서버에서 여행 정보 받아오기
  const fetchTravelList = async () => {
    //travelList.value = await api.getTravel();
    // 임시 데이터
    travelList.value = [
      {
        id: 1,
        title: '여행 1',
        startDate: '2024-11-23',
        endDate: '2024-11-25',
        users: [
          {
            id: 1,
            name: '사용자 1',
            email: 'user1@example.com',
            profile: 'https://example.com/profile1.jpg',
          },
          {
            id: 2,
            name: '사용자 2',
            email: 'user2@example.com',
            profile: 'https://example.com/profile2.jpg',
          },
        ],
      },
      {
        id: 2,
        title: '여행 2',
        startDate: '2024-11-26',
        endDate: '2024-11-28',
        users: [
          {
            id: 1,
            name: '사용자 1',
            email: 'user1@example.com',
            profile: 'https://example.com/profile1.jpg',
          },
        ],
      },
      {
        id: 3,
        title: '여행 3',
        startDate: '2024-11-29',
        endDate: '2024-12-01',
        users: [
          {
            id: 1,
            name: '사용자 1',
            email: 'user1@example.com',
            profile: 'https://example.com/profile1.jpg',
          },
          {
            id: 2,
            name: '사용자 2',
            email: 'user2@example.com',
            profile: 'https://example.com/profile2.jpg',
          },
          {
            id: 3,
            name: '사용자 3',
            email: 'user3@example.com',
            profile: 'https://example.com/profile3.jpg',
          },
        ],
      },
    ];

    selectedTravel.value = travelList.value[0];
  };

  const updateSelectedTravel = (newTravel: Travel) => {
    selectedTravel.value = newTravel;
  };

  return { travelList, fetchTravelList, selectedTravel, updateSelectedTravel };
});
