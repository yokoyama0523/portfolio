import { Link } from "react-router";
import { Img } from "~/samples/shared/Img";
import { image } from "../../assets";
import { looks } from "../../content/catalog";
import { home } from "../../content/home";
import { paths } from "../../content/paths";

const tones = home.lookTones;

export function LookBand() {
  return (
    <section className="band" id={home.looksId} aria-labelledby="looks-title">
      <div className="band-head">
        <p className="eyebrow">{home.looksBand.eyebrow}</p>
        <h2 id="looks-title" className="sec-title">
          {home.looksBand.title}
        </h2>
        <p className="band-hint">{home.looksBand.hint}</p>
      </div>
      <div className="band-run">
        {[0, 1].map((half) => (
          <ul key={half} className="band-half" aria-hidden={half === 1}>
            {looks.map((look, i) => (
              <li key={look.image}>
                <Link
                  to={paths.item(look.items[0])}
                  tabIndex={half === 1 ? -1 : undefined}
                  className="band-item"
                >
                  <figure className={`ph tone-${tones[i % tones.length]}`}>
                    <Img image={image(look.image)} alt={half === 1 ? "" : look.title} />
                  </figure>
                  <span className="band-cap">{look.title}</span>
                </Link>
              </li>
            ))}
          </ul>
        ))}
      </div>
    </section>
  );
}
