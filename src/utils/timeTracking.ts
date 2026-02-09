// دوال حساب متوسط الوقت

export interface TimeStats {
  averageTime: number; // بالدقائق
  standardTime: number; // بالدقائق
  percentage: number; // نسبة التجاوز
  status: 'normal' | 'warning' | 'critical'; // الحالة
  color: 'green' | 'yellow' | 'red'; // اللون
}

/**
 * حساب متوسط الوقت لقسم معين
 */
export function calculateAverageTime(
  startTimes: Date[],
  endTimes: Date[],
  standardTimeMinutes: number
): TimeStats {
  if (startTimes.length === 0 || endTimes.length === 0) {
    return {
      averageTime: 0,
      standardTime: standardTimeMinutes,
      percentage: 0,
      status: 'normal',
      color: 'green',
    };
  }
  
  // حساب متوسط الوقت بالدقائق
  let totalMinutes = 0;
  const validPairs = Math.min(startTimes.length, endTimes.length);
  
  for (let i = 0; i < validPairs; i++) {
    const start = new Date(startTimes[i]);
    const end = new Date(endTimes[i]);
    const diffMs = end.getTime() - start.getTime();
    const diffMinutes = diffMs / (1000 * 60);
    totalMinutes += diffMinutes;
  }
  
  const averageTime = totalMinutes / validPairs;
  
  // حساب نسبة التجاوز
  const percentage = standardTimeMinutes > 0
    ? ((averageTime - standardTimeMinutes) / standardTimeMinutes) * 100
    : 0;
  
  // تحديد الحالة واللون
  let status: 'normal' | 'warning' | 'critical' = 'normal';
  let color: 'green' | 'yellow' | 'red' = 'green';
  
  if (percentage > 20) {
    status = 'critical';
    color = 'red';
  } else if (percentage > 10) {
    status = 'warning';
    color = 'yellow';
  }
  
  return {
    averageTime: Math.round(averageTime),
    standardTime: standardTimeMinutes,
    percentage: Math.round(percentage * 100) / 100,
    status,
    color,
  };
}

/**
 * حساب الوقت المتبقي
 */
export function calculateRemainingTime(
  startTime: Date,
  standardTimeMinutes: number
): number {
  const now = new Date();
  const elapsed = (now.getTime() - startTime.getTime()) / (1000 * 60);
  return Math.max(0, standardTimeMinutes - elapsed);
}

/**
 * تنسيق الوقت بالدقائق إلى نص مقروء
 */
export function formatTime(minutes: number): string {
  if (minutes < 60) {
    return `${Math.round(minutes)} دقيقة`;
  }
  
  const hours = Math.floor(minutes / 60);
  const mins = Math.round(minutes % 60);
  
  if (mins === 0) {
    return `${hours} ساعة`;
  }
  
  return `${hours} ساعة و ${mins} دقيقة`;
}

