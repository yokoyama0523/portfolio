import { Summary } from "~/samples/shared/form/Summary";
import { openhouse } from "../content/openhouse";
import { type OpenhouseForm, STEP } from "./useOpenhouseForm";

const text = openhouse.confirm;
const { labels } = text;

export function ConfirmPane({ form }: { form: OpenhouseForm }) {
  const { values } = form.fields;
  const or = (value: string) => value || openhouse.empty;
  const rows = [
    { label: labels.slot, value: form.slot, step: STEP.schedule },
    {
      label: labels.people,
      value: `${text.adults} ${form.adults}　${text.kids} ${form.kids}`,
      step: STEP.family,
    },
    { label: labels.stage, value: form.stage, step: STEP.family },
    { label: labels.interests, value: or(form.interests.join(text.separator)), step: STEP.family },
    { label: labels.access, value: form.access, step: STEP.family },
    { label: labels.name, value: `${or(values.name)}（${or(values.kana)}）`, step: STEP.contact },
    { label: labels.contact, value: `${or(values.tel)}　${or(values.email)}`, step: STEP.contact },
    { label: labels.area, value: or(values.area), step: STEP.contact },
    { label: labels.note, value: or(values.note), step: STEP.contact },
  ];
  return (
    <section className="pane">
      <fieldset>
        <legend>{text.legend}</legend>
        <Summary rows={rows} editLabel={text.edit} onEdit={form.go} />
        <p className="hint confirm-hint">{text.hint}</p>
      </fieldset>
      <div className="nav">
        <button type="button" className="btn g" onClick={() => form.go(STEP.contact)}>
          {openhouse.back}
        </button>
        <button type="submit" className="btn">
          {text.submit}
        </button>
      </div>
    </section>
  );
}
