import { type FormEvent, useState } from "react";
import { receiptSerial } from "~/samples/shared/dates";
import { useFields } from "~/samples/shared/form/useFields";
import { useStepper } from "~/samples/shared/form/useStepper";
import { isEmail, isFilled, isPhone } from "~/samples/shared/validation";
import { openhouse } from "../content/openhouse";

export const STEP = { schedule: 1, family: 2, contact: 3, confirm: 4, done: 5 } as const;

const isKana = (value: string) => /^[ぁ-んー　 ]+$/.test(value);

const slotValue = (label: string, time: string) => `${label}${time}`;

const firstOpen = () => {
  for (const day of openhouse.schedule.days) {
    const slot = day.slots.find((s) => s.status !== "full");
    if (slot) return slotValue(day.label, slot.time);
  }
  return "";
};

const { family, contact } = openhouse;

export function useOpenhouseForm() {
  const { step, go } = useStepper();
  const [slot, setSlot] = useState(firstOpen);
  const [adults, setAdults] = useState(family.adults.initial);
  const [kids, setKids] = useState(family.kids.initial);
  const [stage, setStage] = useState(family.stages[0]);
  const [interests, setInterests] = useState<string[]>(family.initialInterests);
  const [access, setAccess] = useState(family.access[0].value);
  const fields = useFields(
    {
      name: "",
      kana: "",
      tel: "",
      email: "",
      area: "",
      source: contact.source.options[0],
      note: "",
    },
    { name: isFilled, kana: isKana, tel: isPhone, email: isEmail },
  );
  const [receipt, setReceipt] = useState("");

  const toggleInterest = (value: string) =>
    setInterests((current) =>
      current.includes(value) ? current.filter((item) => item !== value) : [...current, value],
    );

  const leaveContact = () => {
    if (fields.validate()) go(STEP.confirm);
  };

  const submit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setReceipt(`${openhouse.done.receiptPrefix}${receiptSerial()}`);
    go(STEP.done);
  };

  return {
    step,
    go,
    slot,
    setSlot,
    slotValue,
    adults,
    setAdults,
    kids,
    setKids,
    stage,
    setStage,
    interests,
    toggleInterest,
    access,
    setAccess,
    fields,
    leaveContact,
    receipt,
    submit,
  };
}

export type OpenhouseForm = ReturnType<typeof useOpenhouseForm>;
