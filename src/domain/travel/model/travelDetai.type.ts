// src/domain/home/model/travelDetail.type.ts

import type { Participant, ParticipantApiResponse } from '@/domain/common/model/Participant.type';
import type { Schedule } from '@/domain/travel/model/schedule.type';
import { mapApiResponseToParticipant } from '@/domain/common/model/Participant.type';
import type { TripSimple } from "@/domain/common/model/TripSimple.type";
// 여행 상세 정보를 표현하는 타입
export type TravelDetail = {
  travel: TripSimple;
  participants: Participant[];
  schedules: Schedule[];
};

// API 응답을 TravelDetail 타입으로 변환하는 함수
export function mapApiResponseToTravelDetail(apiResponse: {
  travel: TripSimple;
  participants: ParticipantApiResponse[];
  schedules: Schedule[];
}): TravelDetail {
  return {
    travel: apiResponse.travel,
    participants: apiResponse.participants.map(mapApiResponseToParticipant),
    schedules: apiResponse.schedules,
  };
}