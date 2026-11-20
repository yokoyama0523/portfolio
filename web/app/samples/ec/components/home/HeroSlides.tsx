import { useState } from "react";
import { Link } from "react-router";
import { Img } from "~/samples/shared/Img";
import { image } from "../../assets";
import { home } from "../../content/home";

const { hero } = home;
const total = hero.slides.length;

export function HeroSlides() {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const next = () => setActive((i) => (i + 1) % total);

  return (
    <section
      className={paused ? "hero hold" : "hero"}
      aria-roledescription="carousel"
      aria-label={hero.label}
    >
      <h1 className="vh">{hero.heading}</h1>
      {hero.slides.map((slide, i) => (
        <section
          key={slide.id}
          className={i === active ? "slide on" : "slide"}
          aria-roledescription="slide"
          aria-label={hero.slideLabel(i + 1, total)}
          aria-hidden={i !== active}
          inert={i !== active}
        >
          <div className="slide-ph">
            {slide.images.map((item, k) => (
              <figure key={item.name} className={`ph tone-${item.tone}`}>
                <Img image={image(item.name)} alt={item.alt} priority={i === 0 && k === 0} />
              </figure>
            ))}
          </div>
          <div className="slide-cap">
            <p className="eyebrow">{slide.eyebrow}</p>
            <p className="slide-title">{slide.title}</p>
            <Link className="ul" to={slide.to}>
              {slide.link}
            </Link>
          </div>
        </section>
      ))}
      <div className="hero-ctl">
        {hero.slides.map((slide, i) => (
          <button
            key={slide.id}
            type="button"
            className={i === active ? "dot on" : "dot"}
            aria-label={hero.tab(i + 1)}
            aria-current={i === active}
            onClick={() => setActive(i)}
          >
            <i onAnimationEnd={i === active ? next : undefined} />
          </button>
        ))}
        <button
          type="button"
          className="pause"
          aria-pressed={paused}
          aria-label={paused ? hero.play : hero.pause}
          onClick={() => setPaused(!paused)}
        >
          {paused ? (
            <svg viewBox="0 0 16 16" aria-hidden="true">
              <path d="M5 3.5v9l7-4.5z" fill="currentColor" />
            </svg>
          ) : (
            <svg viewBox="0 0 16 16" aria-hidden="true">
              <path d="M5.5 3.5v9M10.5 3.5v9" stroke="currentColor" strokeWidth="1.4" />
            </svg>
          )}
        </button>
      </div>
    </section>
  );
}
