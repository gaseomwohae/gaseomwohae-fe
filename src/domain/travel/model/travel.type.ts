import type { User } from '@/domain/auth/model/auth.type';

export interface Travel {
  id: number;
  title: string;
  startDate: string;
  endDate: string;
  users: User[];
}

export interface Schedule {
  id: number;
  date: string;
  startTime: string;
  endTime: string;
  place: Place;
}

export interface Place {
  id: number;
  name: string;
  imgUrl: string;
  address: string;
  roadAddress: string;
  category: string;
  phone: string;
  url: string;
  reviewRate: number;
  x: number;
  y: number;
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
