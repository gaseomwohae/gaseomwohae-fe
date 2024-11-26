import type { Schedule } from '@/domain/travel/model/travel.type';
import { timeToMinutes } from '@/domain/travel/utils/time.util';
import { defineStore } from 'pinia';
import { ref } from 'vue';
import { scheduleService } from '@/domain/travel/service/schedule.service';
import { useTripInfoStore } from "./tripStore";

export const useScheduleStore = defineStore('schedule', () => {
  
  const scheduleList = ref<Schedule[]>([]);
  const draggingSchedule = ref<Schedule | null>(null);
  const draggingScheduleDuration = ref(0);

  const updateSchedule = async (newSchedule: Schedule) => {
    await scheduleService.updateSchedule(
      newSchedule.scheduleId, 
      newSchedule.startTime, 
      newSchedule.endTime,
      newSchedule  // 전체 스케줄 객체 전달
    );
  };

  const setScheduleList = (newScheduleList: Schedule[]) => {
    scheduleList.value = newScheduleList;
  };


  const deleteSchedule = async (id: number) => {
    await scheduleService.deleteSchedule(id);
  };

  const setDraggingSchedule = (schedule: Schedule) => {
    draggingSchedule.value = schedule;
    draggingScheduleDuration.value =
      timeToMinutes(schedule.endTime) - timeToMinutes(schedule.startTime);
  };

  const deleteDraggingSchedule = () => {
    draggingSchedule.value = null;
    draggingScheduleDuration.value = 30;
  };

  const addSchedule = async (schedule: Schedule) => {
    const tripInfoStore = useTripInfoStore();
    if (tripInfoStore.tripInfo) {
      await scheduleService.addSchedule(
        tripInfoStore.tripInfo.trip.id, 
        schedule.place.id, 
        schedule.date, 
        schedule.startTime, 
        schedule.endTime,
        schedule  // 전체 스케줄 객체 전달
      );
    }
  };

  return {
    scheduleList,
    updateSchedule,
    draggingSchedule,
    setDraggingSchedule,
    deleteDraggingSchedule,
    draggingScheduleDuration,
    deleteSchedule,
    addSchedule,
    setScheduleList,
  };
});
