import type { User } from '@/domain/auth/model/auth.type';

export interface Store {
  id: number;
  name: string;
  img: string;
  address: string;
  category: string;
  reviewRate: number;
  description: string;
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
