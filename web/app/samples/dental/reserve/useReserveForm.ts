import { type FormEvent, useEffect, useState } from "react";
import { addDays, receiptSerial, startOfToday, ymd } from "~/samples/shared/dates";
import { useFields } from "~/samples/shared/form/useFields";
import { useStepper } from "~/samples/shared/form/useStepper";
import { isEmail, isFilled, isKana, isPhone } from "~/samples/shared/validation";
import { reserve } from "../content/reserve";
import { calendar, sundayOf } from "./calendar";

export const STEP = { menu: 1, date: 2, contact: 3, confirm: 4, done: 5 } as const;

const isBirthday = (value: string) =>
  /^[0-9]{4}[/／\-年][0-9]{1,2}[/／\-月][0-9]{1,2}日?$/.test(value);
const isOptionalEmail = (value: string) => value === "" || isEmail(value);

export function useReserveForm() {
  const { step, go } = useStepper();
  const [kind, setKind] = useState(reserve.kind.options[0].value);
  const [menu, setMenu] = useState(reserve.menu.options[0].value);
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
      birth: "",
      who: reserve.contact.who.options[0],
      note: "",
    },
    { name: isFilled, kana: isKana, tel: isPhone, email: isOptionalEmail, birth: isBirthday },
  );

  useEffect(() => {
    const now = startOfToday();
    setToday(now);
    setWeekStart(sundayOf(now));
  }, []);

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
    kind,
    setKind,
    menu,
    setMenu,
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
