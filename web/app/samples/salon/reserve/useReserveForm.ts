import { type FormEvent, useEffect, useState } from "react";
import { addDays, receiptSerial, startOfToday, ymd } from "~/samples/shared/dates";
import { useFields } from "~/samples/shared/form/useFields";
import { useStepper } from "~/samples/shared/form/useStepper";
import { isEmail, isFilled, isKana, isPhone } from "~/samples/shared/validation";
import { reserve } from "../content/reserve";
import { calendar, sundayOf } from "./calendar";

export const STEP = { menu: 1, stylist: 2, date: 3, contact: 4, confirm: 5, done: 6 } as const;

const isOptionalEmail = (value: string) => value === "" || isEmail(value);

const { contact } = reserve;

export function useReserveForm() {
  const { step, go } = useStepper();
  const [menus, setMenus] = useState<string[]>(reserve.menu.initial);
  const [stylist, setStylist] = useState(reserve.stylist.options[0].name);
  const [today, setToday] = useState<Date | null>(null);
  const [weekStart, setWeekStart] = useState<Date | null>(null);
  const [date, setDate] = useState<Date | null>(null);
  const [time, setTime] = useState<string | null>(null);
  const [receipt, setReceipt] = useState("");
  const fields = useFields(
    {
      name: "",
      kana: "",
      tel: "",
      email: "",
      visit: contact.visit.options[0],
      hair: contact.hair.options[0],
      note: "",
    },
    { name: isFilled, kana: isKana, tel: isPhone, email: isOptionalEmail },
  );

  useEffect(() => {
    const now = startOfToday();
    setToday(now);
    setWeekStart(sundayOf(now));
  }, []);

  const chosen = reserve.menu.items.filter((item) => menus.includes(item.name));
  const totals = {
    yen: chosen.reduce((sum, item) => sum + item.price, 0),
    minutes: chosen.reduce((sum, item) => sum + item.minutes, 0),
  };

  const toggleMenu = (name: string) => {
    setMenus((current) =>
      current.includes(name) ? current.filter((item) => item !== name) : [...current, name],
    );
    setTime(null);
  };

  const pickDate = (picked: Date) => {
    setDate(picked);
    setTime(null);
  };

  const lastWeekStart = today ? addDays(today, calendar.lookaheadDays) : null;
  const moveWeek = (direction: 1 | -1) =>
    setWeekStart((current) =>
      current ? addDays(current, direction * calendar.spanDays) : current,
    );

  const leaveContact = () => {
    if (fields.validate()) go(STEP.confirm);
  };

  const submit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!date) return;
    setReceipt(
      `${reserve.done.receiptPrefix}${ymd(date).replace(/-/g, "").slice(2)}-${receiptSerial()}`,
    );
    go(STEP.done);
  };

  return {
    step,
    go,
    menus,
    chosen,
    totals,
    toggleMenu,
    stylist,
    setStylist,
    today,
    weekStart,
    canGoBack: Boolean(today && weekStart && weekStart > today),
    canGoForward: Boolean(lastWeekStart && weekStart && weekStart < lastWeekStart),
    moveWeek,
    date,
    pickDate,
    time,
    setTime,
    fields,
    leaveContact,
    receipt,
    submit,
  };
}

export type ReserveForm = ReturnType<typeof useReserveForm>;
