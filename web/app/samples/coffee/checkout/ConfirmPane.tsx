import { Summary } from "~/samples/shared/form/Summary";
import { checkout } from "../content/checkout";
import { yen } from "../content/store";
import { type Checkout, STEP } from "./useCheckout";

const text = checkout.confirm;
const { labels } = text;

export function ConfirmPane({ form }: { form: Checkout }) {
  const { values } = form.address;
  const or = (value: string) => value || checkout.empty;
  const items = [
    ...(form.plan ? [`${form.plan.name}${checkout.subscription.summarySuffix}`] : []),
    ...form.cart.lines.map((line) => `${line.name}${text.times}${line.count}`),
  ].join("\n");
  const last4 = form.card.values.cno.replace(/\s/g, "").slice(-4);
  const rows = [
    { label: labels.items, value: items, step: STEP.delivery },
    {
      label: labels.address,
      value: `${text.zipMark}${or(values.zip)}　${or(values.pref)} ${or(values.addr)}\n${or(values.name)}　${or(values.tel)}`,
      step: STEP.delivery,
    },
    {
      label: labels.delivery,
      value: `${or(values.when)}　／　${or(values.grind)}`,
      step: STEP.delivery,
    },
    {
      label: labels.payment,
      value: `${form.method}${form.paysByCard ? text.cardEnding(last4) : ""}`,
      step: STEP.payment,
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
      </fieldset>
      <div className="nav">
        <button type="button" className="btn g" onClick={() => form.go(STEP.payment)}>
          {checkout.back}
        </button>
        <button type="submit" className="btn">
          {form.subscribing ? checkout.subscription.submit : checkout.order.submit}
        </button>
      </div>
    </section>
  );
}
