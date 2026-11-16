import { Img } from "~/samples/shared/Img";
import { Lines } from "~/samples/shared/Lines";
import { home } from "../../content/home";

const { hero } = home;

export function Hero() {
  return (
    <section className="hero" aria-label={hero.label}>
      <Img image={hero.image} alt={hero.alt} priority />
      <h1 className="ttl v">
        <Lines lines={hero.title} />
      </h1>
      <div className="sub">
        <b>{hero.place}</b>
        {hero.text}
      </div>
    </section>
  );
}
