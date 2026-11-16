import { consult } from "../content/consult";
import type { RequiredField } from "./booking";
import { type ConsultForm, STEP } from "./useConsultForm";

const text = consult.contact;

const requiredInputs: { id: RequiredField; type: string }[] = [
  { id: "name", type: "text" },
  { id: "tel", type: "tel" },
  { id: "email", type: "email" },
];

export function ContactPane({ form }: { form: ConsultForm }) {
  const next = () => {
    if (form.checkContact()) form.go(STEP.confirm);
  };
  return (
    <section className="pane">
      <fieldset>
        <legend>{text.legend}</legend>
        <div className="f">
          <div>
            <label className="t" htmlFor="company">
              {text.company.label}
            </label>
            <input
              type="text"
              id="company"
              name="company"
              placeholder={text.company.placeholder}
              value={form.values.company}
              onChange={(event) => form.update("company", event.target.value)}
            />
          </div>
          {requiredInputs.map(({ id, type }) => {
            const bad = form.invalid.includes(id);
            return (
              <div key={id}>
                <label className="t" htmlFor={id}>
                  {text[id].label}
                  <em>{consult.required}</em>
                </label>
                <input
                  ref={(element) => {
                    form.fieldRefs.current[id] = element;
                  }}
                  type={type}
                  id={id}
                  name={id}
                  required
                  aria-invalid={bad}
                  aria-describedby={`${id}-error`}
                  className={bad ? "bad" : undefined}
                  placeholder={text[id].placeholder}
                  value={form.values[id]}
                  onChange={(event) => form.update(id, event.target.value)}
                />
                <div className="errmsg" id={`${id}-error`}>
                  {text[id].error}
                </div>
              </div>
            );
          })}
          <div className="w">
            <label className="t" htmlFor="note">
              {text.note.label}
            </label>
            <textarea
              id="note"
              name="note"
              placeholder={text.note.placeholder}
              value={form.values.note}
              onChange={(event) => form.update("note", event.target.value)}
            />
          </div>
        </div>
      </fieldset>
      <div className="nav">
        <button type="button" className="btn g" onClick={() => form.go(STEP.schedule)}>
          {consult.back}
        </button>
        <button type="button" className="btn" onClick={next}>
          {text.next}
        </button>
      </div>
    </section>
  );
}
