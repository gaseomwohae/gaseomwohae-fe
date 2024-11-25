import axiosInstance from '@/domain/common/util/axios';
import type { ApiResponse } from '@/domain/common/model/response.type';
import type { Supplies, SupplyItem } from '@/domain/supply/components/model/supply.type';
import { useTripInfoStore } from '@/stores/tripStore';

class SupplyService {
  async getSupplies(): Promise<Supplies> {
    try {
      const response = await axiosInstance.get<ApiResponse<Supplies>>('/api/travel/supply');
      const apiResponse = response.data;

      if (apiResponse.code === 200 && apiResponse.success) {
        console.log('Supplies fetched successfully:', apiResponse.data);
        return apiResponse.data || {};
      } else {
        console.error('Failed to fetch supplies:', apiResponse.message);
        return {};
      }
    } catch (error) {
      console.error('Error occurred while fetching supplies:', error);
      return {};
    }
  }

  async addSupply(travelId: number, supplyId: number, supplyItem: SupplyItem): Promise<ApiResponse<null>> {
    try {
      const response = await axiosInstance.post<ApiResponse<null>>('/api/travel/supply', {
        travelId,
        supplyId,
      });
      const apiResponse = response.data;

      if (apiResponse.code === 200 && apiResponse.success) {
        const tripStore = useTripInfoStore();
        tripStore.updateSupplies(supplyItem, 'add');
        console.log('Supply added successfully:', apiResponse.message);
      } else {
        console.error('Failed to add supply:', apiResponse.message);
      }
      return apiResponse;
    } catch (error) {
      console.error('Error occurred while adding supply:', error);
      throw error;
    }
  }

  async removeSupply(travelId: number, supplyId: number, supplyItem: SupplyItem): Promise<ApiResponse<null>> {
    try {
      const response = await axiosInstance.delete<ApiResponse<null>>('/api/travel/supply', {
        data: { travelId, supplyId },
      });
      const apiResponse = response.data;

      if (apiResponse.code === 200 && apiResponse.success) {
        const tripStore = useTripInfoStore();
        tripStore.updateSupplies(supplyItem, 'remove');
        console.log('Supply removed successfully:', apiResponse.message);
      } else {
        console.error('Failed to remove supply:', apiResponse.message);
      }
      return apiResponse;
    } catch (error) {
      console.error('Error occurred while removing supply:', error);
      throw error;
    }
  }
}

export const supplyService = new SupplyService();
