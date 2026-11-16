import { jpDate } from "~/samples/shared/dates";
import { Summary } from "~/samples/shared/form/Summary";
import { reserve } from "../content/reserve";
import { yen } from "../content/rooms";
import { isoToDate } from "./availability";
import { STEP, type StayForm } from "./useStayForm";

const text = reserve.confirm;
const { labels } = text;

export function ConfirmPane({ form }: { form: StayForm }) {
  const { values } = form.fields;
  const or = (value: string) => value || reserve.empty;
  const rows = [
    {
      label: labels.stay,
      value: text.stay(jpDate(isoToDate(form.date)), form.nights, form.adults, Number(form.kids)),
      step: STEP.stay,
    },
    { label: labels.room, value: form.room?.name ?? reserve.empty, step: STEP.room },
    { label: labels.extras, value: `${form.dinner}　／　${form.pickup}`, step: STEP.room },
    { label: labels.total, value: `${yen(form.total)}${text.totalNote}`, step: STEP.room },
    { label: labels.name, value: `${or(values.name)}（${or(values.kana)}）`, step: STEP.guest },
    { label: labels.contact, value: `${or(values.tel)}　${or(values.email)}`, step: STEP.guest },
    {
      label: labels.arrive,
      value: `${or(values.arrive)}　／　${or(values.pref)}`,
      step: STEP.guest,
    },
    { label: labels.note, value: or(values.note), step: STEP.guest },
  ];
  return (
    <section className="pane">
      <fieldset>
        <legend>{text.legend}</legend>
        <Summary rows={rows} editLabel={text.edit} onEdit={form.go} />
        <p className="hint confirm-hint">{text.hint}</p>
      </fieldset>
      <div className="nav">
        <button type="button" className="btn g" onClick={() => form.go(STEP.guest)}>
          {reserve.back}
        </button>
        <button type="submit" className="btn">
          {text.submit}
        </button>
      </div>
    </section>
  );
}
