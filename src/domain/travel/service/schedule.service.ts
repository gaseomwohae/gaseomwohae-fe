import axiosInstance from '@/domain/common/util/axios';
import type { ApiResponse } from '@/domain/common/model/response.type';
import { useScheduleStore } from '@/stores/schedule.store';
import type { ScheduleItem } from '@/domain/travel/model/travel.type';

class ScheduleService {
  // 일정 추가하기
  async addSchedule(
    travelId: number, 
    placeId: number, 
    date: string, 
    startTime: string, 
    endTime: string,
    schedule: ScheduleItem  // 전체 스케줄 객체 추가
  ): Promise<void> {
    try {
      const response = await axiosInstance.post<ApiResponse<number>>('/api/schedule', {
        travelId,
        placeId,
        date,
        startTime,
        endTime,
      });
      const apiResponse = response.data;

      if (apiResponse.code === 200 && apiResponse.success) {
        console.log('Schedule added successfully:', apiResponse.message);
        // store에 직접 추가
        const scheduleStore = useScheduleStore();

        console.log('scheduleId apiResponse.data', apiResponse.data.id);
        // 새로운 일정 객체 생성
        const newSchedule = { 
          ...schedule, 
          scheduleId: apiResponse.data.id
        };
        // 기존 일정 리스트에 추가
        
        scheduleStore.addScheduleItem(newSchedule);
      } else {
        console.error('Failed to add schedule:', apiResponse.message);
      }
    } catch (error) {
      console.error('Error occurred while adding schedule:', error);
      throw error;
    }
  }

  // 일정 삭제하기
  async deleteSchedule(scheduleId: number): Promise<void> {
    try {
      const response = await axiosInstance.delete<ApiResponse<null>>(`/api/schedule/${scheduleId}`);
      const apiResponse = response.data;

      if (apiResponse.code === 200 && apiResponse.success) {
        console.log('Schedule deleted successfully:', apiResponse.message);
        // 200 응답일 때만 store 상태 업데이트
        const scheduleStore = useScheduleStore();
        scheduleStore.deleteScheduleItem(scheduleId);
      } else {
        console.error('Failed to delete schedule:', apiResponse.message);
      }
    } catch (error) {
      console.error('Error occurred while deleting schedule:', error);
      throw error;
    }
  }

  // 일정 수정하기
  async updateSchedule(scheduleId: number, startTime: string, endTime: string, newSchedule: ScheduleItem): Promise<void> {
    try {
      const response = await axiosInstance.put<ApiResponse<null>>(`/api/schedule/${scheduleId}`, {
        startTime,
        endTime,
      });
      const apiResponse = response.data;


      if (apiResponse.code === 200 && apiResponse.success) {
        console.log('Schedule updated successfully:', apiResponse.message);
        // 200 응답일 때만 store 상태 업데이트
        const scheduleStore = useScheduleStore();
        scheduleStore.updateScheduleItem(newSchedule);
      } else {
        console.error('Failed to update schedule:', apiResponse.message);
      }
    } catch (error) {
      console.error('Error occurred while updating schedule:', error);
      throw error;
    }
  }
}

export const scheduleService = new ScheduleService();
