import { useState } from "react";
import { Link } from "react-router";
import { checkoutPage as text } from "../content/checkout";
import { paths } from "../content/paths";
import { longDate } from "../store/dates";
import { yen } from "../store/pricing";
import { useShop } from "../store/ShopContext";
import type { Order } from "../store/types";
import type { Checkout } from "./useCheckout";

function GuestRegister({ order, form }: { order: Order; form: Checkout }) {
  const { auth } = useShop();
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [done, setDone] = useState(false);
  const copy = text.done.register;

  const register = () => {
    if (password.length < copy.minLength) {
      setMessage(copy.short);
      return;
    }
    const address = form.currentAddress();
    if (!auth.register(order.email, password, address.name, address.kana)) {
      setMessage(copy.taken);
      return;
    }
    auth.save(order.email, { tel: address.tel, addresses: [{ ...address, main: true }] });
    setMessage(copy.done);
    setDone(true);
  };

  return (
    <div className="box">
      <b className="medium">{copy.title}</b>
      <div className="f register">
        <div className="w">
          <label className="t" htmlFor="rpw">
            {copy.password}
          </label>
          <input
            type="password"
            id="rpw"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
          />
        </div>
      </div>
      <button type="button" className="btn sm register-button" disabled={done} onClick={register}>
        {copy.button}
      </button>
      <div className="note register-message" role="status">
        {message}
      </div>
    </div>
  );
}

export function DonePane({ order, form }: { order: Order; form: Checkout }) {
  const [placedAsGuest] = useState(!form.user);
  const fastest = form.fastest;
  const when =
    order.delivery.date === text.delivery.none
      ? fastest
        ? text.delivery.fastestNote(fastest.getMonth() + 1, fastest.getDate())
        : ""
      : longDate(order.delivery.date);
  return (
    <section className="fin">
      <h1>{text.done.title}</h1>
      <div className="no">
        <small>{text.done.number}</small>
        <span>{order.no}</span>
      </div>
      <p className="note">{text.done.mail(order.email)}</p>
      <div className="box">
        <b className="medium">{text.done.when}</b>
        <br />
        {when}　{order.delivery.time}
        <b className="box-head">{text.done.payment}</b>
        {text.done.payMessages[order.pay](yen(order.total))}
        <b className="box-head">{text.done.shipped}</b>
        {text.done.shippedText}
      </div>
      {placedAsGuest && <GuestRegister order={order} form={form} />}
      <p className="fin-links">
        <Link className="btn g" to={paths.account("orders")}>
          {text.done.history}
        </Link>
        <Link className="btn" to={paths.home}>
          {text.done.top}
        </Link>
      </p>
    </section>
  );
}
