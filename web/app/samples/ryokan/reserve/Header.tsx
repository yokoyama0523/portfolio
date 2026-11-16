import { Link } from "react-router";
import { inn } from "../content/inn";

export function Header() {
  return (
    <header className="hd">
      <Link className="logo" to={inn.paths.home}>
        {inn.name}
      </Link>
      <div className="tel">
        {inn.telHours}
        <b className="number">{inn.tel}</b>
      </div>
    </header>
  );
}
