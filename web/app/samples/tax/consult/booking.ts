import { addDays, isWeekend, receiptSerial, ymd } from "~/samples/shared/dates";
import { isEmail, isFilled, isPhone } from "~/samples/shared/validation";

export const calendar = {
  weekdays: ["月", "火", "水", "木", "金"],
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
  `A${ymd(date).replace(/-/g, "").slice(2)}-${receiptSerial()}`;

export const validators = { name: isFilled, tel: isPhone, email: isEmail };

export type RequiredField = keyof typeof validators;
