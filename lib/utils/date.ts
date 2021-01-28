import { Validator } from './validator';

/**
 * @param timestamp 时间戳
 * @param format yyyy-MM-dd HH:mm:ss
 */
export function formatDate(timestamp: number | string, format = 'yyyy-MM-dd HH:mm:ss'): string {
  const date = new Date(timestamp);
  if (format === 'timestamp') {
    return `${date.getTime()}`;
  }
  if (Number.isNaN(date.getTime())) {
    return '';
  }
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const time: any = {};
  time.Year = date.getFullYear();
  time.TYear = (`${time.Year}`).substr(2);
  time.Month = date.getMonth() + 1;
  time.TMonth = time.Month < 10 ? `0${time.Month}` : time.Month;
  time.Day = date.getDate();
  time.TDay = time.Day < 10 ? `0${time.Day}` : time.Day;
  time.Hour = date.getHours();
  time.THour = time.Hour < 10 ? `0${time.Hour}` : time.Hour;
  time.hour = time.Hour < 13 ? time.Hour : time.Hour - 12;
  time.Thour = time.hour < 10 ? `0${time.hour}` : time.hour;
  time.Minute = date.getMinutes();
  time.TMinute = time.Minute < 10 ? `0${time.Minute}` : time.Minute;
  time.Second = date.getSeconds();
  time.TSecond = time.Second < 10 ? `0${time.Second}` : time.Second;
  time.Millisecond = date.getMilliseconds();

  if (!Validator.isEmpty(format) && format.replace(/\s/g, '').length > 0) {
    return format
      .replace(/yyyy/ig, time.Year)
      .replace(/yyy/ig, time.Year)
      .replace(/yy/ig, time.TYear)
      .replace(/y/ig, time.TYear)
      .replace(/MM/g, time.TMonth)
      .replace(/M/g, time.Month)
      .replace(/dd/ig, time.TDay)
      .replace(/d/ig, time.Day)
      .replace(/HH/g, time.THour)
      .replace(/H/g, time.Hour)
      .replace(/hh/g, time.Thour)
      .replace(/h/g, time.hour)
      .replace(/mm/g, time.TMinute)
      .replace(/m/g, time.Minute)
      .replace(/ss/ig, time.TSecond)
      .replace(/s/ig, time.Second)
      .replace(/fff/ig, time.Millisecond);
  }
  return `${time.Year}-${time.TMonth}-${time.TDay} ${time.THour}:${time.TMinute}:${time.TSecond}`;
}

/**
 * 返回周对应的文字
 */
export function formatWeek(week: number): string {
  const weeks = ['周日', '周一', '周二', '周三', '周四', '周五', '周六', '周日'];
  return weeks[week];
}

/**
 * 返回指定日期所在周的整周时间
 */
export function getFullWeek(date: Date): Date[] {
  const today = date.getDay() || 7; // 周日返回的是0，这里给改成7
  const timestamp = date.getTime();
  const mondayTimestamp = timestamp - (today - 1) * 24 * 3600 * 1000; // 获取周一的时间戳
  const monday = new Date(mondayTimestamp);
  const sunday = new Date(mondayTimestamp + 6 * 24 * 3600 * 1000);
  const Week = [
    monday,
    new Date(mondayTimestamp + 1 * 24 * 3600 * 1000),
    new Date(mondayTimestamp + 2 * 24 * 3600 * 1000),
    new Date(mondayTimestamp + 3 * 24 * 3600 * 1000),
    new Date(mondayTimestamp + 4 * 24 * 3600 * 1000),
    new Date(mondayTimestamp + 5 * 24 * 3600 * 1000),
    sunday,
  ];
  return Week;
}

/**
 * 返回指定日期所在周的开始和结束日期
 */
export function getWeek(date: Date): { monday: Date; sunday: Date } {
  const today = date.getDay() || 7; // 周日返回的是0，这里给改成7
  const timestamp = date.getTime();
  const mondayTimestamp = timestamp - (today - 1) * 24 * 3600 * 1000; // 获取周一的时间戳
  const monday = new Date(mondayTimestamp);
  const sunday = new Date(mondayTimestamp + 6 * 24 * 3600 * 1000);
  const Week = {
    monday,
    sunday,
  };
  return Week;
}

export function customDateFormat(date: number): string {
  const now = formatDate(Date.now(), 'YYYYMMDD');
  const formateDate = formatDate(date, 'YYYYMMDD');
  if (now === formateDate) {
    return formatDate(date, 'HH:mm');
  }
  return formatDate(date, 'YYYY-MM-DD HH:mm');
}

/**
 * @param date yyyy-MM-dd HH:mm or HH:mm
 */
export function getHourAndMinute(date: string): string {
  if (date && date.length === 16) {
    return date.substring(11);
  }
  if (date && date.length === 5) {
    return date;
  }
  return '';
}

export function date2Timestamp(date: string | number | unknown) {
  return date ? new Date(date as string).getTime() : '';
}
