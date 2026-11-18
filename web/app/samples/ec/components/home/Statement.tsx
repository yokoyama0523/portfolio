import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useRef } from "react";
import { Link } from "react-router";
import { home } from "../../content/home";

export function Statement() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      gsap.matchMedia().add("(prefers-reduced-motion: no-preference)", () => {
        gsap.from(".st-in", {
          yPercent: 110,
          duration: 1.6,
          ease: "expo.out",
          stagger: 0.14,
          scrollTrigger: { trigger: root.current, start: "top 72%" },
        });
        gsap.from(".st-sale", {
          opacity: 0,
          y: 24,
          duration: 1.4,
          ease: "expo.out",
          delay: 0.5,
          scrollTrigger: { trigger: root.current, start: "top 72%" },
        });
      });
    },
    { scope: root },
  );

  return (
    <section className="st" ref={root}>
      <p className="st-text">
        {home.statement.map((line) => (
          <span key={line} className="st-line">
            <span className="st-in">{line}</span>
          </span>
        ))}
      </p>
      <Link className="st-sale" to={home.sale.to}>
        <span>{home.sale.title}</span>
        <span className="st-sale-link">{home.sale.link}</span>
      </Link>
    </section>
  );
}
