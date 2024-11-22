import type { User } from '@/domain/auth/model/auth.type';

export interface Store {
  id: number;
  name: string;
  img: string;
  address: string;
  roadAddress: string;
  category: string;
  phone: string;
  url: string;
  reviewRate: number;
  description: string;
  x: number;
  y: number;
}

export interface UserReview {
  id: number;
  photo: string;
  review: string;
  rate: number;
  userInfo: User;
  createdAt: string;
}

export interface StoreReview extends Store {
  reviews: UserReview[];
}
