import { Img } from "~/samples/shared/Img";
import { reserve } from "../content/reserve";
import { type ReserveForm, STEP } from "./useReserveForm";

const text = reserve.stylist;

export function StylistPane({ form }: { form: ReserveForm }) {
  return (
    <section className="pane">
      <fieldset>
        <legend>{text.legend}</legend>
        <p className="hint">{text.hint}</p>
        <div className="sty">
          {text.options.map((option) => (
            <label key={option.name}>
              <input
                type="radio"
                name="stylist"
                value={option.name}
                checked={form.stylist === option.name}
                onChange={() => form.setStylist(option.name)}
              />
              {option.image ? (
                <div className="im">
                  <Img image={option.image} />
                </div>
              ) : (
                <div className="im none">{text.anyLabel}</div>
              )}
              <b>{option.name}</b>
              <small>{option.note}</small>
            </label>
          ))}
        </div>
      </fieldset>
      <div className="nav">
        <button type="button" className="btn g" onClick={() => form.go(STEP.menu)}>
          {reserve.back}
        </button>
        <button type="button" className="btn" onClick={() => form.go(STEP.date)}>
          {text.next}
        </button>
      </div>
    </section>
  );
}
