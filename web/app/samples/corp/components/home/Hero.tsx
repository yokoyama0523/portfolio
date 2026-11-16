import type { Ref } from "react";
import { Img } from "~/samples/shared/Img";
import { home } from "../../content/home";

const { hero } = home;

export function Hero({ ref }: { ref: Ref<HTMLElement> }) {
  return (
    <section ref={ref} className="hero" aria-label={hero.label}>
      <div className="bg">
        <Img image={hero.image} priority />
      </div>
      <div className="in">
        <h1>
          <span className="l">
            <span className="num">
              {hero.figure}
              <svg
                className="draw"
                viewBox="0 0 100 20"
                preserveAspectRatio="none"
                aria-hidden="true"
              >
                <line x1="0" y1="14" x2="100" y2="14" />
                <line x1="0" y1="8" x2="0" y2="20" />
                <line x1="100" y1="8" x2="100" y2="20" />
                <path className="ar" d="M0 14 l7 -2.5 v5 z" />
                <path className="ar" d="M100 14 l-7 -2.5 v5 z" />
                <text x="50" y="6" textAnchor="middle">
                  {hero.tolerance}
                </text>
              </svg>
            </span>
            {hero.unit}
          </span>
          <span className="l">{hero.second}</span>
        </h1>
        <p className="lead">{hero.lead}</p>
        <div className="meta">
          {hero.meta.map((item) => (
            <span key={item}>{item}</span>
          ))}
        </div>
      </div>
    </section>
  );
}
