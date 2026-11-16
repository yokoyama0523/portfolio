import { jpDate } from "~/samples/shared/dates";
import { Summary } from "~/samples/shared/form/Summary";
import { reserve } from "../content/reserve";
import { type ReserveForm, STEP } from "./useReserveForm";

const text = reserve.confirm;
const { labels } = text;

export function ConfirmPane({ form }: { form: ReserveForm }) {
  const { values } = form.fields;
  const or = (value: string) => value || reserve.empty;
  const menu = `${form.chosen.map((item) => item.name).join(text.separator)}　／　${text.about(form.totals.minutes)}　${reserve.menu.yen(form.totals.yen)}`;
  const rows = [
    { label: labels.menu, value: menu, step: STEP.menu },
    { label: labels.stylist, value: form.stylist, step: STEP.stylist },
    {
      label: labels.when,
      value: form.date ? `${jpDate(form.date)}　${form.time}${reserve.date.from}` : reserve.empty,
      step: STEP.date,
    },
    { label: labels.name, value: `${or(values.name)}（${or(values.kana)}）`, step: STEP.contact },
    { label: labels.tel, value: or(values.tel), step: STEP.contact },
    { label: labels.email, value: or(values.email), step: STEP.contact },
    {
      label: labels.visit,
      value: `${or(values.visit)}　／　${or(values.hair)}`,
      step: STEP.contact,
    },
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
          {reserve.back}
        </button>
        <button type="submit" className="btn">
          {text.submit}
        </button>
      </div>
    </section>
  );
}
