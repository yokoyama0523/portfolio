import { Link } from "react-router";
import { SelectField } from "~/samples/shared/form/SelectField";
import { TextField } from "~/samples/shared/form/TextField";
import { checkout } from "../content/checkout";
import { store } from "../content/store";
import type { Checkout } from "./useCheckout";

const text = checkout.delivery;

export function DeliveryPane({ form }: { form: Checkout }) {
  const { address } = form;
  const field = (
    id: "name" | "tel" | "zip" | "addr" | "email",
    type = "text",
    className?: string,
  ) => (
    <TextField
      id={id}
      type={type}
      {...text[id]}
      className={className}
      required={checkout.required}
      invalid={address.isInvalid(id)}
      inputRef={address.register(id)}
      value={address.values[id]}
      onChange={(value) => address.update(id, value)}
    />
  );
  return (
    <section className="pane">
      <fieldset>
        <legend>{text.legend}</legend>
        <div className="f">
          {field("name")}
          {field("tel", "tel")}
          {field("zip")}
          <div>
            <label className="t" htmlFor="pref">
              {text.pref.label}
              <em>{checkout.required}</em>
            </label>
            <select
              id="pref"
              name="pref"
              required
              aria-invalid={address.isInvalid("pref")}
              className={address.isInvalid("pref") ? "bad" : undefined}
              value={address.values.pref}
              onChange={(event) => address.update("pref", event.target.value)}
            >
              <option value="">{text.pref.placeholder}</option>
              {text.pref.options.map((option) => (
                <option key={option}>{option}</option>
              ))}
            </select>
          </div>
          {field("addr", "text", "w")}
          {field("email", "email", "w")}
          <SelectField
            id="when"
            {...text.when}
            value={address.values.when}
            onChange={(value) => address.update("when", value)}
          />
        </div>
      </fieldset>
      <div className="nav">
        <Link className="btn g" to={store.paths.home}>
          {checkout.backToShop}
        </Link>
        <button
          type="button"
          className="btn"
          disabled={form.cart.lines.length === 0}
          onClick={form.leaveDelivery}
        >
          {text.next}
        </button>
      </div>
    </section>
  );
}
