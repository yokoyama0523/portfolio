import { Link } from "react-router";
import { jpDate } from "~/samples/shared/dates";
import { reserve } from "../content/reserve";
import { salon } from "../content/salon";
import type { ReserveForm } from "./useReserveForm";

const text = reserve.done;

export function DonePane({ form }: { form: ReserveForm }) {
  const { date, time } = form;
  const menus = form.chosen.map((item) => item.name).join(text.menuSeparator);
  const summary = date
    ? `${jpDate(date)}　${time}${reserve.date.from}　／　${menus}　／　${form.stylist}`
    : "";
  return (
    <section className="pane fin">
      <h2>{text.title}</h2>
      <div className="no">
        <small>{text.number}</small>
        <span>{form.receipt}</span>
      </div>
      {summary && <p className="when">{summary}</p>}
      {text.boxes.map((box) => (
        <div key={box.title} className="box">
          <b>{box.title}</b>
          {box.text}
        </div>
      ))}
      <p className="back">
        <Link className="btn g" to={salon.paths.home}>
          {text.back}
        </Link>
      </p>
    </section>
  );
}
