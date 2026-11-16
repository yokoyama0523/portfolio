import { Link } from "react-router";
import { checkout } from "../content/checkout";
import { store, yen } from "../content/store";
import type { Checkout } from "./useCheckout";

export function DonePane({ form }: { form: Checkout }) {
  const mode = form.subscribing ? checkout.subscription : checkout.order;
  const total = form.placed?.totals.total ?? 0;
  return (
    <section className="pane fin">
      <h2>{checkout.done.title}</h2>
      <div className="no">
        <small>{checkout.done.number}</small>
        <span>{form.receipt}</span>
      </div>
      <p className="when">{checkout.done.summary(yen(total), form.method)}</p>
      <div className="box">
        <b>{mode.doneTitle}</b>
        {mode.doneText}
      </div>
      <p className="back">
        <Link className="btn g" to={store.paths.home}>
          {checkout.backToShop}
        </Link>
      </p>
    </section>
  );
}
