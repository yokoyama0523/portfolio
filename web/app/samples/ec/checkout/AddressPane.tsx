import { Link } from "react-router";
import { TextField } from "~/samples/shared/form/TextField";
import { PrefectureField } from "../components/PrefectureField";
import { checkoutPage as text } from "../content/checkout";
import { paths } from "../content/paths";
import type { Checkout } from "./useCheckout";

const fields = [
  { id: "name", type: "text" },
  { id: "kana", type: "text" },
  { id: "zip", type: "text" },
] as const;

export function AddressPane({ form }: { form: Checkout }) {
  const { address, user } = form;
  const field = (
    id: "name" | "kana" | "zip" | "addr1" | "tel" | "email",
    type = "text",
    className?: string,
  ) => (
    <TextField
      key={id}
      id={id}
      type={type}
      {...text.address[id]}
      className={className}
      required={text.required}
      invalid={address.isInvalid(id)}
      inputRef={address.register(id)}
      value={address.values[id]}
      onChange={(value) => address.update(id, value)}
    />
  );
  return (
    <section className="pane">
      <div className="note login-hint">
        {user ? (
          <>
            <b className="medium">{user.name}</b>
            {text.loggedIn(user.email)}
          </>
        ) : (
          <>
            {text.guest.before}
            <Link className="underline" to={text.loginNext}>
              {text.guest.link}
            </Link>
            {text.guest.after}
          </>
        )}
      </div>
      {user && user.addresses.length > 0 && (
        <fieldset>
          <legend>{text.saved.legend}</legend>
          <div className="opts">
            {user.addresses.map((item, i) => (
              <label key={`${item.zip}${item.addr1}`} className="opt">
                <input
                  type="radio"
                  name="addr"
                  value={i}
                  checked={form.savedChoice === String(i)}
                  onChange={() => form.setSavedChoice(String(i))}
                />
                <b>
                  {item.name}
                  {item.main && text.saved.main}
                </b>
                <small>
                  〒{item.zip} {item.pref}
                  {item.addr1} {item.addr2}
                  <br />
                  {item.tel}
                </small>
              </label>
            ))}
            <label className="opt">
              <input
                type="radio"
                name="addr"
                value="new"
                checked={form.savedChoice === "new"}
                onChange={() => form.setSavedChoice("new")}
              />
              <b>{text.saved.newAddress}</b>
            </label>
          </div>
        </fieldset>
      )}
      {!form.savedAddress && (
        <fieldset>
          <legend>{text.address.legend}</legend>
          <div className="f">
            {fields.map(({ id, type }) => field(id, type))}
            <PrefectureField
              id="pref"
              {...text.address.pref}
              required={text.required}
              invalid={address.isInvalid("pref")}
              value={address.values.pref}
              onChange={(value) => address.update("pref", value)}
            />
            {field("addr1", "text", "w")}
            <div className="w">
              <label className="t" htmlFor="addr2">
                {text.address.addr2.label}
              </label>
              <input
                type="text"
                id="addr2"
                placeholder={text.address.addr2.placeholder}
                value={address.values.addr2}
                onChange={(event) => address.update("addr2", event.target.value)}
              />
            </div>
            {field("tel", "tel")}
            {field("email", "email")}
          </div>
          {user && (
            <label className="agree">
              <input
                type="checkbox"
                checked={form.saveAddress}
                onChange={(event) => form.setSaveAddress(event.target.checked)}
              />
              {text.address.save}
            </label>
          )}
        </fieldset>
      )}
      <div className="nav">
        <Link className="btn g" to={paths.cart}>
          {text.address.backToCart}
        </Link>
        <button type="button" className="btn" onClick={form.next}>
          {text.address.next}
        </button>
      </div>
    </section>
  );
}
