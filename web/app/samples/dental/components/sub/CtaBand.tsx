import { Link } from "react-router";
import { clinic, reserveLabel } from "../../content/clinic";

export function CtaBand({ title, text }: { title: string; text: string }) {
  return (
    <section className="cta-band">
      <h2>{title}</h2>
      <p>{text}</p>
      <div className="btns">
        <Link className="btn" to={clinic.paths.reserve}>
          {reserveLabel}
        </Link>
        <a className="btn w" href={clinic.telHref}>
          {clinic.tel}
        </a>
      </div>
    </section>
  );
}
