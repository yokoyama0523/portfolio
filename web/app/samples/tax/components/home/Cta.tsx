import { Link } from "react-router";
import { home } from "../../content/home";
import { office } from "../../content/office";

const { cta } = home;

export function Cta() {
  return (
    <section className="cta" id={cta.id}>
      <h2>{cta.title}</h2>
      <p>{cta.text}</p>
      <div className="act">
        <Link className="btn" to={office.paths.consult}>
          {cta.button}
        </Link>
        <div className="tel">
          {cta.telLabel}
          <b className="num">{office.tel}</b>
        </div>
      </div>
    </section>
  );
}
