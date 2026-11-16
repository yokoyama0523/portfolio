import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import type { RefObject } from "react";

gsap.registerPlugin(ScrollTrigger);

export const reducedMotion = () =>
  typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

const IDLE_TIMEOUT_MS = 1500;
const IDLE_FALLBACK_MS = 300;

const idle = (fn: () => void) => {
  if (typeof window.requestIdleCallback === "function") {
    const id = window.requestIdleCallback(fn, { timeout: IDLE_TIMEOUT_MS });
    return () => window.cancelIdleCallback(id);
  }
  const id = window.setTimeout(fn, IDLE_FALLBACK_MS);
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
