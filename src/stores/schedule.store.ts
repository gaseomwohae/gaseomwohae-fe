import type { Schedule } from '@/domain/travel/model/travel.type';
import { timeToMinutes } from '@/domain/travel/utils/time.util';
import { defineStore } from 'pinia';
import { ref } from 'vue';

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
  };

  const setScheduleList = (newScheduleList: Schedule[]) => {
    scheduleList.value = newScheduleList;
  };

  const fetchScheduleList = async () => {
    // TODO: 서버에서 일정 목록 받아오기
    // 임시 데이터
    scheduleList.value = [
      {
        scheduleId: 1,
        date: '2024-11-23',
        startTime: '10:00',
        endTime: '12:00',
        place: {
          id: 1,
          name: '장소 1',
          address: '주소 1',
          thumbnail: 'https://example.com/image1.jpg',
          roadAddress: '도로명 주소 1',
          category: '카테고리 1',
          phone: '010-1234-5678',
          url: 'https://example.com',
          x: 127.032332,
          y: 37.501289,
        },
      },
      {
        date: '2024-11-24',
        startTime: '13:00',
        endTime: '15:00',
        scheduleId: 2,
        place: {
          id: 2,
          name: '장소 2',
          address: '주소 2',
          thumbnail: 'https://example.com/image2.jpg',
          roadAddress: '도로명 주소 2',
          category: '카테고리 2',
          phone: '010-1234-5678',
          url: 'https://example.com',
          x: 127.032332,
          y: 37.501289,
        },
      },
    ];
  };

  const deleteSchedule = (id: number) => {
    scheduleList.value = scheduleList.value.filter((s) => s.scheduleId !== id);
    // TODO: 서버에서 삭제
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

    scheduleList.value.push({ ...schedule, scheduleId: new Date().getTime() });
  };

  return {
    scheduleList,
    updateSchedule,
    fetchScheduleList,
    draggingSchedule,
    setDraggingSchedule,
    deleteDraggingSchedule,
    draggingScheduleDuration,
    deleteSchedule,
    addSchedule,
    setScheduleList,
  };
});
