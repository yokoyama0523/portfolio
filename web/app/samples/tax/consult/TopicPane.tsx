import { Choice } from "~/samples/shared/form/Choice";
import { consult } from "../content/consult";
import { type ConsultForm, type Field, STEP } from "./useConsultForm";

export function TopicPane({ form }: { form: ConsultForm }) {
  return (
    <section className="pane">
      <fieldset>
        <legend>{consult.topic.legend}</legend>
        <div className="opts">
          {consult.topic.options.map((option) => (
            <Choice
              key={option.value}
              type="radio"
              name="topic"
              value={option.value}
              checked={form.values.topic === option.value}
              onChange={() => form.update("topic", option.value)}
            >
              <b>{option.title}</b>
              <small>{option.note}</small>
            </Choice>
          ))}
        </div>
      </fieldset>
      <fieldset>
        <legend>{consult.company.legend}</legend>
        <p className="hint">{consult.company.hint}</p>
        <div className="f f3">
          {consult.company.fields.map((field) => (
            <div key={field.id}>
              <label className="t" htmlFor={field.id}>
                {field.label}
              </label>
              <select
                id={field.id}
                name={field.id}
                value={form.values[field.id as Field]}
                onChange={(event) => form.update(field.id as Field, event.target.value)}
              >
                {field.options.map((option) => (
                  <option key={option}>{option}</option>
                ))}
              </select>
            </div>
          ))}
        </div>
      </fieldset>
      <div className="nav">
        <span />
        <button type="button" className="btn" onClick={() => form.go(STEP.schedule)}>
          {consult.company.next}
        </button>
      </div>
    </section>
  );
}
