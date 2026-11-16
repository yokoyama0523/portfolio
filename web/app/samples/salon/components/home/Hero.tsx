import { Img } from "~/samples/shared/Img";
import { home } from "../../content/home";
import { salon } from "../../content/salon";

const { hero } = home;

export function Hero() {
  return (
    <section className="hero" aria-label={hero.label}>
      <div className="l">
        <h1>{hero.title}</h1>
        <figure className="sm">
          <Img image={hero.small} />
        </figure>
        <div>
          <div className="mark" aria-hidden="true">
            {salon.mark}
            <i>{salon.markSuffix}</i>
          </div>
          <div className="meta">
            {hero.meta.map((item) => (
              <span key={item}>{item}</span>
            ))}
          </div>
        </div>
      </div>
      <div className="r">
        <Img image={hero.large} priority />
      </div>
    </section>
  );
}
