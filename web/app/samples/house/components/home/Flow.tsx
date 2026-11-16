import { home } from "../../content/home";
import { Head } from "./Head";

const { flow } = home;
const months = Array.from({ length: flow.months }, (_, i) => String(i + 1));
const NAME_COLUMN = 1;

export function Flow() {
  return (
    <section className="sec flow" id={flow.id}>
      <Head title={flow.title} text={flow.text} />
      <div className="chart">
        <div className="months">
          <span />
          {months.map((month) => (
            <span key={month}>{month}</span>
          ))}
        </div>
        {flow.phases.map((phase) => (
          <div key={phase.name} className="row">
            <span className="nm">
              {phase.name}
              <small>{phase.span}</small>
            </span>
            <span
              className={phase.accent ? "bar o" : "bar"}
              style={{ gridColumn: `${phase.from + NAME_COLUMN}/${phase.to + NAME_COLUMN}` }}
            />
          </div>
        ))}
      </div>
      <div className="notes">
        {flow.notes.map((note) => (
          <div key={note.title}>
            <b>{note.title}</b>
            <p>{note.text}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
