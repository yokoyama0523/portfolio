import { Summary } from "~/samples/shared/form/Summary";
import { checkout } from "../content/checkout";
import { yen } from "../content/store";
import { type Checkout, STEP } from "./useCheckout";

const text = checkout.confirm;
const { labels } = text;

export function ConfirmPane({ form }: { form: Checkout }) {
  const { values } = form.address;
  const gift = form.gift.values;
  const or = (value: string) => value || checkout.empty;
  const last4 = form.card.values.cno.replace(/\s/g, "").slice(-4);
  const rows = [
    {
      label: labels.items,
      value: form.cart.lines.map((line) => `${line.name}${text.times}${line.count}`).join("\n"),
      step: STEP.delivery,
    },
    {
      label: labels.address,
      value: `${text.zipMark}${or(values.zip)}　${or(values.pref)} ${or(values.addr)}\n${or(values.name)}　${or(values.tel)}　／　${or(values.when)}`,
      step: STEP.delivery,
    },
    {
      label: labels.wrap,
      value: `${form.wrapping}${form.isGift ? text.giftLine(or(gift.noshi), or(gift.naire), or(gift.message)) : ""}`,
      step: STEP.extras,
    },
    {
      label: labels.payment,
      value: `${form.method}${form.paysByCard ? text.cardEnding(last4) : ""}`,
      step: STEP.extras,
    },
    {
      label: labels.total,
      value: `${yen(form.totals.total)}${text.totalNote}`,
      step: STEP.delivery,
    },
  ];
  return (
    <section className="pane">
      <fieldset>
        <legend>{text.legend}</legend>
        <Summary rows={rows} editLabel={text.edit} onEdit={form.go} />
        <p className="hint confirm-hint">{text.hint}</p>
      </fieldset>
      <div className="nav">
        <button type="button" className="btn g" onClick={() => form.go(STEP.extras)}>
          {checkout.back}
        </button>
        <button type="submit" className="btn">
          {text.submit}
        </button>
      </div>
    </section>
  );
}
