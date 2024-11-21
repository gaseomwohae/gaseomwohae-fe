import type { User } from '@/domain/auth/model/auth.type';
import type { Store } from './store.type';

export interface Schedule {
  id: number;
  travelId: number;
  date: string;
  startTime: string;
  endTime: string;
  storeInfo: Store;
  userInfo: User;
}

export interface ScheduleTime {
  id: number;
  startTime: string;
  endTime: string;
}
