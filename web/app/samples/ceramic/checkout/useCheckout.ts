import { type FormEvent, useState } from "react";
import { useFields } from "~/samples/shared/form/useFields";
import { useStepper } from "~/samples/shared/form/useStepper";
import {
  isCardNumber,
  isCvc,
  isEmail,
  isExpiry,
  isFilled,
  isPhone,
  isZip,
} from "~/samples/shared/validation";
import { useCart } from "../cart/CartContext";
import { checkout } from "../content/checkout";
import { store } from "../content/store";

export const STEP = { delivery: 1, extras: 2, confirm: 3, done: 4 } as const;

const { delivery, wrap, payment } = checkout;
const SERIAL_MIN = 1000;
const SERIAL_SPAN = 9000;

type Totals = { subtotal: number; shipping: number; box: number; fee: number; total: number };

export function useCheckout() {
  const { step, go } = useStepper();
  const cart = useCart();
  const [wrapping, setWrapping] = useState(wrap.paper.value);
  const [method, setMethod] = useState(payment.methods[0].value);
  const [placed, setPlaced] = useState<null | { lines: typeof cart.lines; totals: Totals }>(null);
  const [receipt, setReceipt] = useState("");
  const address = useFields(
    { name: "", tel: "", zip: "", pref: "", addr: "", email: "", when: delivery.when.options[0] },
    { name: isFilled, tel: isPhone, zip: isZip, pref: isFilled, addr: isFilled, email: isEmail },
  );
  const gift = useFields({ noshi: wrap.noshi.options[0], naire: "", message: "" }, {});
  const card = useFields(
    { cno: "", exp: "", cvc: "" },
    { cno: isCardNumber, exp: isExpiry, cvc: isCvc },
  );

  const isGift = wrapping === wrap.box.value;
  const paysByCard = method === payment.card;
  const fee = payment.methods.find((item) => item.value === method)?.fee ?? 0;
  const box = isGift ? store.giftBox : 0;
  const totals = { ...cart.totals, box, fee, total: cart.totals.total + box + fee };

  const leaveDelivery = () => {
    if (address.validate()) go(STEP.extras);
  };

  const leaveExtras = () => {
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
    wrapping,
    setWrapping,
    isGift,
    method,
    setMethod,
    paysByCard,
    address,
    gift,
    card,
    totals,
    leaveDelivery,
    leaveExtras,
    placed,
    receipt,
    submit,
  };
}

export type Checkout = ReturnType<typeof useCheckout>;
