import { Link } from "react-router";
import { samplePath } from "~/samples/catalog";
import { Lines } from "~/samples/shared/Lines";
import { studio } from "../content/studio";

export function Header() {
  return (
    <header className="hd">
      <Link className="logo" to={samplePath("motion")}>
        {studio.logo.main}
        <i>{studio.logo.sub}</i>
      </Link>
      <div className="mid">
        <Lines lines={studio.place} />
      </div>
      <nav aria-label={studio.navLabel}>
        {studio.nav.map((item) => (
          <a key={item.href} href={item.href} data-cur={item.cursor}>
            {item.label}
          </a>
        ))}
      </nav>
    </header>
  );
}
