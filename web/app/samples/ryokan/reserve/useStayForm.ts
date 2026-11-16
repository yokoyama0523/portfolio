import { type FormEvent, useEffect, useState } from "react";
import { useSearchParams } from "react-router";
import { addDays, receiptSerial, startOfToday, ymd } from "~/samples/shared/dates";
import { useFields } from "~/samples/shared/form/useFields";
import { useStepper } from "~/samples/shared/form/useStepper";
import { isEmail, isFilled, isKana, isPhone } from "~/samples/shared/validation";
import { reserve } from "../content/reserve";
import { rooms } from "../content/rooms";
import { roomOpen } from "./availability";

export const STEP = { stay: 1, room: 2, guest: 3, confirm: 4, done: 5 } as const;

const { stay, guest, pricing } = reserve;

export function useStayForm() {
  const { step, go } = useStepper();
  const [params] = useSearchParams();
  const [minDate, setMinDate] = useState("");
  const [date, setDate] = useState("");
  const [dateInvalid, setDateInvalid] = useState(false);
  const [nights, setNights] = useState(stay.nights.options[0]);
  const [adults, setAdults] = useState(stay.adults.initial);
  const [kids, setKids] = useState(stay.kids.initial);
  const [roomId, setRoomId] = useState<string | null>(null);
  const [dinner, setDinner] = useState(reserve.room.dinners[0]);
  const [pickup, setPickup] = useState(reserve.room.pickups[0]);
  const [receipt, setReceipt] = useState("");
  const fields = useFields(
    {
      name: "",
      kana: "",
      tel: "",
      email: "",
      pref: guest.pref.options[0],
      arrive: guest.arrive.options[0],
      note: "",
    },
    { name: isFilled, kana: isKana, tel: isPhone, email: isEmail },
  );

  useEffect(() => {
    const today = startOfToday();
    setMinDate(ymd(today));
    setDate(params.get("date") || ymd(addDays(today, stay.defaultLeadDays)));
    const askedNights = params.get("nights");
    if (askedNights && stay.nights.options.includes(askedNights)) setNights(askedNights);
    const askedAdults = params.get("adults");
    if (askedAdults && stay.adults.options.includes(askedAdults)) setAdults(askedAdults);
  }, [params]);

  const people = Number(adults) + Number(kids);
  const choices = rooms.map((room) => {
    const fits = people <= room.capacity;
    const open = date !== "" && roomOpen(room, date);
    return {
      room,
      available: fits && open,
      reason: fits ? reserve.room.full : reserve.room.overCapacity,
    };
  });
  const room = rooms.find((item) => item.id === roomId) ?? null;

  const bill = room && {
    adults: room.price * Number(adults) * Number(nights),
    kids: Math.round(room.price * pricing.kidRate) * Number(kids) * Number(nights),
    tax: pricing.bathTax * people * Number(nights),
  };
  const total = bill ? bill.adults + bill.kids + bill.tax : 0;

  const changeDate = (value: string) => {
    setDate(value);
    setDateInvalid(false);
  };

  const leaveStay = () => {
    if (!date) {
      setDateInvalid(true);
      return;
    }
    setRoomId(choices.find((choice) => choice.available)?.room.id ?? null);
    go(STEP.room);
  };

  const leaveGuest = () => {
    if (fields.validate()) go(STEP.confirm);
  };

  const submit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setReceipt(
      `${reserve.done.receiptPrefix}${date.replace(/-/g, "").slice(2)}-${receiptSerial()}`,
    );
    go(STEP.done);
  };

  return {
    step,
    go,
    minDate,
    date,
    changeDate,
    dateInvalid,
    nights,
    setNights,
    adults,
    setAdults,
    kids,
    setKids,
    choices,
    room,
    setRoomId,
    dinner,
    setDinner,
    pickup,
    setPickup,
    people,
    bill,
    total,
    fields,
    leaveStay,
    leaveGuest,
    receipt,
    submit,
  };
}

export type StayForm = ReturnType<typeof useStayForm>;
