export const timeToMinutes = (time: string): number => {
  const [hours, minutes] = time.split(':').map(Number);
  return hours * 60 + minutes;
};

export const minutesToTime = (minutes: number): string => {
  const hours = Math.floor(minutes / 60);
  const mins = minutes % 60;
  return `${hours.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')}`;
};

export const generateTimeSlots = () => {
  const times: string[] = [];
  for (let hour = 0; hour < 24; hour++) {
    for (let minute = 0; minute < 60; minute += 30) {
      times.push(`${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`);
    }
  }
  return times;
};

// rem을 px로 변환하는 함수 추가
export const remToPx = (rem: number): number => {
  return rem * parseFloat(getComputedStyle(document.documentElement).fontSize);
};

// 마우스 위치를 시간으로 변환 - 30분 단위로 즉시 스냅
export const calculateTimeFromMousePosition = (e: MouseEvent): string => {
  const tableRect = (e.target as HTMLElement).closest('.time-table__body')?.getBoundingClientRect();
  if (!tableRect) return props.startTime;

  const relativeY = e.clientY - tableRect.top;
  const slotHeightPx = remToPx(SLOT_HEIGHT);

  // 바로 30분 단위로 반올림
  const slots = Math.round(relativeY / slotHeightPx);
  const minutes = slots * MINUTES_PER_SLOT;

  // 0시부터 24시 사이로 제한
  const limitedMinutes = Math.max(0, Math.min(24 * 60 - MINUTES_PER_SLOT, minutes));

  return minutesToTime(limitedMinutes);
};
