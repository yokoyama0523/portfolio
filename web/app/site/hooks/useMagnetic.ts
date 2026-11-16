import { useEffect, useRef } from "react";
import { gsap, reducedMotion } from "./useMotion";

const DEFAULT_STRENGTH = 0.35;
const FOLLOW = { duration: 0.6, ease: "power3.out" };

export function useMagnetic<T extends HTMLElement>(strength = DEFAULT_STRENGTH) {
  const ref = useRef<T>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || reducedMotion() || window.matchMedia("(pointer: coarse)").matches) return;
    const xTo = gsap.quickTo(el, "x", FOLLOW);
    const yTo = gsap.quickTo(el, "y", FOLLOW);
    const move = (e: PointerEvent) => {
      const r = el.getBoundingClientRect();
      xTo((e.clientX - (r.left + r.width / 2)) * strength);
      yTo((e.clientY - (r.top + r.height / 2)) * strength);
    };
    const leave = () => {
      xTo(0);
      yTo(0);
    };
    el.addEventListener("pointermove", move);
    el.addEventListener("pointerleave", leave);
    return () => {
      el.removeEventListener("pointermove", move);
      el.removeEventListener("pointerleave", leave);
    };
  }, [strength]);

  return ref;
}
