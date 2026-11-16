import { Link } from "react-router";
import { clinic, reserveLabel } from "../../content/clinic";
import { home } from "../../content/home";

export function Cta() {
  return (
    <section className="cta">
      <h2>{home.cta.title}</h2>
      <p>{home.cta.text}</p>
      <Link className="btn" to={clinic.paths.reserve}>
        {reserveLabel}
      </Link>
      <a className="btn w" href={clinic.telHref}>
        {clinic.tel}
      </a>
    </section>
  );
}
