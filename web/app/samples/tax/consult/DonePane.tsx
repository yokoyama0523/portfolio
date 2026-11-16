import { Link } from "react-router";
import { jpDate } from "~/samples/shared/dates";
import { consult } from "../content/consult";
import { office } from "../content/office";
import type { ConsultForm } from "./useConsultForm";

const text = consult.done;

export function DonePane({ form }: { form: ConsultForm }) {
  const { date, time, values } = form;
  return (
    <section className="pane fin">
      <h2>{text.title}</h2>
      <div className="no">
        <small>{text.number}</small>
        <span>{form.receipt}</span>
      </div>
      {date && (
        <p className="when">
          {jpDate(date)}　{time}
          {consult.schedule.from}　／　{values.how}　／　{values.topic}
        </p>
      )}
      <div className="box">
        <b>{text.bring.title}</b>
        <ul>
          {text.bring.items.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </div>
      <div className="box">
        <b>{text.online.title}</b>
        {text.online.text}
      </div>
      <p className="back">
        <Link className="btn g" to={office.paths.home}>
          {text.back}
        </Link>
      </p>
    </section>
  );
}
