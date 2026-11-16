import { home } from "../../content/home";
import { Head } from "./Head";

const { perf } = home;

export function Perf() {
  return (
    <section className="sec perf" id={perf.id}>
      <Head title={perf.title} text={perf.text} />
      <div className="grid">
        {perf.items.map((item) => (
          <div key={item.label}>
            <b className="value">
              {item.value}
              {item.unit && <small className="unit">{item.unit}</small>}
            </b>
            <div className="k">{item.label}</div>
            <p>{item.text}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
