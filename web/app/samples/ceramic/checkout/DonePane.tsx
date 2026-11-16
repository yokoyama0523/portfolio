import { Link } from "react-router";
import { checkout } from "../content/checkout";
import { store, yen } from "../content/store";
import type { Checkout } from "./useCheckout";

const text = checkout.done;

export function DonePane({ form }: { form: Checkout }) {
  return (
    <section className="pane fin">
      <h2>{text.title}</h2>
      <div className="no">
        <small>{text.number}</small>
        <span>{form.receipt}</span>
      </div>
      <p className="when">{text.summary(yen(form.placed?.totals.total ?? 0), form.method)}</p>
      <div className="box">
        <b>{text.boxTitle}</b>
        {text.boxText}
      </div>
      <p className="back">
        <Link className="btn g" to={store.paths.home}>
          {checkout.backToShop}
        </Link>
      </p>
    </section>
  );
}
