import { useGSAP } from "@gsap/react";
import { useRef } from "react";
import { gsap } from "../animation";
import { studio } from "../content/studio";

export function Numbers({ animate }: { animate: boolean }) {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      if (!animate) return;
      for (const element of gsap.utils.toArray<HTMLElement>("[data-n]")) {
        const to = Number(element.dataset.n);
        element.textContent = "0";
        const counter = { v: 0 };
        gsap.to(counter, {
          v: to,
          duration: 1.6,
          ease: "power3.out",
          scrollTrigger: { trigger: element, start: "top 85%", once: true },
          onUpdate: () => {
            element.textContent = String(Math.round(counter.v));
          },
        });
      }
    },
    { scope: root, dependencies: [animate] },
  );

  return (
    <section ref={root} className="nums">
      {studio.numbers.map((item) => (
        <div key={item.label}>
          <b data-n={item.value}>{item.value}</b>
          <span className="jp label">{item.label}</span>
        </div>
      ))}
    </section>
  );
}
