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
  const [held, setHeld] = useState(false);
  const [moved, setMoved] = useState(false);
  const show = (i: number) => {
    setMoved(true);
    setActive(i);
  };
  const next = () => show((active + 1) % total);
  const classes = ["hero", moved ? "moved" : "", paused || held ? "hold" : ""]
    .filter(Boolean)
    .join(" ");

  return (
    <section
      className={classes}
      aria-roledescription="carousel"
      aria-label={hero.label}
      onPointerEnter={() => setHeld(true)}
      onPointerLeave={() => setHeld(false)}
      onFocus={() => setHeld(true)}
      onBlur={() => setHeld(false)}
    >
      <h1 className="vh">{hero.heading}</h1>
      <div className="slides">
        {hero.slides.map((slide, i) => (
          <section
            key={slide.id}
            className={i === active ? "slide on" : "slide"}
            aria-roledescription="slide"
            aria-label={hero.slideLabel(i + 1, total)}
            aria-hidden={i !== active}
            inert={i !== active}
          >
            {slide.images.map((item, k) => (
              <figure key={item.name}>
                <Img image={image(item.name)} alt={item.alt} priority={i === 0 && k === 0} />
              </figure>
            ))}
            <div className="cap">
              <p className="ttl">{slide.title}</p>
              <Link to={slide.to}>{slide.link}</Link>
            </div>
          </section>
        ))}
      </div>
      <div className="ctl">
        {hero.slides.map((slide, i) => (
          <button
            key={slide.id}
            type="button"
            className={i === active ? "dot on" : "dot"}
            aria-label={hero.tab(i + 1)}
            aria-current={i === active}
            onClick={() => show(i)}
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
              <path d="M5 3.5v9M11 3.5v9" stroke="currentColor" strokeWidth="1.6" />
            </svg>
          )}
        </button>
      </div>
    </section>
  );
}
