// src/domain/travel/model/schedule.type.ts

// API에서 받는 데이터 형식
export type Schedule = {
  id: number;
  travelId: number;
  placeId: number;
  date: string; // 날짜는 ISO 8601 형식의 문자열로 표현
  startTime: string; // 시작 시간은 HH:mm:ss 형식의 문자열로 표현
  endTime: string; // 종료 시간은 HH:mm:ss 형식의 문자열로 표현
  createdAt: string; // 생성 시간은 ISO 8601 형식의 문자열로 표현
  updatedAt: string; // 업데이트 시간은 ISO 8601 형식의 문자열로 표현
  deletedAt: string | null; // 삭제 시간은 ISO 8601 형식의 문자열 또는 null
};

// Schedule 타입의 리스트
export type ScheduleList = Schedule[];


