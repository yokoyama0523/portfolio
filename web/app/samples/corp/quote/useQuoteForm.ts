import { type FormEvent, useEffect, useRef, useState } from "react";
import { useSearchParams } from "react-router";
import {
  addDays,
  isWeekend,
  jpDate,
  receiptSerial,
  shortDateWithDay,
  startOfToday,
} from "~/samples/shared/dates";
import { isEmail, isFilled, isPhone } from "~/samples/shared/validation";
import { type Mode, quote } from "../content/quote";

export const STEP = { content: 1, contact: 2, confirm: 3, done: 4 } as const;

const validators = { company: isFilled, name: isFilled, tel: isPhone, email: isEmail };
export type RequiredField = keyof typeof validators;
const requiredFields = Object.keys(validators) as RequiredField[];

export type Drawing = { id: number; name: string; size: number };
export type Part = { id: number; name: string; material: string; quantity: string; finish: string };
export type VisitSlot = { label: string; title: string; full: boolean };

const initialContact = {
  company: "",
  dept: "",
  name: "",
  tel: "",
  email: "",
  industry: quote.contact.industry.options[0],
};
export type ContactField = keyof typeof initialContact;

const newPart = (id: number): Part => ({
  id,
  name: "",
  material: quote.parts.materials[0],
  quantity: "",
  finish: quote.parts.finishes[0],
});

const visitSlots = (today: Date) => {
  const slots: VisitSlot[] = [];
  let day = addDays(today, 1);
  while (slots.length < quote.visit.slotCount) {
    if (!isWeekend(day)) {
      slots.push({
        label: `${jpDate(day)}${quote.visit.time}`,
        title: `${shortDateWithDay(day)}${quote.visit.time}`,
        full: (day.getDate() * 3 + slots.length) % 4 === 0,
      });
    }
    day = addDays(day, 1);
  }
  return slots;
};

const isRequired = (field: ContactField): field is RequiredField =>
  (requiredFields as string[]).includes(field);

export function useQuoteForm() {
  const [params, setParams] = useSearchParams();
  const [mode, setModeState] = useState<Mode>("quote");
  const [step, setStep] = useState<number>(STEP.content);
  const [drawings, setDrawings] = useState<Drawing[]>([]);
  const nextId = useRef(1);
  const [parts, setParts] = useState<Part[]>([newPart(0)]);
  const [due, setDue] = useState(quote.due.initial);
  const [note, setNote] = useState("");
  const [slots, setSlots] = useState<VisitSlot[]>([]);
  const [slot, setSlot] = useState("");
  const [interests, setInterests] = useState<string[]>(quote.visit.initialInterests);
  const [people, setPeople] = useState(quote.visit.initialPeople);
  const [contact, setContact] = useState(initialContact);
  const [invalid, setInvalid] = useState<RequiredField[]>([]);
  const [receipt, setReceipt] = useState("");
  const fieldRefs = useRef<Partial<Record<RequiredField, HTMLInputElement | null>>>({});

  useEffect(() => {
    setModeState(params.get("mode") === "visit" ? "visit" : "quote");
  }, [params]);

  useEffect(() => {
    const list = visitSlots(startOfToday());
    setSlots(list);
    setSlot(list.find((s) => !s.full)?.label ?? "");
  }, []);

  const setMode = (next: Mode) =>
    setParams(next === "visit" ? { mode: next } : {}, { replace: true, preventScrollReset: true });

  const go = (next: number) => {
    setStep(next);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const takeId = () => {
    nextId.current += 1;
    return nextId.current;
  };

  const addDrawings = (list: FileList | null) => {
    if (!list) return;
    const accepted: Drawing[] = [];
    for (const file of Array.from(list)) {
      if (file.size > quote.drawings.maxBytes) {
        window.alert(quote.drawings.tooLarge(file.name));
        continue;
      }
      accepted.push({ id: takeId(), name: file.name, size: file.size });
    }
    setDrawings((current) => [...current, ...accepted]);
  };

  const removeDrawing = (id: number) =>
    setDrawings((current) => current.filter((drawing) => drawing.id !== id));

  const addPart = () => setParts((current) => [...current, newPart(takeId())]);
  const removePart = (id: number) =>
    setParts((current) =>
      current.length > 1 ? current.filter((part) => part.id !== id) : current,
    );
  const updatePart = (id: number, field: keyof Omit<Part, "id">, value: string) =>
    setParts((current) =>
      current.map((part) => (part.id === id ? { ...part, [field]: value } : part)),
    );

  const toggleInterest = (value: string) =>
    setInterests((current) =>
      current.includes(value) ? current.filter((item) => item !== value) : [...current, value],
    );

  const updateContact = (field: ContactField, value: string) => {
    setContact((current) => ({ ...current, [field]: value }));
    if (!isRequired(field)) return;
    const bad = value !== "" && !validators[field](value);
    setInvalid((current) =>
      bad ? [...new Set([...current, field])] : current.filter((f) => f !== field),
    );
  };

  const leaveContent = () => {
    if (mode === "quote" && drawings.length === 0 && !window.confirm(quote.drawings.missing))
      return;
    go(STEP.contact);
  };

  const leaveContact = () => {
    const bad = requiredFields.filter((field) => !validators[field](contact[field]));
    setInvalid(bad);
    if (bad.length) {
      fieldRefs.current[bad[0]]?.focus();
      return;
    }
    go(STEP.confirm);
  };

  const submit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const stamp = new Date().toISOString().slice(2, 10).replace(/-/g, "");
    setReceipt(`${quote.modes[mode].receiptPrefix}${stamp}-${receiptSerial()}`);
    go(STEP.done);
  };

  return {
    mode,
    setMode,
    step,
    go,
    drawings,
    addDrawings,
    removeDrawing,
    parts,
    addPart,
    removePart,
    updatePart,
    due,
    setDue,
    note,
    setNote,
    slots,
    slot,
    setSlot,
    interests,
    toggleInterest,
    people,
    setPeople,
    contact,
    updateContact,
    invalid,
    fieldRefs,
    leaveContent,
    leaveContact,
    receipt,
    submit,
  };
}

export type QuoteForm = ReturnType<typeof useQuoteForm>;
