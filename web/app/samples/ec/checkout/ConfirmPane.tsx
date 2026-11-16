import { Link } from "react-router";
import { checkoutPage as text } from "../content/checkout";
import { paths } from "../content/paths";
import { longDate } from "../store/dates";
import { yen } from "../store/pricing";
import { type Checkout, STEP } from "./useCheckout";

export function ConfirmPane({ form }: { form: Checkout }) {
  const a = form.currentAddress();
  const last4 = form.card.values.cno.replace(/\D/g, "").slice(-4);
  const payName =
    form.pay === "card" ? text.confirm.payNames.card(last4) : text.confirm.payNames[form.pay];
  const date = form.dateMode === "pick" ? longDate(form.pickedDate) : text.delivery.fastest;
  const rows = [
    {
      label: text.confirm.address,
      step: STEP.address,
      body: (
        <>
          {a.name}
          <br />〒{a.zip} {a.pref}
          {a.addr1} {a.addr2}
          <br />
          {a.tel}　{form.email}
        </>
      ),
    },
    {
      label: text.confirm.delivery,
      step: STEP.delivery,
      body: (
        <>
          {date}　{form.time}
          {form.gift && (
            <>
              <br />
              {text.confirm.giftLine}
            </>
          )}
        </>
      ),
    },
    { label: text.confirm.payment, step: STEP.payment, body: payName },
  ];
  return (
    <section className="pane">
      <fieldset>
        <legend>{text.confirm.legend}</legend>
        {rows.map((row) => (
          <div key={row.label} className="cf">
            <b>{row.label}</b>
            <span>{row.body}</span>
            <button type="button" className="ed" onClick={() => form.go(row.step)}>
              {text.confirm.edit}
            </button>
          </div>
        ))}
        <div className="cf">
          <b>{text.confirm.total}</b>
          <span className="total">
            {yen(form.totals.total)}
            <span className="note">{text.confirm.totalNote(form.totals.ship === 0)}</span>
          </span>
          <span />
        </div>
      </fieldset>
      <label className="agree">
        <input
          type="checkbox"
          checked={form.agree}
          onChange={(event) => form.setAgree(event.target.checked)}
        />
        <span>
          <Link className="underline" to={paths.guide("return")}>
            {text.confirm.agree.link}
          </Link>
          {text.confirm.agree.after}
        </span>
      </label>
      <div className="nav">
        <button type="button" className="btn g" onClick={() => form.go(STEP.payment)}>
          {text.back}
        </button>
        <button type="submit" className="btn" disabled={!form.agree}>
          {text.confirm.place}
        </button>
      </div>
    </section>
  );
}
