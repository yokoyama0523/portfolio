import { addDays, ymd } from "~/samples/shared/dates";

export const calendar = {
  dayNames: ["日", "月", "火", "水", "木", "金", "土"],
  spanDays: 14,
  lookaheadDays: 28,
  closedDay: 4,
  holidays: [
    "2026-11-23",
    "2026-12-29",
    "2026-12-30",
    "2026-12-31",
    "2027-01-01",
    "2027-01-02",
    "2027-01-03",
  ],
  slots: [
    "9:30",
    "10:00",
    "10:30",
    "11:00",
    "11:30",
    "12:00",
    "14:30",
    "15:00",
    "15:30",
    "16:00",
    "16:30",
    "17:00",
    "17:30",
    "18:00",
    "18:30",
  ],
  weekendClose: "17:00",
};

export type Availability = "x" | "few" | "ok";

const SUNDAY = 0;
const SATURDAY = 6;

export const sundayOf = (date: Date) => addDays(date, -date.getDay());

export const dayRange = (weekStart: Date) =>
  Array.from({ length: calendar.spanDays }, (_, i) => addDays(weekStart, i));

export const availability = (date: Date, today: Date): Availability => {
  if (date < today || date.getDay() === calendar.closedDay || calendar.holidays.includes(ymd(date)))
    return "x";
  const n = (date.getDate() * 7 + date.getMonth() * 3) % 5;
  if (n === 0) return "x";
  return n < 2 ? "few" : "ok";
};

const minutes = (time: string) => {
  const [hour, minute] = time.split(":").map(Number);
  return hour * 60 + minute;
};

export const slotsFor = (date: Date) => {
  const weekend = date.getDay() === SUNDAY || date.getDay() === SATURDAY;
  const list = weekend
    ? calendar.slots.filter((time) => minutes(time) < minutes(calendar.weekendClose))
    : calendar.slots;
  const seed = date.getDate() * 13 + date.getMonth();
  return list.map((time, i) => ({ time, open: (seed + i * 7) % 4 !== 0 }));
};

export const rangeLabel = (weekStart: Date) => {
  const end = addDays(weekStart, calendar.spanDays - 1);
  return `${weekStart.getMonth() + 1}月${weekStart.getDate()}日 〜 ${end.getMonth() + 1}月${end.getDate()}日`;
};
