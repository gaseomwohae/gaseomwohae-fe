// 00:00 ~ 23:30 까지 30분 단위로 시간 텍스트 생성
export const TIME_SLOTS = Array.from({ length: 48 }, (_, i) => {
  const hour = Math.floor(i / 2);
  const minute = (i % 2) * 30;
  return `${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`;
});

export const timeToMinutes = (time: string | undefined): number => {
  if (!time) {
    console.error('Invalid time input:', time);
    return 0; // 기본값을 반환하거나 예외를 던질 수 있습니다.
  }

  const [hours, minutes] = time.split(':').map(Number);
  return hours * 60 + minutes;
};

export const minutesToTime = (minutes: number): string => {
  const hours = Math.floor(minutes / 60);
  const mins = minutes % 60;
  return `${hours.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')}`;
};

// rem을 px로 변환하는 함수 추가
export const remToPx = (rem: number): number => {
  return rem * parseFloat(getComputedStyle(document.documentElement).fontSize);
};



export function formatDateTime(isoString: string): string {
  const date = new Date(isoString);

  const year = date.getFullYear();
  const month = date.getMonth() + 1; // 월은 0부터 시작하므로 +1
  const day = date.getDate();
  const hours = date.getHours();
  const minutes = date.getMinutes();

  // 두 자리 숫자로 포맷팅
  const formattedMonth = month.toString().padStart(2, '0');
  const formattedDay = day.toString().padStart(2, '0');
  const formattedHours = hours.toString().padStart(2, '0');
  const formattedMinutes = minutes.toString().padStart(2, '0');

  return `${year}년 ${formattedMonth}월 ${formattedDay}일 ${formattedHours}시 ${formattedMinutes}분`;
}