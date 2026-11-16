import { quote } from "../content/quote";
import { type ContactField, type QuoteForm, type RequiredField, STEP } from "./useQuoteForm";

const text = quote.contact;

type Input = { id: ContactField; type: string; required?: RequiredField };

const inputs: Input[] = [
  { id: "company", type: "text", required: "company" },
  { id: "dept", type: "text" },
  { id: "name", type: "text", required: "name" },
  { id: "tel", type: "tel", required: "tel" },
  { id: "email", type: "email", required: "email" },
];

const labels = {
  company: text.company,
  dept: text.dept,
  name: text.name,
  tel: text.tel,
  email: text.email,
} as const;

export function ContactPane({ form }: { form: QuoteForm }) {
  return (
    <section className="pane">
      <fieldset>
        <legend>{text.legend}</legend>
        <div className="f">
          {inputs.map(({ id, type, required }) => {
            const field = labels[id as keyof typeof labels];
            const bad = required ? form.invalid.includes(required) : false;
            return (
              <div key={id}>
                <label className="t" htmlFor={id}>
                  {field.label}
                  {required && <em>{quote.required}</em>}
                </label>
                <input
                  ref={
                    required
                      ? (element) => {
                          form.fieldRefs.current[required] = element;
                        }
                      : undefined
                  }
                  type={type}
                  id={id}
                  name={id}
                  required={Boolean(required)}
                  aria-invalid={bad}
                  aria-describedby={required ? `${id}-error` : undefined}
                  className={bad ? "bad" : undefined}
                  placeholder={field.placeholder}
                  value={form.contact[id]}
                  onChange={(event) => form.updateContact(id, event.target.value)}
                />
                {"error" in field && (
                  <div className="errmsg" id={`${id}-error`}>
                    {field.error}
                  </div>
                )}
              </div>
            );
          })}
          <div>
            <label className="t" htmlFor="industry">
              {text.industry.label}
            </label>
            <select
              id="industry"
              name="industry"
              value={form.contact.industry}
              onChange={(event) => form.updateContact("industry", event.target.value)}
            >
              {text.industry.options.map((option) => (
                <option key={option}>{option}</option>
              ))}
            </select>
          </div>
        </div>
      </fieldset>
      <div className="nav">
        <button type="button" className="btn g" onClick={() => form.go(STEP.content)}>
          {quote.back}
        </button>
        <button type="button" className="btn" onClick={form.leaveContact}>
          {quote.next.contact}
        </button>
      </div>
    </section>
  );
}
