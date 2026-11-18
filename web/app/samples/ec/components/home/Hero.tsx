import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import type { CSSProperties } from "react";
import { useRef } from "react";
import { Link } from "react-router";
import { Img } from "~/samples/shared/Img";
import { image } from "../../assets";
import { shop } from "../../content/catalog";
import { home } from "../../content/home";

gsap.registerPlugin(ScrollTrigger, useGSAP);

const { hero } = home;
const letters = [...shop.name].map((ch, i) => ({ ch, id: `${i}-${ch}` }));
const SCRUB = 0.8;

export function Hero() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(
        { motion: "(prefers-reduced-motion: no-preference)", wide: "(min-width: 901px)" },
        (context) => {
          const { motion, wide } = context.conditions as { motion: boolean; wide: boolean };
          if (!motion) return;
          const tl = gsap.timeline({
            defaults: { ease: "none" },
            scrollTrigger: {
              trigger: root.current,
              start: "top top",
              end: "bottom bottom",
              scrub: SCRUB,
            },
          });
          tl.to(".hx-center", { "--open": 1 }, 0)
            .to(".hx-mark", { letterSpacing: "0.34em", opacity: 0 }, 0)
            .to(".hx-foot", { opacity: 0, y: -48 }, 0);
          if (wide) {
            tl.to(".hx-side.l", { xPercent: -45, opacity: 0 }, 0).to(
              ".hx-side.r",
              { xPercent: 45, opacity: 0 },
              0,
            );
          }
        },
      );
    },
    { scope: root },
  );

  return (
    <section className="hx" ref={root} aria-label={hero.season}>
      <div className="hx-stage">
        <figure className="hx-side l">
          <Img image={image(hero.images.left.name)} alt={hero.images.left.alt} />
        </figure>
        <figure className="hx-side r">
          <Img image={image(hero.images.right.name)} alt={hero.images.right.alt} />
        </figure>
        <figure className="hx-center">
          <Img image={image(hero.images.center.name)} alt={hero.images.center.alt} priority />
        </figure>
        <h1 className="hx-mark">
          <span className="vh">{hero.heading}</span>
          <span className="hx-letters" aria-hidden="true">
            {letters.map((l, i) => (
              <span key={l.id} className="hx-l" style={{ "--i": i } as CSSProperties}>
                {l.ch}
              </span>
            ))}
          </span>
        </h1>
        <div className="hx-foot">
          <p className="hx-season">{hero.season}</p>
          <p className="hx-tag">{shop.tagline}</p>
          <Link className="hx-link" to={hero.to}>
            {hero.link}
          </Link>
        </div>
      </div>
    </section>
  );
}
