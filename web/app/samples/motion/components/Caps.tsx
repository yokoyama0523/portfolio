import { useGSAP } from "@gsap/react";
import { useRef } from "react";
import { gsap } from "../animation";
import { studio } from "../content/studio";
import { Words } from "./Words";

const { caps } = studio;

export function Caps({ animate }: { animate: boolean }) {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      if (!animate) return;
      gsap.to("li", {
        opacity: 1,
        y: 0,
        duration: 0.9,
        stagger: 0.12,
        ease: "power3.out",
        scrollTrigger: { trigger: "ol", start: "top 75%" },
      });
    },
    { scope: root, dependencies: [animate] },
  );

  return (
    <section ref={root} className="caps" id={caps.id}>
      <h2>
        <Words words={caps.title} />
      </h2>
      <ol>
        {caps.items.map((item) => (
          <li key={item.title}>
            <div>
              <b>{item.title}</b>
              <p>{item.text}</p>
            </div>
          </li>
        ))}
      </ol>
    </section>
  );
}
