import { addDays } from "~/samples/shared/dates";

export const calendar = {
  dayNames: ["日", "月", "火", "水", "木", "金", "土"],
  spanDays: 14,
  lookaheadDays: 42,
  closedDay: 1,
  openHour: 10,
  lastHour: 18,
  slotMinutes: 30,
};

export type Availability = "x" | "few" | "ok";

export const sundayOf = (date: Date) => addDays(date, -date.getDay());

export const availability = (date: Date, today: Date): Availability => {
  if (date < today || date.getDay() === calendar.closedDay) return "x";
  const n = (date.getDate() * 5 + date.getMonth()) % 6;
  if (n === 0) return "x";
  return n < 2 ? "few" : "ok";
};

export const dayRange = (weekStart: Date) =>
  Array.from({ length: calendar.spanDays }, (_, i) => addDays(weekStart, i));

const startTimes = () => {
  const list: string[] = [];
  for (let hour = calendar.openHour; hour <= calendar.lastHour; hour += 1) {
    list.push(`${hour}:00`);
    if (hour < calendar.lastHour) list.push(`${hour}:30`);
  }
  return list;
};

export const slotsFor = (date: Date, minutes: number) => {
  const list = startTimes();
  const need = Math.ceil(minutes / calendar.slotMinutes);
  const seed = date.getDate() * 11 + date.getMonth();
  return list.map((time, i) => ({
    time,
    open: Array.from({ length: need }, (_, k) => i + k).every(
      (index) => index < list.length && (seed + index * 3) % 5 !== 0,
    ),
  }));
};

export const rangeLabel = (weekStart: Date) => {
  const end = addDays(weekStart, calendar.spanDays - 1);
  return `${weekStart.getMonth() + 1}/${weekStart.getDate()} – ${end.getMonth() + 1}/${end.getDate()}`;
};
