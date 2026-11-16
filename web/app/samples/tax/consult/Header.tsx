import { Link } from "react-router";
import { consult } from "../content/consult";
import { office } from "../content/office";

export function Header() {
  return (
    <header className="hd">
      <Link className="logo" to={office.paths.home}>
        {office.name}
      </Link>
      <div className="tel">
        {consult.telLabel}
        <b className="number">{office.tel}</b>
      </div>
    </header>
  );
}
