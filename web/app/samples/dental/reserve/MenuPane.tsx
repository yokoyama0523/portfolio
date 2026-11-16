import { Choice } from "~/samples/shared/form/Choice";
import { reserve } from "../content/reserve";
import { type ReserveForm, STEP } from "./useReserveForm";

export function MenuPane({ form }: { form: ReserveForm }) {
  return (
    <section className="pane">
      <fieldset>
        <legend>{reserve.kind.legend}</legend>
        <div className="opts">
          {reserve.kind.options.map((option) => (
            <Choice
              key={option.value}
              type="radio"
              name="kind"
              value={option.value}
              checked={form.kind === option.value}
              onChange={() => form.setKind(option.value)}
            >
              <b>{option.title}</b>
              <small>{option.note}</small>
            </Choice>
          ))}
        </div>
      </fieldset>
      <fieldset>
        <legend>{reserve.menu.legend}</legend>
        <p className="hint">{reserve.menu.hint}</p>
        <div className="opts">
          {reserve.menu.options.map((option) => (
            <Choice
              key={option.value}
              type="radio"
              name="menu"
              value={option.value}
              checked={form.menu === option.value}
              onChange={() => form.setMenu(option.value)}
            >
              <b>{option.value}</b>
              <small>{option.note}</small>
            </Choice>
          ))}
        </div>
      </fieldset>
      <div className="nav">
        <span />
        <button type="button" className="btn" onClick={() => form.go(STEP.date)}>
          {reserve.menu.next}
        </button>
      </div>
    </section>
  );
}
