import { Link } from "react-router";
import { Lines } from "~/samples/shared/Lines";
import { clinic, reserveLabel } from "../content/clinic";
import { home } from "../content/home";

type Props = { title: string; text: readonly string[] };

export function Cta({ title, text }: Props) {
  return (
    <section className="cta" aria-labelledby="cta-title">
      <div className="cta-in">
        <div>
          <h2 id="cta-title" className="h2">
            {title}
          </h2>
          <p className="prose">
            <Lines lines={text} />
          </p>
        </div>
        <div className="cta-actions">
          <Link className="btn big" to={clinic.paths.reserve}>
            {reserveLabel}
          </Link>
          <p className="cta-tel">
            <small>{home.cta.telLabel}</small>
            <a href={clinic.telHref}>{clinic.tel}</a>
          </p>
        </div>
      </div>
    </section>
  );
}
