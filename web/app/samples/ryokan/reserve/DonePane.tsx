import { Link } from "react-router";
import { jpDate } from "~/samples/shared/dates";
import { inn } from "../content/inn";
import { reserve } from "../content/reserve";
import { isoToDate } from "./availability";
import type { StayForm } from "./useStayForm";

const text = reserve.done;

export function DonePane({ form }: { form: StayForm }) {
  return (
    <section className="pane fin">
      <h2>{text.title}</h2>
      <div className="no">
        <small>{text.number}</small>
        <span>{form.receipt}</span>
      </div>
      <p className="when">
        {text.summary(
          jpDate(isoToDate(form.date)),
          form.nights,
          form.room?.name ?? "",
          form.adults,
        )}
      </p>
      {text.boxes.map((box) => (
        <div key={box.title} className="box">
          <b>{box.title}</b>
          {box.text}
        </div>
      ))}
      <p className="back">
        <Link className="btn g" to={inn.paths.home}>
          {text.back}
        </Link>
      </p>
    </section>
  );
}
