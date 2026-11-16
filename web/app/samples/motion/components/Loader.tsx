import { useEffect, useRef, useState } from "react";
import { gsap } from "../animation";
import { studio } from "../content/studio";

const COUNT_SECONDS = 1.4;
const LIFT_SECONDS = 0.9;
const INTRO_DELAY_MS = 350;

export function Loader({ onIntro }: { onIntro: () => void }) {
  const root = useRef<HTMLDivElement>(null);
  const [count, setCount] = useState(studio.loader.from);
  const [gone, setGone] = useState(false);

  useEffect(() => {
    const counter = { n: studio.loader.from };
    let timer = 0;
    const tween = gsap.to(counter, {
      n: studio.loader.to,
      duration: COUNT_SECONDS,
      ease: "power2.inOut",
      onUpdate: () => setCount(Math.round(counter.n)),
      onComplete: () => {
        gsap.to(root.current, {
          yPercent: -100,
          duration: LIFT_SECONDS,
          ease: "power4.inOut",
          onComplete: () => setGone(true),
        });
        timer = window.setTimeout(onIntro, INTRO_DELAY_MS);
      },
    });
    return () => {
      tween.kill();
      window.clearTimeout(timer);
    };
  }, [onIntro]);

  if (gone) return null;
  return (
    <div ref={root} className="loader" aria-hidden="true">
      <small className="jp">{studio.loader.label}</small>
      <span>{count}</span>
    </div>
  );
}
