import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useRef } from "react";
import { Link } from "react-router";
import { Img } from "~/samples/shared/Img";
import { image } from "../../assets";
import { looks } from "../../content/catalog";
import { home } from "../../content/home";
import { paths } from "../../content/paths";
import { productById } from "../../store/pricing";
import { SectionHead } from "./SectionHead";

gsap.registerPlugin(ScrollTrigger, useGSAP);

const lookNumber = (i: number) => `Look ${String(i + 1).padStart(2, "0")}`;

export function Lookbook() {
  const root = useRef<HTMLElement>(null);
  const strip = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      gsap
        .matchMedia()
        .add("(prefers-reduced-motion: no-preference) and (min-width: 901px)", () => {
          const el = strip.current;
          if (!el) return;
          const distance = () => el.scrollWidth - window.innerWidth;
          gsap.to(el, {
            x: () => -distance(),
            ease: "none",
            scrollTrigger: {
              trigger: root.current,
              start: "top top",
              end: () => `+=${distance()}`,
              scrub: 0.6,
              pin: true,
              invalidateOnRefresh: true,
            },
          });
        });
    },
    { scope: root },
  );

  return (
    <section className="lk" id={home.looksId} ref={root} aria-labelledby="looks-title">
      <div className="lk-head wrap">
        <SectionHead id="looks-title" {...home.looksTitle} />
        <p className="lk-lead">{home.looksLead}</p>
      </div>
      <div className="lk-strip" ref={strip}>
        {looks.map((look, i) => (
          <figure key={look.image} className="lk-item">
            <div className="im">
              <Img image={image(look.image)} alt={look.title} />
            </div>
            <figcaption>
              <span className="lk-no">{lookNumber(i)}</span>
              <b>{look.title}</b>
              <span className="lk-items">
                {look.items.map((id) => (
                  <Link key={id} to={paths.item(id)}>
                    {productById[id].name}
                  </Link>
                ))}
              </span>
            </figcaption>
          </figure>
        ))}
      </div>
    </section>
  );
}
