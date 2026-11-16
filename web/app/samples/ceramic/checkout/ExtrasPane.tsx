import { SelectField } from "~/samples/shared/form/SelectField";
import { TextField } from "~/samples/shared/form/TextField";
import { checkout } from "../content/checkout";
import { type Checkout, STEP } from "./useCheckout";

const { wrap, payment } = checkout;

export function ExtrasPane({ form }: { form: Checkout }) {
  const { card, gift } = form;
  const cardField = (id: "cno" | "exp" | "cvc", className?: string) => (
    <TextField
      id={id}
      {...payment[id]}
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
        <legend>{wrap.legend}</legend>
        <div className="opts">
          {[wrap.paper, wrap.box].map((option) => (
            <label key={option.value} className="opt">
              <input
                type="radio"
                name="wrap"
                value={option.value}
                checked={form.wrapping === option.value}
                onChange={() => form.setWrapping(option.value)}
              />
              <span>
                <b>{option.title}</b>
                <small>{option.note}</small>
              </span>
              <span className="pr">{option.price}</span>
            </label>
          ))}
        </div>
        {form.isGift && (
          <div className="gift">
            <div className="f">
              <SelectField
                id="noshi"
                {...wrap.noshi}
                value={gift.values.noshi}
                onChange={(value) => gift.update("noshi", value)}
              />
              <TextField
                id="naire"
                {...wrap.naire}
                value={gift.values.naire}
                onChange={(value) => gift.update("naire", value)}
              />
              <div className="w">
                <label className="t" htmlFor="message">
                  {wrap.message.label}
                </label>
                <input
                  type="text"
                  id="message"
                  name="message"
                  maxLength={wrap.message.maxLength}
                  placeholder={wrap.message.placeholder}
                  value={gift.values.message}
                  onChange={(event) => gift.update("message", event.target.value)}
                />
              </div>
            </div>
          </div>
        )}
      </fieldset>
      <fieldset>
        <legend>{payment.legend}</legend>
        <div className="opts">
          {payment.methods.map((method) => (
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
              {cardField("cno", "w")}
              {cardField("exp")}
              {cardField("cvc")}
            </div>
            <p className="hint card-hint">{payment.cardHint}</p>
          </div>
        )}
      </fieldset>
      <div className="nav">
        <button type="button" className="btn g" onClick={() => form.go(STEP.delivery)}>
          {checkout.back}
        </button>
        <button type="button" className="btn" onClick={form.leaveExtras}>
          {payment.next}
        </button>
      </div>
    </section>
  );
}
