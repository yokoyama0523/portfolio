import { Fragment } from "react";
import { consult } from "../content/consult";
import { jpDate } from "./booking";
import { type ConsultForm, STEP } from "./useConsultForm";

const text = consult.confirm;
const { labels } = text;

export function ConfirmPane({ form }: { form: ConsultForm }) {
  const { values, date, time } = form;
  const or = (value: string) => value || text.empty;
  const rows = [
    { label: labels.topic, value: values.topic, step: STEP.topic },
    {
      label: labels.company,
      value: `${text.sales} ${or(values.sales)}　／　${or(values.biz)}　／　${or(values.staff)}`,
      step: STEP.topic,
    },
    { label: labels.how, value: values.how, step: STEP.schedule },
    {
      label: labels.when,
      value: date ? `${jpDate(date)}　${time}${consult.schedule.from}${text.duration}` : text.empty,
      step: STEP.schedule,
    },
    { label: labels.companyName, value: or(values.company), step: STEP.contact },
    { label: labels.name, value: or(values.name), step: STEP.contact },
    { label: labels.contact, value: `${or(values.tel)}　${or(values.email)}`, step: STEP.contact },
    { label: labels.note, value: or(values.note), step: STEP.contact },
  ];
  return (
    <section className="pane">
      <fieldset>
        <legend>{text.legend}</legend>
        <div className="sum">
          <dl>
            {rows.map((row) => (
              <Fragment key={row.label}>
                <dt>{row.label}</dt>
                <dd>
                  {row.value}
                  <button type="button" className="edit" onClick={() => form.go(row.step)}>
                    {text.edit}
                  </button>
                </dd>
              </Fragment>
            ))}
          </dl>
        </div>
        <p className="hint confirm-hint">
          {text.hint}
          <span className="mk">{text.promise}</span>
        </p>
      </fieldset>
      <div className="nav">
        <button type="button" className="btn g" onClick={() => form.go(STEP.contact)}>
          {consult.back}
        </button>
        <button type="submit" className="btn">
          {text.submit}
        </button>
      </div>
    </section>
  );
}
