import { SelectField } from "~/samples/shared/form/SelectField";
import { TextField } from "~/samples/shared/form/TextField";
import { openhouse } from "../content/openhouse";
import { type OpenhouseForm, STEP } from "./useOpenhouseForm";

const text = openhouse.contact;

const required = [
  { id: "name", type: "text" },
  { id: "kana", type: "text" },
  { id: "tel", type: "tel" },
  { id: "email", type: "email" },
] as const;

export function ContactPane({ form }: { form: OpenhouseForm }) {
  const { fields } = form;
  return (
    <section className="pane">
      <fieldset>
        <legend>{text.legend}</legend>
        <div className="f">
          {required.map(({ id, type }) => (
            <TextField
              key={id}
              id={id}
              type={type}
              {...text[id]}
              required={openhouse.required}
              invalid={fields.isInvalid(id)}
              inputRef={fields.register(id)}
              value={fields.values[id]}
              onChange={(value) => fields.update(id, value)}
            />
          ))}
          <TextField
            id="area"
            {...text.area}
            value={fields.values.area}
            onChange={(value) => fields.update("area", value)}
          />
          <SelectField
            id="source"
            {...text.source}
            value={fields.values.source}
            onChange={(value) => fields.update("source", value)}
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
        <button type="button" className="btn g" onClick={() => form.go(STEP.family)}>
          {openhouse.back}
        </button>
        <button type="button" className="btn" onClick={form.leaveContact}>
          {text.next}
        </button>
      </div>
    </section>
  );
}
