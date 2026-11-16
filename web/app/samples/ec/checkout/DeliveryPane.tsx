import { addDays, jpDate, ymd } from "~/samples/shared/dates";
import { Choice } from "~/samples/shared/form/Choice";
import { checkoutPage as text } from "../content/checkout";
import { type Checkout, STEP } from "./useCheckout";

const dateChoices = (fastest: Date) =>
  Array.from({ length: text.delivery.pickDays }, (_, i) => {
    const date = addDays(fastest, i + 1);
    return { value: ymd(date), label: jpDate(date) };
  });

export function DeliveryPane({ form }: { form: Checkout }) {
  const { fastest } = form;
  return (
    <section className="pane">
      <fieldset>
        <legend>{text.delivery.dateLegend}</legend>
        <div className="opts">
          <Choice
            type="radio"
            name="ddate"
            value="none"
            checked={form.dateMode === "none"}
            onChange={() => form.setDateMode("none")}
          >
            <b>{text.delivery.fastest}</b>
            <small>
              {fastest ? text.delivery.fastestNote(fastest.getMonth() + 1, fastest.getDate()) : ""}
            </small>
          </Choice>
          <Choice
            type="radio"
            name="ddate"
            value="pick"
            checked={form.dateMode === "pick"}
            onChange={() => form.setDateMode("pick")}
          >
            <b>{text.delivery.pick}</b>
            <small>
              <select
                className="date-select"
                aria-label={text.delivery.pickLabel}
                value={form.pickedDate}
                onFocus={() => form.setDateMode("pick")}
                onChange={(event) => form.setPickedDate(event.target.value)}
              >
                {fastest &&
                  dateChoices(fastest).map((choice) => (
                    <option key={choice.value} value={choice.value}>
                      {choice.label}
                    </option>
                  ))}
              </select>
            </small>
          </Choice>
        </div>
      </fieldset>
      <fieldset>
        <legend>{text.delivery.timeLegend}</legend>
        <div className="opts">
          {text.delivery.times.map((time) => (
            <Choice
              key={time}
              type="radio"
              name="dtime"
              value={time}
              checked={form.time === time}
              onChange={() => form.setTime(time)}
            >
              <b>{time}</b>
            </Choice>
          ))}
        </div>
      </fieldset>
      <fieldset>
        <legend>{text.delivery.giftLegend}</legend>
        <Choice
          type="checkbox"
          name="gift"
          value="gift"
          checked={form.gift}
          onChange={() => form.setGift(!form.gift)}
        >
          <b>{text.delivery.gift}</b>
          <small>{text.delivery.giftNote}</small>
        </Choice>
      </fieldset>
      <div className="nav">
        <button type="button" className="btn g" onClick={() => form.go(STEP.address)}>
          {text.back}
        </button>
        <button type="button" className="btn" onClick={form.next}>
          {text.delivery.next}
        </button>
      </div>
    </section>
  );
}
