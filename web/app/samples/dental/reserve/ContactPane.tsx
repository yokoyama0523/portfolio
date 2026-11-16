import { SelectField } from "~/samples/shared/form/SelectField";
import { TextField } from "~/samples/shared/form/TextField";
import { reserve } from "../content/reserve";
import { type ReserveForm, STEP } from "./useReserveForm";

const text = reserve.contact;

const inputs = [
  { id: "name", type: "text", required: true },
  { id: "kana", type: "text", required: true },
  { id: "tel", type: "tel", required: true },
  { id: "email", type: "email", required: false },
  { id: "birth", type: "text", required: true },
] as const;

export function ContactPane({ form }: { form: ReserveForm }) {
  const { fields } = form;
  return (
    <section className="pane">
      <fieldset>
        <legend>{text.legend}</legend>
        <div className="f">
          {inputs.map(({ id, type, required }) => (
            <TextField
              key={id}
              id={id}
              type={type}
              {...text[id]}
              required={required ? reserve.required : undefined}
              invalid={fields.isInvalid(id)}
              inputRef={fields.register(id)}
              value={fields.values[id]}
              onChange={(value) => fields.update(id, value)}
            />
          ))}
          <SelectField
            id="who"
            {...text.who}
            value={fields.values.who}
            onChange={(value) => fields.update("who", value)}
          />
          <div className="w">
            <label className="t" htmlFor="note">
              {text.note.label}
            </label>
            <textarea
              id="note"
              name="note"
              placeholder={text.note.placeholder}
              value={fields.values.note}
              onChange={(event) => fields.update("note", event.target.value)}
            />
          </div>
        </div>
      </fieldset>
      <div className="nav">
        <button type="button" className="btn g" onClick={() => form.go(STEP.date)}>
          {reserve.back}
        </button>
        <button type="button" className="btn" onClick={form.leaveContact}>
          {text.next}
        </button>
      </div>
    </section>
  );
}
