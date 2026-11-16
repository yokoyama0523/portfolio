import { Link } from "react-router";
import { builder } from "../content/builder";
import { openhouse } from "../content/openhouse";

export function Header() {
  return (
    <header className="hd">
      <Link className="logo" to={builder.paths.home}>
        {builder.name}
      </Link>
      <div className="tel">
        {openhouse.telLabel}
        <b className="number">{builder.tel}</b>
      </div>
    </header>
  );
}
