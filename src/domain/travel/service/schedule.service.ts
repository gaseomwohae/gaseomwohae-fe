import axiosInstance from '@/domain/common/util/axios';
import type { ApiResponse } from '@/domain/common/model/response.type';
import { useScheduleStore } from '@/stores/schedule.store';
import type { Schedule } from '@/domain/travel/model/travel.type';

class ScheduleService {
  // 일정 추가하기
  async addSchedule(
    travelId: number, 
    placeId: number, 
    date: string, 
    startTime: string, 
    endTime: string,
    schedule: Schedule  // 전체 스케줄 객체 추가
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
        const newSchedule = { 
          ...schedule, 
          scheduleId: apiResponse.data.id
        };
        const updatedScheduleList = [...scheduleStore.scheduleList, newSchedule];
        scheduleStore.setScheduleList(updatedScheduleList);
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
        const updatedScheduleList = scheduleStore.scheduleList.filter(
          (s) => s.scheduleId !== scheduleId
        );
        scheduleStore.setScheduleList(updatedScheduleList);
      } else {
        console.error('Failed to delete schedule:', apiResponse.message);
      }
    } catch (error) {
      console.error('Error occurred while deleting schedule:', error);
      throw error;
    }
  }

  // 일정 수정하기
  async updateSchedule(scheduleId: number, startTime: string, endTime: string, newSchedule: Schedule): Promise<void> {
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
        const updatedScheduleList = scheduleStore.scheduleList.map((s) =>
          s.scheduleId === scheduleId ? newSchedule : s
        );
        scheduleStore.setScheduleList(updatedScheduleList);
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
