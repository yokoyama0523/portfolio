import { Img } from "~/samples/shared/Img";
import { home } from "../../content/home";

const { hero } = home;

export function Hero() {
  return (
    <section className="hero" aria-label={hero.label}>
      <div className="ph">
        <Img image={hero.image} priority />
      </div>
      <div className="tx">
        <h1>
          {hero.title.map((line) => (
            <span key={line}>{line}</span>
          ))}
        </h1>
        <div>
          <p className="sub">{hero.sub}</p>
          <div className="facts">
            {hero.facts.map((fact) => (
              <span key={fact}>{fact}</span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
