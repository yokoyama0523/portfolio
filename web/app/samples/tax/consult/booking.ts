export const calendar = {
  weekdays: ["月", "火", "水", "木", "金"],
  dayNames: "日月火水木金土",
  spanDays: 14,
  lastShownOffset: 11,
  lookaheadDays: 42,
  holidays: [
    "2026-11-23",
    "2026-12-29",
    "2026-12-30",
    "2026-12-31",
    "2027-01-01",
    "2027-01-02",
    "2027-01-03",
  ],
  slots: ["9:00", "10:00", "11:00", "13:00", "14:00", "15:00", "16:00", "17:00"],
};

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

export const ymd = (date: Date) =>
  `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`;

export const jpDate = (date: Date) =>
  `${date.getMonth() + 1}月${date.getDate()}日（${calendar.dayNames[date.getDay()]}）`;

export const shortDate = (date: Date) => `${date.getMonth() + 1}/${date.getDate()}`;

export const monthDay = (date: Date) => `${date.getMonth() + 1}月${date.getDate()}日`;

const isWeekend = (date: Date) => date.getDay() === SUNDAY || date.getDay() === SATURDAY;

export const vacancy = (date: Date, today: Date) => {
  if (date <= today || isWeekend(date) || calendar.holidays.includes(ymd(date))) return 0;
  return 1 + ((date.getDate() * 5 + date.getMonth()) % 4);
};

export const weekdaysFrom = (weekStart: Date) =>
  Array.from({ length: calendar.spanDays }, (_, i) => addDays(weekStart, i)).filter(
    (date) => !isWeekend(date),
  );

export const openSlots = (date: Date, today: Date) => {
  const seed = date.getDate() * 7 + date.getMonth();
  return new Set(
    Array.from({ length: vacancy(date, today) }, (_, k) => (seed + k * 3) % calendar.slots.length),
  );
};

export const receiptNumber = (date: Date) =>
  `A${ymd(date).replace(/-/g, "").slice(2)}-${String(Math.floor(Math.random() * 900) + 100)}`;

export const validators = {
  name: (value: string) => value.trim() !== "",
  tel: (value: string) => /^[0-9０-９\-－ ]{10,14}$/.test(value),
  email: (value: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value),
};

export type RequiredField = keyof typeof validators;
