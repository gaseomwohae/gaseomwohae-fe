import axiosInstance from '@/domain/common/util/axios';
import type { Store, StoreReview } from '../model/store.type';

class StoreService {
  async getStoreList(): Promise<Store[]> {
    return axiosInstance.get('/api/store');
  }

  async getReview(): Promise<StoreReview> {
    return axiosInstance.get('/api/review');
  }
}

export default new StoreService();
