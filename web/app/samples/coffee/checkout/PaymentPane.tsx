import { TextField } from "~/samples/shared/form/TextField";
import { checkout } from "../content/checkout";
import { type Checkout, STEP } from "./useCheckout";

const text = checkout.payment;

export function PaymentPane({ form }: { form: Checkout }) {
  const { card } = form;
  const field = (id: "cno" | "exp" | "cvc", className?: string) => (
    <TextField
      id={id}
      {...text[id]}
      className={className}
      required={checkout.required}
      invalid={card.isInvalid(id)}
      inputRef={card.register(id)}
      value={card.values[id]}
      onChange={(value) => card.update(id, value)}
    />
  );
  return (
    <section className="pane">
      <fieldset>
        <legend>{text.legend}</legend>
        <div className="opts">
          {text.methods.map((method) => (
            <label key={method.value} className="opt">
              <input
                type="radio"
                name="pay"
                value={method.value}
                checked={form.method === method.value}
                onChange={() => form.setMethod(method.value)}
              />
              <span>
                <b>{method.value}</b>
                <small>{method.note}</small>
              </span>
              <span />
            </label>
          ))}
        </div>
        {form.paysByCard && (
          <div className="card">
            <div className="f">
              {field("cno", "w")}
              {field("exp")}
              {field("cvc")}
            </div>
            <p className="hint card-hint">{text.cardHint}</p>
          </div>
        )}
      </fieldset>
      <div className="nav">
        <button type="button" className="btn g" onClick={() => form.go(STEP.delivery)}>
          {checkout.back}
        </button>
        <button type="button" className="btn" onClick={form.leavePayment}>
          {text.next}
        </button>
      </div>
    </section>
  );
}
