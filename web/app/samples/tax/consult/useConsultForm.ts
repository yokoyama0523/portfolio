import { type FormEvent, useEffect, useRef, useState } from "react";
import { addDays, mondayOf, startOfToday } from "~/samples/shared/dates";
import { consult } from "../content/consult";
import { calendar, type RequiredField, receiptNumber, validators } from "./booking";

const fieldInitial = (id: string) =>
  consult.company.fields.find((field) => field.id === id)?.initial ?? "";

const initialValues = {
  topic: consult.topic.options[0].value,
  sales: fieldInitial("sales"),
  biz: fieldInitial("biz"),
  staff: fieldInitial("staff"),
  how: consult.schedule.how[0].value,
  company: "",
  name: "",
  tel: "",
  email: "",
  note: "",
};

export type Values = typeof initialValues;
export type Field = keyof Values;

export const STEP = { topic: 1, schedule: 2, contact: 3, confirm: 4, done: 5 } as const;

const requiredFields = Object.keys(validators) as RequiredField[];
const isRequired = (field: Field): field is RequiredField =>
  (requiredFields as string[]).includes(field);

export function useConsultForm() {
  const [step, setStep] = useState<number>(STEP.topic);
  const [values, setValues] = useState(initialValues);
  const [today, setToday] = useState<Date | null>(null);
  const [weekStart, setWeekStart] = useState<Date | null>(null);
  const [date, setDate] = useState<Date | null>(null);
  const [time, setTime] = useState<string | null>(null);
  const [invalid, setInvalid] = useState<RequiredField[]>([]);
  const [receipt, setReceipt] = useState("");
  const fieldRefs = useRef<Partial<Record<RequiredField, HTMLInputElement | null>>>({});

  useEffect(() => {
    const now = startOfToday();
    setToday(now);
    setWeekStart(mondayOf(now));
  }, []);

  const go = (next: number) => {
    setStep(next);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const update = (field: Field, value: string) => {
    setValues((current) => ({ ...current, [field]: value }));
    if (!isRequired(field)) return;
    const bad = value !== "" && !validators[field](value);
    setInvalid((current) =>
      bad ? [...new Set([...current, field])] : current.filter((f) => f !== field),
    );
  };

  const checkContact = () => {
    const bad = requiredFields.filter((field) => !validators[field](values[field]));
    setInvalid(bad);
    if (bad.length) fieldRefs.current[bad[0]]?.focus();
    return bad.length === 0;
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

  const submit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!date) return;
    setReceipt(receiptNumber(date));
    go(STEP.done);
  };

  return {
    step,
    go,
    values,
    update,
    invalid,
    fieldRefs,
    checkContact,
    today,
    weekStart,
    canGoBack: Boolean(today && weekStart && weekStart > today),
    canGoForward: Boolean(lastWeekStart && weekStart && weekStart < lastWeekStart),
    moveWeek,
    date,
    pickDate,
    time,
    setTime,
    receipt,
    submit,
  };
}

export type ConsultForm = ReturnType<typeof useConsultForm>;
