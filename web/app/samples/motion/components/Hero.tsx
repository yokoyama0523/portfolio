import { useGSAP } from "@gsap/react";
import { useRef } from "react";
import { gsap } from "../animation";
import { studio } from "../content/studio";
import { Words } from "./Words";

const { hero } = studio;

export function Hero({ start }: { start: boolean }) {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      if (!start) return;
      gsap.to(".w > span", { y: 0, duration: 1.1, ease: "power4.out", stagger: 0.06 });
      gsap.to(".mark", { opacity: 1, y: "22%", duration: 1.4, ease: "power3.out", delay: 0.3 });
      gsap.from(".lead, .side, .scroll", {
        opacity: 0,
        y: 12,
        duration: 1,
        delay: 0.6,
        stagger: 0.1,
      });
    },
    { scope: root, dependencies: [start] },
  );

  return (
    <section ref={root} className="hero" aria-label={hero.label}>
      <h1>
        <Words words={hero.title} wrap />
      </h1>
      <p className="jp lead">{hero.lead}</p>
      <div className="side">
        <b className="title">{hero.side.title}</b>
        {hero.side.lines.map((line) => (
          <span key={line} className="line">
            {line}
          </span>
        ))}
        <span className="jp line">{hero.side.award}</span>
      </div>
      <div className="mark">
        {hero.mark.start}
        <i>{hero.mark.slash}</i>
        {hero.mark.end}
      </div>
      <div className="scroll">{hero.scroll}</div>
    </section>
  );
}
