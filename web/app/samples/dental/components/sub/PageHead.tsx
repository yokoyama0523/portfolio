import { Link } from "react-router";
import { crumbs } from "../../content/chrome";
import { clinic } from "../../content/clinic";

export function PageHead({ en, title }: { en: string; title: string }) {
  return (
    <section className="ph">
      <div className="inner">
        <span className="en">{en}</span>
        <h1>{title}</h1>
        <nav className="bc" aria-label={crumbs.label}>
          <Link to={clinic.paths.home}>{crumbs.home}</Link>
          {crumbs.separator}
          <span aria-current="page">{title}</span>
        </nav>
      </div>
    </section>
  );
}
