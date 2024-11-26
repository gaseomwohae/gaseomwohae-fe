import type { User } from '@/domain/auth/model/auth.type';

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
  photo: string;
  reviewText: string;
  reviewRate: number;
  user: User;
  createdAt: string;
}

export interface PlaceWithReview extends Place {
  reviews: Review[];
}
