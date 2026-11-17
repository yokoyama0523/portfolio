import { addDays, ymd } from "~/samples/shared/dates";
import {
  fits,
  freeChairs,
  isClosed,
  type Reservation,
  type Settings,
  slotTimes,
  toMinutes,
} from "../admin/store";

export const calendar = {
  dayNames: ["日", "月", "火", "水", "木", "金", "土"],
  spanDays: 14,
  fewSlots: 3,
};

export type Availability = "x" | "few" | "ok";

export type ClinicData = { reservations: Reservation[]; settings: Settings };

export const minutesFor = (kind: string) => (kind === "初診" ? 60 : 30);

export const sundayOf = (date: Date) => addDays(date, -date.getDay());

export const dayRange = (weekStart: Date) =>
  Array.from({ length: calendar.spanDays }, (_, i) => addDays(weekStart, i));

const nowMinutes = () => new Date().getHours() * 60 + new Date().getMinutes();

export const slotsFor = (date: Date, data: ClinicData, minutes: number) => {
  const today = ymd(date) === ymd(new Date());
  return slotTimes(date, data.settings).map((time) => ({
    time,
    open:
      !(today && toMinutes(time) <= nowMinutes()) &&
      fits(date, time, minutes, data.settings) &&
      freeChairs(data, ymd(date), time, minutes).length > 0,
  }));
};

export const availability = (
  date: Date,
  today: Date,
  data: ClinicData,
  minutes: number,
): Availability => {
  if (
    date < today ||
    date > addDays(today, data.settings.lookaheadDays) ||
    isClosed(date, data.settings)
  )
    return "x";
  const free = slotsFor(date, data, minutes).filter((slot) => slot.open).length;
  if (free === 0) return "x";
  return free <= calendar.fewSlots ? "few" : "ok";
};

export const rangeLabel = (weekStart: Date) => {
  const end = addDays(weekStart, calendar.spanDays - 1);
  return `${weekStart.getMonth() + 1}月${weekStart.getDate()}日 〜 ${end.getMonth() + 1}月${end.getDate()}日`;
};
