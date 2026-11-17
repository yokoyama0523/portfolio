import { jpDate } from "~/samples/shared/dates";
import { Summary } from "~/samples/shared/form/Summary";
import { Sentences } from "../components/Sentences";
import { reserve } from "../content/reserve";
import { type ReserveForm, STEP } from "./useReserveForm";

const text = reserve.confirm;
const { labels } = text;

export function ConfirmPane({ form }: { form: ReserveForm }) {
  const { values } = form.fields;
  const or = (value: string) => value || reserve.empty;
  const rows = [
    { label: labels.what, value: `${form.kind}　／　${form.menu}`, step: STEP.menu },
    {
      label: labels.when,
      value: form.date ? `${jpDate(form.date)}　${form.time}` : reserve.empty,
      step: STEP.date,
    },
    { label: labels.name, value: `${or(values.name)}（${or(values.kana)}）`, step: STEP.contact },
    { label: labels.tel, value: or(values.tel), step: STEP.contact },
    { label: labels.email, value: or(values.email), step: STEP.contact },
    { label: labels.birth, value: or(values.birth), step: STEP.contact },
    { label: labels.who, value: or(values.who), step: STEP.contact },
    { label: labels.note, value: or(values.note), step: STEP.contact },
  ];
  return (
    <section className="pane">
      <fieldset>
        <legend>{text.legend}</legend>
        <Summary rows={rows} editLabel={text.edit} onEdit={form.go} />
        <p className="hint confirm-hint">
          <Sentences text={text.hint} />
        </p>
      </fieldset>
      <div className="nav">
        <button type="button" className="btn g" onClick={() => form.go(STEP.contact)}>
          {reserve.back}
        </button>
        <button type="submit" className="btn">
          {text.submit}
        </button>
      </div>
    </section>
  );
}
