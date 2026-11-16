import { Choice } from "~/samples/shared/form/Choice";
import { openhouse } from "../content/openhouse";
import { type OpenhouseForm, STEP } from "./useOpenhouseForm";

const text = openhouse.schedule;

export function SchedulePane({ form }: { form: OpenhouseForm }) {
  return (
    <section className="pane">
      <fieldset>
        <legend>{text.legend}</legend>
        <p className="hint">{text.hint}</p>
        <div className="days">
          {text.days.map((day) => (
            <div key={day.label} className="day">
              <h3>
                {day.title}
                <small className="note">{day.note}</small>
              </h3>
              {day.slots.map((slot) => {
                const value = form.slotValue(day.label, slot.time);
                return (
                  <Choice
                    key={value}
                    type="radio"
                    name="slot"
                    value={value}
                    className="slot"
                    checked={form.slot === value}
                    disabled={slot.status === "full"}
                    onChange={() => form.setSlot(value)}
                  >
                    <b>{slot.time}</b>
                    <small className={slot.status === "open" ? undefined : slot.status}>
                      {text.status[slot.status as keyof typeof text.status]}
                    </small>
                  </Choice>
                );
              })}
            </div>
          ))}
        </div>
      </fieldset>
      <div className="nav">
        <span />
        <button type="button" className="btn" onClick={() => form.go(STEP.family)}>
          {text.next}
        </button>
      </div>
    </section>
  );
}
