import { Link } from "react-router";
import { Lines } from "~/samples/shared/Lines";
import { clinic } from "../../content/clinic";
import { home } from "../../content/home";
import { treatments } from "../../content/treatments";
import { Sentences } from "../Sentences";

const text = home.menu;

export function Menu() {
  return (
    <section className="menu" id={text.id} aria-labelledby="menu-title">
      <div className="sec-head">
        <h2 id="menu-title" className="h2">
          {text.title}
        </h2>
        <p className="prose">
          <Lines lines={text.lead} />
        </p>
      </div>
      <ul className="menu-list">
        {treatments.map((item) => (
          <li key={item.id}>
            <Link to={`${clinic.paths.treatment}#${item.id}`}>
              <h3>{item.title}</h3>
              <p>
                <Sentences text={item.summary} />
              </p>
            </Link>
          </li>
        ))}
      </ul>
      <p className="more">
        <Link className="btn line" to={clinic.paths.treatment}>
          {text.more}
        </Link>
      </p>
    </section>
  );
}
