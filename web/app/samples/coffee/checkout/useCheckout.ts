import { type FormEvent, useEffect, useState } from "react";
import { useSearchParams } from "react-router";
import { useFields } from "~/samples/shared/form/useFields";
import { useStepper } from "~/samples/shared/form/useStepper";
import { isEmail, isFilled, isPhone } from "~/samples/shared/validation";
import { useCart } from "../cart/CartContext";
import { checkout } from "../content/checkout";
import { plans } from "../content/plans";

export const STEP = { delivery: 1, payment: 2, confirm: 3, done: 4 } as const;

const { delivery, payment } = checkout;
const SERIAL_MIN = 1000;
const SERIAL_SPAN = 9000;

const isZip = (value: string) => /^[0-9０-９]{3}-?[0-9０-９]{4}$/.test(value);
const isCardNumber = (value: string) => /^[0-9 ]{13,19}$/.test(value);
const isExpiry = (value: string) => /^[0-9]{2} ?\/ ?[0-9]{2}$/.test(value);
const isCvc = (value: string) => /^[0-9]{3,4}$/.test(value);

export function useCheckout() {
  const { step, go } = useStepper();
  const cart = useCart();
  const [params] = useSearchParams();
  const [subscribing, setSubscribing] = useState(false);
  const [planName, setPlanName] = useState(checkout.subscription.initial);
  const [method, setMethod] = useState(payment.methods[0].value);
  const [placed, setPlaced] = useState<null | { lines: typeof cart.lines; totals: Totals }>(null);
  const [receipt, setReceipt] = useState("");
  const address = useFields(
    {
      name: "",
      tel: "",
      zip: "",
      pref: "",
      addr: "",
      email: "",
      when: delivery.when.options[0],
      grind: delivery.grind.options[0],
    },
    { name: isFilled, tel: isPhone, zip: isZip, pref: isFilled, addr: isFilled, email: isEmail },
  );
  const card = useFields(
    { cno: "", exp: "", cvc: "" },
    { cno: isCardNumber, exp: isExpiry, cvc: isCvc },
  );

  useEffect(() => {
    setSubscribing(params.get("sub") === "1");
  }, [params]);

  const plan = subscribing ? (plans.find((item) => item.name === planName) ?? null) : null;
  const fee = payment.methods.find((item) => item.value === method)?.fee ?? 0;
  const subtotal = cart.totals.subtotal + (plan?.price ?? 0);
  const shipping = subscribing && cart.lines.length === 0 ? 0 : cart.totals.shipping;
  const totals = { subtotal, shipping, fee, total: subtotal + shipping + fee };
  const paysByCard = method === payment.card;

  const leaveDelivery = () => {
    if (address.validate()) go(STEP.payment);
  };

  const leavePayment = () => {
    if (!paysByCard || card.validate()) go(STEP.confirm);
  };

  const submit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const stamp = new Date().toISOString().slice(2, 10).replace(/-/g, "");
    const serial = String(Math.floor(Math.random() * SERIAL_SPAN) + SERIAL_MIN);
    setReceipt(`${checkout.done.receiptPrefix}${stamp}-${serial}`);
    setPlaced({ lines: cart.lines, totals });
    cart.clear();
    go(STEP.done);
  };

  return {
    step,
    go,
    cart,
    subscribing,
    plan,
    setPlanName,
    method,
    setMethod,
    paysByCard,
    address,
    card,
    totals,
    canLeaveDelivery: subscribing || cart.lines.length > 0,
    leaveDelivery,
    leavePayment,
    placed,
    receipt,
    submit,
  };
}

type Totals = { subtotal: number; shipping: number; fee: number; total: number };

export type Checkout = ReturnType<typeof useCheckout>;
