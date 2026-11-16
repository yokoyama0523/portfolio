export const dayNames = "日月火水木金土";

const SUNDAY = 0;
const SATURDAY = 6;

export const addDays = (date: Date, days: number) => {
  const next = new Date(date);
  next.setDate(date.getDate() + days);
  return next;
};

export const startOfToday = () => {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  return today;
};

export const mondayOf = (date: Date) => addDays(date, -((date.getDay() + 6) % 7));

export const isWeekend = (date: Date) => date.getDay() === SUNDAY || date.getDay() === SATURDAY;

export const ymd = (date: Date) =>
  `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`;

export const monthDay = (date: Date) => `${date.getMonth() + 1}月${date.getDate()}日`;

export const jpDate = (date: Date) => `${monthDay(date)}（${dayNames[date.getDay()]}）`;

export const shortDate = (date: Date) => `${date.getMonth() + 1}/${date.getDate()}`;

export const shortDateWithDay = (date: Date) => `${shortDate(date)}（${dayNames[date.getDay()]}）`;

export const receiptSerial = () => String(Math.floor(Math.random() * 900) + 100);
