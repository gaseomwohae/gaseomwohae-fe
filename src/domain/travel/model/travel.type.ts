// src/domain/travel/model/travel.type.ts

import type { UserInfo } from '@/domain/user/service/user.service';

export type WeatherInfo = {
  date: string;    // 날짜 (예: "2024-11-28")
  minTemp: number; // 최저 기온
  maxTemp: number; // 최고 기온
  sky: number;     // 하늘 상태 (1: 맑음, 4: 흐림, 5: 비 등)
};

export interface Schedule {
  scheduleId: number;
  date: string;
  startTime: string;
  endTime: string;
  place: Place;
}

export interface Place {
  id: number;
  name: string;
  category: string;
  address: string;
  roadAddress: string;
  thumbnail: string;
  phone: string;
  url: string;
  x: number;
  y: number;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
  rating: number; // 상태 관리 시 사용할 rating 필드 추가
}

export interface Review {
  id: number;
  placeId: number;
  rating: number;
  content: string;
  image: string;
  user: UserInfo;
  createdAt: string;
}

export interface PlaceWithReview extends Place {
  reviews: Review[];
}
