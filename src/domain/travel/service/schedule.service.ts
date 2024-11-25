import axiosInstance from '@/domain/common/util/axios';
import type { ApiResponse } from '@/domain/common/model/response.type';

class ScheduleService {
  // 일정 추가하기
  async addSchedule(travelId: number, placeId: number, date: string, startTime: string, endTime: string): Promise<ApiResponse<null>> {
    try {
      const response = await axiosInstance.post<ApiResponse<null>>('/api/schedule', {
        travelId,
        placeId,
        date,
        startTime,
        endTime,
      });
      const apiResponse = response.data;

      if (apiResponse.code === 200 && apiResponse.success) {
        console.log('Schedule added successfully:', apiResponse.message);
      } else {
        console.error('Failed to add schedule:', apiResponse.message);
      }
      return apiResponse;
    } catch (error) {
      console.error('Error occurred while adding schedule:', error);
      throw error;
    }
  }

  // 일정 삭제하기
  async deleteSchedule(scheduleId: number): Promise<ApiResponse<null>> {
    try {
      const response = await axiosInstance.delete<ApiResponse<null>>(`/api/schedule/${scheduleId}`);
      const apiResponse = response.data;

      if (apiResponse.code === 200 && apiResponse.success) {
        console.log('Schedule deleted successfully:', apiResponse.message);
      } else {
        console.error('Failed to delete schedule:', apiResponse.message);
      }
      return apiResponse;
    } catch (error) {
      console.error('Error occurred while deleting schedule:', error);
      throw error;
    }
  }

  // 일정 수정하기
  async updateSchedule(scheduleId: number, startTime: string, endTime: string): Promise<ApiResponse<null>> {
    try {
      const response = await axiosInstance.put<ApiResponse<null>>(`/api/schedule/${scheduleId}`, {
        startTime,
        endTime,
      });
      const apiResponse = response.data;

      if (apiResponse.code === 200 && apiResponse.success) {
        console.log('Schedule updated successfully:', apiResponse.message);
      } else {
        console.error('Failed to update schedule:', apiResponse.message);
      }
      return apiResponse;
    } catch (error) {
      console.error('Error occurred while updating schedule:', error);
      throw error;
    }
  }
}

export const scheduleService = new ScheduleService();
