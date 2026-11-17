import { hero } from "../../assets";
import { home } from "../../content/home";

const text = home.hero;

export function Hero() {
  return (
    <section className="hero" aria-label={text.lines.join("")}>
      <img
        src={hero.src}
        srcSet={hero.srcSet}
        sizes="(min-width: 1081px) calc(100vw - 48px), (min-width: 861px) 140vw, 260vw"
        width={hero.width}
        height={hero.height}
        alt={text.alt}
        fetchPriority="high"
        decoding="async"
      />
      <h1 className="hero-copy">
        {text.lines.map((line) => (
          <span key={line}>{line}</span>
        ))}
      </h1>
      <p className="hero-sub">
        {text.sub.map((line) => (
          <span key={line}>{line}</span>
        ))}
      </p>
    </section>
  );
}
