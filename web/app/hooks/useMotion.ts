import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import type { RefObject } from "react";

gsap.registerPlugin(ScrollTrigger);

export const reducedMotion = () =>
  typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

const idle = (fn: () => void) => {
  if (typeof window.requestIdleCallback === "function") {
    const id = window.requestIdleCallback(fn, { timeout: 1500 });
    return () => window.cancelIdleCallback(id);
  }
  const id = window.setTimeout(fn, 300);
  return () => window.clearTimeout(id);
};

export function useIdleGSAP(setup: () => void, scope?: RefObject<HTMLElement | null>) {
  useGSAP(
    (_, contextSafe) => {
      if (reducedMotion() || !contextSafe) return;
      return idle(contextSafe(setup));
    },
    { scope },
  );
}

export { gsap, ScrollTrigger };
