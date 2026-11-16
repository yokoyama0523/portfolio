import { useEffect, useRef, useState } from "react";
import { gsap } from "../animation";

const FOLLOW_SECONDS = 0.15;

export function Cursor() {
  const root = useRef<HTMLDivElement>(null);
  const [label, setLabel] = useState<string | null>(null);

  useEffect(() => {
    document.body.classList.add("has-cursor");
    const move = (event: PointerEvent) =>
      gsap.to(root.current, {
        x: event.clientX,
        y: event.clientY,
        duration: FOLLOW_SECONDS,
        ease: "none",
      });
    const over = (event: PointerEvent) => {
      const hit = (event.target as Element).closest<HTMLElement>("a, [data-cur]");
      setLabel(hit ? (hit.dataset.cur ?? "") : null);
    };
    window.addEventListener("pointermove", move);
    document.addEventListener("pointerover", over);
    return () => {
      document.body.classList.remove("has-cursor");
      window.removeEventListener("pointermove", move);
      document.removeEventListener("pointerover", over);
    };
  }, []);

  return (
    <div ref={root} className={label === null ? "cur" : "cur on"} aria-hidden="true">
      <div className="ring" />
      <div className="dot" />
      <div className="lab">{label}</div>
    </div>
  );
}
