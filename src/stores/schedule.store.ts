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

  const updateSchedule = (newSchedule: Schedule) => {
    scheduleList.value = scheduleList.value.map((s) =>
      s.scheduleId === newSchedule.scheduleId ? newSchedule : s,
    );
    console.log(scheduleList.value);
    // TODO: 서버로 전송
    scheduleService.updateSchedule(newSchedule.scheduleId, newSchedule.startTime, newSchedule.endTime);
  };

  const setScheduleList = (newScheduleList: Schedule[]) => {
    scheduleList.value = newScheduleList;
  };


  const deleteSchedule = (id: number) => {
    scheduleList.value = scheduleList.value.filter((s) => s.scheduleId !== id);
    // TODO: 서버에서 삭제
    scheduleService.deleteSchedule(id);
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

  const addSchedule = (schedule: Schedule) => {
    // TODO: 서버에 추가 id값 받아와서 추가해야함
    const tripInfoStore = useTripInfoStore();
    if (tripInfoStore.tripInfo) {
      scheduleService.addSchedule(tripInfoStore.tripInfo.trip.id, schedule.place.id, schedule.date, schedule.startTime, schedule.endTime);
    }
    scheduleList.value.push({ ...schedule, scheduleId: new Date().getTime() });
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
