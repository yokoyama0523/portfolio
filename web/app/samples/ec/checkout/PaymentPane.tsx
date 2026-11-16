import { Choice } from "~/samples/shared/form/Choice";
import { TextField } from "~/samples/shared/form/TextField";
import { checkoutPage as text } from "../content/checkout";
import type { Payment } from "../store/types";
import { type Checkout, STEP } from "./useCheckout";

export function PaymentPane({ form }: { form: Checkout }) {
  const { card } = form;
  const field = (id: "cno" | "cname" | "cexp" | "ccvc", className?: string) => (
    <TextField
      id={id}
      {...text.payment[id]}
      className={className}
      required={text.required}
      invalid={card.isInvalid(id)}
      inputRef={card.register(id)}
      value={card.values[id]}
      onChange={(value) => card.update(id, value)}
    />
  );
  return (
    <section className="pane">
      <fieldset>
        <legend>{text.payment.legend}</legend>
        <div className="opts">
          {text.payment.methods.map((method) => (
            <Choice
              key={method.value}
              type="radio"
              name="pay"
              value={method.value}
              checked={form.pay === method.value}
              onChange={() => form.setPay(method.value as Payment)}
            >
              <b>{method.title}</b>
              <small>{method.note}</small>
            </Choice>
          ))}
        </div>
      </fieldset>
      {form.pay === "card" && (
        <fieldset>
          <legend>{text.payment.cardLegend}</legend>
          <div className="card-f">
            {field("cno", "w")}
            {field("cname")}
            {field("cexp")}
            {field("ccvc")}
          </div>
          <p className="note card-note">{text.payment.cardNote}</p>
        </fieldset>
      )}
      <div className="nav">
        <button type="button" className="btn g" onClick={() => form.go(STEP.delivery)}>
          {text.back}
        </button>
        <button type="button" className="btn" onClick={form.next}>
          {text.payment.next}
        </button>
      </div>
    </section>
  );
}
