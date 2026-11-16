import { Link } from "react-router";
import { jpDate } from "~/samples/shared/dates";
import { clinic } from "../content/clinic";
import { reserve } from "../content/reserve";
import type { ReserveForm } from "./useReserveForm";

const text = reserve.done;

export function DonePane({ form }: { form: ReserveForm }) {
  return (
    <section className="pane fin">
      <h2>{text.title}</h2>
      <div className="no">
        <small>{text.number}</small>
        <span>{form.receipt}</span>
      </div>
      {form.date && (
        <p className="when">{`${jpDate(form.date)}　${form.time}　／　${form.menu}`}</p>
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
        <b>{text.place.title}</b>
        {text.place.text}
      </div>
      <p className="back">
        <Link className="btn g" to={clinic.paths.home}>
          {text.back}
        </Link>
      </p>
    </section>
  );
}
