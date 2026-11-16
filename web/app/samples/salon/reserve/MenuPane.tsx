import { reserve } from "../content/reserve";
import { type ReserveForm, STEP } from "./useReserveForm";

const text = reserve.menu;

export function MenuPane({ form }: { form: ReserveForm }) {
  return (
    <section className="pane">
      <fieldset>
        <legend>{text.legend}</legend>
        <div className="menu">
          {text.items.map((item) => (
            <label key={item.name}>
              <input
                type="checkbox"
                name="menu"
                value={item.name}
                checked={form.menus.includes(item.name)}
                onChange={() => form.toggleMenu(item.name)}
              />
              <span>
                <b className="name">{item.name}</b>
                <small className="note">{item.note}</small>
              </span>
              <span className="p">{text.yen(item.price)}</span>
            </label>
          ))}
        </div>
        <div className="total">
          <span>
            {text.durationLabel} <b>{text.minutes(form.totals.minutes)}</b>
          </span>
          <span>
            {text.totalLabel}
            <b>{text.yen(form.totals.yen)}</b>
          </span>
        </div>
      </fieldset>
      <div className="nav">
        <span />
        <button
          type="button"
          className="btn"
          disabled={form.menus.length === 0}
          onClick={() => form.go(STEP.stylist)}
        >
          {text.next}
        </button>
      </div>
    </section>
  );
}
