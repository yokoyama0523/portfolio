import { SelectField } from "~/samples/shared/form/SelectField";
import { reserve } from "../content/reserve";
import type { StayForm } from "./useStayForm";

const text = reserve.stay;

export function StayPane({ form }: { form: StayForm }) {
  return (
    <section className="pane">
      <fieldset>
        <legend>{text.legend}</legend>
        <div className="f f4">
          <div>
            <label className="t" htmlFor="date">
              {text.date}
              <em>{reserve.required}</em>
            </label>
            <input
              type="date"
              id="date"
              name="date"
              required
              min={form.minDate || undefined}
              aria-invalid={form.dateInvalid}
              className={form.dateInvalid ? "bad" : undefined}
              value={form.date}
              onChange={(event) => form.changeDate(event.target.value)}
            />
          </div>
          <div>
            <label className="t" htmlFor="nights">
              {text.nights.label}
            </label>
            <select
              id="nights"
              name="nights"
              value={form.nights}
              onChange={(event) => form.setNights(event.target.value)}
            >
              {text.nights.options.map((n) => (
                <option key={n} value={n}>
                  {n}
                  {text.nights.suffix}
                </option>
              ))}
            </select>
          </div>
          <SelectField id="adults" {...text.adults} value={form.adults} onChange={form.setAdults} />
          <SelectField id="kids" {...text.kids} value={form.kids} onChange={form.setKids} />
        </div>
        <p className="hint stay-hint">{text.hint}</p>
      </fieldset>
      <div className="nav">
        <span />
        <button type="button" className="btn" onClick={form.leaveStay}>
          {text.next}
        </button>
      </div>
    </section>
  );
}
