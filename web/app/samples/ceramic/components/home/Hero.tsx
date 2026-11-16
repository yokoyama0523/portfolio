import { Img } from "~/samples/shared/Img";
import { Lines } from "~/samples/shared/Lines";
import { home } from "../../content/home";

const { hero } = home;

export function Hero() {
  return (
    <section className="hero" aria-label={hero.label}>
      <div className="pic">
        <Img image={hero.image} alt={hero.alt} priority />
      </div>
      <div className="side">
        <div className="top">
          <h1 className="v">
            <Lines lines={hero.title} />
            <small className="title-latin">{hero.latin}</small>
          </h1>
          <p className="copy v">{hero.copy}</p>
        </div>
        <p className="ex">
          <b>{hero.exhibition}</b>　{hero.exhibitionDate}
        </p>
      </div>
    </section>
  );
}
