import { Link } from "react-router";
import { Img } from "~/samples/shared/Img";
import { clinic } from "../../content/clinic";
import { home } from "../../content/home";
import { treatments } from "../../content/treatments";

const { menu } = home;

export function Menu() {
  return (
    <section className="sec menu" id={menu.id}>
      <h2>{menu.title}</h2>
      <p className="lead">{menu.lead}</p>
      <div className="list">
        {treatments.map((treatment) => (
          <Link key={treatment.id} to={`${clinic.paths.treatment}#${treatment.id}`}>
            <div className="im">
              <Img image={treatment.image} />
            </div>
            <div>
              <h3>{treatment.title}</h3>
              <p>{treatment.summary}</p>
            </div>
          </Link>
        ))}
      </div>
      <Link className="all" to={clinic.paths.treatment}>
        {menu.all}
      </Link>
    </section>
  );
}
