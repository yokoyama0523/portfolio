import { Link } from "react-router";
import { checkout } from "../content/checkout";
import { store, yen } from "../content/store";
import type { Checkout } from "./useCheckout";

const text = checkout.side;

export function Side({ form }: { form: Checkout }) {
  const lines = form.placed?.lines ?? form.cart.lines;
  const totals = form.placed?.totals ?? form.totals;
  const editable = !form.placed;
  return (
    <aside className="side">
      <h2>{text.title}</h2>
      <div>
        {form.plan && (
          <div className="it">
            <div>
              <b>{form.plan.name}</b>
              <small>{checkout.subscription.sideNote}</small>
            </div>
            <div>{yen(form.plan.price)}</div>
          </div>
        )}
        {lines.map((line) => (
          <div key={line.id} className="it">
            <div>
              <b>{line.name}</b>
              <small>
                {line.jp}　{store.bagSize}
              </small>
              {editable && (
                <div className="q">
                  <button type="button" onClick={() => form.cart.change(line.id, -1)}>
                    −
                  </button>
                  <span>{line.count}</span>
                  <button type="button" onClick={() => form.cart.change(line.id, 1)}>
                    ＋
                  </button>
                </div>
              )}
            </div>
            <div>{yen(line.price * line.count)}</div>
          </div>
        ))}
        {!form.subscribing && lines.length === 0 && (
          <div className="empty">
            {text.empty}
            <Link className="pick" to={store.paths.beans}>
              {text.pick}
            </Link>
          </div>
        )}
        <div className="tt">
          <div>
            <span>{text.subtotal}</span>
            <span>{yen(totals.subtotal)}</span>
          </div>
          <div>
            <span>{text.shipping}</span>
            <span>{totals.shipping ? yen(totals.shipping) : text.free}</span>
          </div>
          {totals.fee > 0 && (
            <div>
              <span>{text.fee}</span>
              <span>{yen(totals.fee)}</span>
            </div>
          )}
          <div className="g">
            <span>{text.total}</span>
            <span>{yen(totals.total)}</span>
          </div>
        </div>
      </div>
    </aside>
  );
}
