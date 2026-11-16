import { Link } from "react-router";
import { builder } from "../content/builder";
import { openhouse } from "../content/openhouse";
import type { OpenhouseForm } from "./useOpenhouseForm";

const text = openhouse.done;

export function DonePane({ form }: { form: OpenhouseForm }) {
  const { confirm } = openhouse;
  return (
    <section className="pane fin">
      <h2>{text.title}</h2>
      <div className="no">
        <small>{text.number}</small>
        <span>{form.receipt}</span>
      </div>
      <p className="when">
        {form.slot}　／　{confirm.adults} {form.adults}　{confirm.kids} {form.kids}
      </p>
      {text.boxes.map((box) => (
        <div key={box.title} className="box">
          <b>{box.title}</b>
          {box.text}
        </div>
      ))}
      <p className="back">
        <Link className="btn g" to={builder.paths.home}>
          {text.back}
        </Link>
      </p>
    </section>
  );
}
