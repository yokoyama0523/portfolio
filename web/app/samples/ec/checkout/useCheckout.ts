import { type FormEvent, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router";
import { addDays, ymd } from "~/samples/shared/dates";
import { useFields } from "~/samples/shared/form/useFields";
import { useStepper } from "~/samples/shared/form/useStepper";
import { isCvc, isEmail, isFilled, isPhone, isZip } from "~/samples/shared/validation";
import { checkoutPage as text } from "../content/checkout";
import { paths } from "../content/paths";
import { priceOf, productById } from "../store/pricing";
import { useShop } from "../store/ShopContext";
import type { Address, Order, Payment } from "../store/types";

export const STEP = { address: 1, delivery: 2, payment: 3, confirm: 4, done: 5 } as const;

const isCardDigits = (value: string) => /^\d{14,16}$/.test(value.replace(/[\s-]/g, ""));
const isHolder = (value: string) => value.trim().length > 1;
const isMonthYear = (value: string) => /^(0[1-9]|1[0-2])\/\d{2}$/.test(value.trim());

const fastestDate = (now: Date) => {
  const { beforeCutoff, afterCutoff } = text.delivery.leadDays;
  return addDays(now, now.getHours() < text.delivery.cutoffHour ? beforeCutoff : afterCutoff);
};

export function useCheckout() {
  const shop = useShop();
  const navigate = useNavigate();
  const { step, go } = useStepper();
  const user = shop.auth.user;
  const [savedChoice, setSavedChoice] = useState<string>("new");
  const [saveAddress, setSaveAddress] = useState(true);
  const [dateMode, setDateMode] = useState<"none" | "pick">("none");
  const [pickedDate, setPickedDate] = useState("");
  const [time, setTime] = useState(text.delivery.times[0]);
  const [gift, setGift] = useState(false);
  const [pay, setPay] = useState<Payment>("card");
  const [agree, setAgree] = useState(false);
  const [fastest, setFastest] = useState<Date | null>(null);
  const [placed, setPlaced] = useState<Order | null>(null);
  const address = useFields(
    { name: "", kana: "", zip: "", pref: "", addr1: "", addr2: "", tel: "", email: "" },
    {
      name: isFilled,
      kana: isFilled,
      zip: isZip,
      pref: isFilled,
      addr1: isFilled,
      tel: isPhone,
      email: isEmail,
    },
  );
  const card = useFields(
    { cno: "", cname: "", cexp: "", ccvc: "" },
    { cno: isCardDigits, cname: isHolder, cexp: isMonthYear, ccvc: isCvc },
  );

  useEffect(() => {
    const date = fastestDate(new Date());
    setFastest(date);
    setPickedDate(ymd(addDays(date, 1)));
  }, []);

  useEffect(() => {
    if (shop.loaded && !placed && shop.cart.lines.length === 0)
      navigate(paths.cart, { replace: true });
  }, [shop.loaded, placed, shop.cart.lines.length, navigate]);

  const prefilledFor = useRef<string | null>(null);
  useEffect(() => {
    if (!user || prefilledFor.current === user.email) return;
    prefilledFor.current = user.email;
    for (const [field, value] of [
      ["email", user.email],
      ["name", user.name],
      ["kana", user.kana],
      ["tel", user.tel],
    ] as const) {
      if (value) address.update(field, value);
    }
    const main = user.addresses.findIndex((item) => item.main);
    if (user.addresses.length) setSavedChoice(String(main >= 0 ? main : 0));
  }, [user, address.update]);

  const savedAddress =
    savedChoice === "new" || !user ? null : (user.addresses[Number(savedChoice)] ?? null);
  const options = { pay, gift };
  const totals = shop.cart.totals(options);
  const email = user ? user.email : address.values.email.trim();

  const currentAddress = (): Address => {
    if (savedAddress) return { ...savedAddress };
    const v = address.values;
    return {
      name: v.name.trim(),
      kana: v.kana.trim(),
      zip: v.zip.trim(),
      pref: v.pref,
      addr1: v.addr1.trim(),
      addr2: v.addr2.trim(),
      tel: v.tel.trim(),
    };
  };

  const next = () => {
    if (step === STEP.address && !savedAddress && !address.validate()) return;
    if (step === STEP.payment && pay === "card" && !card.validate()) return;
    go(step + 1);
  };

  const submit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!agree) return;
    const chosen = currentAddress();
    const { kana: _kana, main: _main, ...addr } = chosen;
    const order = shop.orders.place({
      email,
      name: chosen.name,
      items: shop.cart.lines.map((line) => ({ ...line, price: priceOf(productById[line.id]) })),
      sub: totals.sub,
      discount: totals.discount,
      coupon: totals.code,
      ship: totals.ship,
      cod: totals.cod,
      gift: totals.gift,
      total: totals.total,
      pay,
      addr,
      delivery: { date: dateMode === "pick" ? pickedDate : text.delivery.none, time },
      tracking: "",
    });
    if (user && !savedAddress && saveAddress) {
      const addresses = [...user.addresses, { ...chosen, main: user.addresses.length === 0 }];
      shop.auth.save(user.email, { addresses, kana: chosen.kana, tel: chosen.tel });
    }
    setPlaced(order);
    shop.cart.clear();
    go(STEP.done);
  };

  return {
    step,
    go,
    next,
    user,
    savedChoice,
    setSavedChoice,
    savedAddress,
    saveAddress,
    setSaveAddress,
    address,
    dateMode,
    setDateMode,
    pickedDate,
    setPickedDate,
    time,
    setTime,
    gift,
    setGift,
    pay,
    setPay,
    card,
    agree,
    setAgree,
    fastest,
    totals,
    email,
    currentAddress,
    placed,
    submit,
  };
}

export type Checkout = ReturnType<typeof useCheckout>;
