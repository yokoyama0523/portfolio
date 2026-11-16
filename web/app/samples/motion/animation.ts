import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useEffect, useState } from "react";

gsap.registerPlugin(ScrollTrigger);

export { gsap, ScrollTrigger };

export function useMediaFlags() {
  const [flags, setFlags] = useState({ ready: false, reducedMotion: false, finePointer: false });
  useEffect(() => {
    setFlags({
      ready: true,
      reducedMotion: window.matchMedia("(prefers-reduced-motion: reduce)").matches,
      finePointer: window.matchMedia("(pointer: fine)").matches,
    });
  }, []);
  return flags;
}
