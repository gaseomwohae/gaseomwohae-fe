import type { DailySchedule, ScheduleItem } from '@/domain/travel/model/travel.type';
import { timeToMinutes } from '@/domain/travel/utils/time.util';
import { defineStore } from 'pinia';
import { ref } from 'vue';
import { scheduleService } from '@/domain/travel/service/schedule.service';
import { useTripInfoStore } from "./tripStore";

export const useScheduleStore = defineStore('schedule', () => {

  const scheduleList = ref<DailySchedule[]>([]);
  const draggingSchedule = ref<ScheduleItem | null>(null);
  const draggingScheduleDuration = ref(0);

  const updateSchedule = async (newSchedule: ScheduleItem) => {
    await scheduleService.updateSchedule(
      newSchedule.scheduleId, 
      newSchedule.startTime, 
      newSchedule.endTime,
      newSchedule  // 전체 스케줄 객체 전달
    );
  };

  const setScheduleList = (newScheduleList: DailySchedule[]) => {
    scheduleList.value = newScheduleList;
  };


  const deleteSchedule = async (id: number) => {
    await scheduleService.deleteSchedule(id);
  };

  const setDraggingSchedule = (schedule: ScheduleItem) => {
    draggingSchedule.value = schedule;
    draggingScheduleDuration.value =
      timeToMinutes(schedule.endTime) - timeToMinutes(schedule.startTime);
  };

  const deleteDraggingSchedule = () => {
    draggingSchedule.value = null;
    draggingScheduleDuration.value = 30;
  };

  const addSchedule = async (schedule: ScheduleItem) => {
    const tripInfoStore = useTripInfoStore();
    if (tripInfoStore.tripInfo) {
      // API 생성 호출
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

  
  const addScheduleItem = async (schedule: ScheduleItem) => {
    // 날짜가 일치하는 DailySchedule을 찾습니다.
    const dailySchedule = scheduleList.value.find(daily => daily.date === schedule.date);
  
    if (dailySchedule) {
      // 일치하는 날짜가 있으면 기존 schedule 배열에 새로운 schedule을 추가한 후, 새 배열로 주입합니다.
      dailySchedule.schedule = [...dailySchedule.schedule, schedule];
    } else {
      // 일치하는 날짜가 없으면 새로운 DailySchedule을 생성하여 추가합니다.
      scheduleList.value.push({
        date: schedule.date,
        schedule: [schedule],
      });
    }
    console.log('add Before scheduleList.value', scheduleList.value);
    // scheduleList의 상태를 새로 갱신합니다.
    scheduleList.value = [...scheduleList.value];
    console.log('add After scheduleList.value', scheduleList.value);
  };

  const updateScheduleItem = async (schedule: ScheduleItem) => {
    // 날짜가 일치하는 DailySchedule을 찾습니다.
    const dailyScheduleIndex = scheduleList.value.findIndex(daily => daily.date === schedule.date);

    if (dailyScheduleIndex !== -1) {
      // 일치하는 날짜가 있으면 기존 schedule 배열에서 scheduleId가 일치하는 항목을 업데이트합니다.
      scheduleList.value[dailyScheduleIndex].schedule = scheduleList.value[dailyScheduleIndex].schedule.map(s => 
        s.scheduleId === schedule.scheduleId ? schedule : s
      );
    } else {
      // 일치하는 날짜가 없으면 새로운 DailySchedule을 생성하여 추가합니다.
      scheduleList.value.push({
        date: schedule.date,
        schedule: [schedule],
      });
    }

    console.log('update Before scheduleList.value', scheduleList.value);

    // scheduleList의 상태를 새로 갱신합니다.
    scheduleList.value = [...scheduleList.value];

    console.log('update After scheduleList.value', scheduleList.value);
  };

  const deleteScheduleItem = async (scheduleId: number) => {
    console.log('delete Before scheduleList.value', scheduleList.value);

    // 각 DailySchedule의 schedule 배열에서 scheduleId가 일치하는 ScheduleItem을 제거합니다.
    scheduleList.value = scheduleList.value.map(daily => ({
      date: daily.date,
      schedule: daily.schedule.filter(schedule => schedule.scheduleId !== scheduleId)
    }));

    console.log('delete After scheduleList.value', scheduleList.value);
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
    updateScheduleItem,
    addScheduleItem,
    deleteScheduleItem,
  };
});
