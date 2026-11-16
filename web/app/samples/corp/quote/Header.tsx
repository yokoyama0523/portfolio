import { Link } from "react-router";
import { company } from "../content/company";
import { quote } from "../content/quote";

export function Header() {
  return (
    <header className="hd">
      <Link className="logo" to={company.paths.home}>
        <span className="m">{company.mark}</span>
        <b>{company.name}</b>
      </Link>
      <div className="tel">
        {quote.telLabel}
        <b className="number">{company.tel}</b>
      </div>
    </header>
  );
}
