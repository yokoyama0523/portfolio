import { useGSAP } from "@gsap/react";
import { useRef, useState } from "react";
import { ScrollTrigger } from "../animation";
import { studio } from "../content/studio";

const words = studio.manifesto;
const LEAD = 1.15;

export function Manifesto({ animate }: { animate: boolean }) {
  const root = useRef<HTMLElement>(null);
  const [lit, setLit] = useState(animate ? 0 : words.length);

  useGSAP(
    () => {
      if (!animate) {
        setLit(words.length);
        return;
      }
      setLit(0);
      ScrollTrigger.create({
        trigger: root.current,
        start: "top top",
        end: "bottom bottom",
        scrub: true,
        onUpdate: (self) => setLit(Math.floor(self.progress * words.length * LEAD)),
      });
    },
    { scope: root, dependencies: [animate] },
  );

  return (
    <section ref={root} className="mani">
      <div className="pin">
        <p>
          {words.map((word, i) => (
            <span key={word.text}>
              {i > 0 && " "}
              <span className={i < lit ? "w on" : "w"}>
                {word.italic ? <i className="serif">{word.text}</i> : word.text}
              </span>
            </span>
          ))}
        </p>
      </div>
    </section>
  );
}
