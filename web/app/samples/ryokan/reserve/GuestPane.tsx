import { SelectField } from "~/samples/shared/form/SelectField";
import { TextField } from "~/samples/shared/form/TextField";
import { reserve } from "../content/reserve";
import { STEP, type StayForm } from "./useStayForm";

const text = reserve.guest;

const required = [
  { id: "name", type: "text" },
  { id: "kana", type: "text" },
  { id: "tel", type: "tel" },
  { id: "email", type: "email" },
] as const;

export function GuestPane({ form }: { form: StayForm }) {
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
              required={reserve.required}
              invalid={fields.isInvalid(id)}
              inputRef={fields.register(id)}
              value={fields.values[id]}
              onChange={(value) => fields.update(id, value)}
            />
          ))}
          <SelectField
            id="pref"
            {...text.pref}
            value={fields.values.pref}
            onChange={(value) => fields.update("pref", value)}
          />
          <SelectField
            id="arrive"
            {...text.arrive}
            value={fields.values.arrive}
            onChange={(value) => fields.update("arrive", value)}
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
        <button type="button" className="btn g" onClick={() => form.go(STEP.room)}>
          {reserve.back}
        </button>
        <button type="button" className="btn" onClick={form.leaveGuest}>
          {text.next}
        </button>
      </div>
    </section>
  );
}
