import Lenis from "lenis";
import { useEffect } from "react";
import { gsap, reducedMotion, ScrollTrigger, useIdleGSAP } from "~/site/hooks/useMotion";

const SMOOTH_SCROLL = { duration: 1.1, anchors: true };
const MS_PER_SECOND = 1000;
const REVEAL = { offset: 40, duration: 1.1, stagger: 0.1, start: "top 90%" };
const COUNT = { duration: 1.6, start: "top 85%" };

export function MotionRoot() {
  useEffect(() => {
    if (reducedMotion() || window.matchMedia("(pointer: coarse)").matches) return;
    const lenis = new Lenis(SMOOTH_SCROLL);
    lenis.on("scroll", ScrollTrigger.update);
    const tick = (t: number) => lenis.raf(t * MS_PER_SECOND);
    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(0);
    return () => {
      gsap.ticker.remove(tick);
      lenis.destroy();
    };
  }, []);

  useIdleGSAP(() => {
    const items = gsap.utils.toArray<HTMLElement>("[data-reveal]");
    gsap.set(items, { opacity: 0, y: REVEAL.offset });
    ScrollTrigger.batch(items, {
      start: REVEAL.start,
      onEnter: (batch) =>
        gsap.to(batch, {
          opacity: 1,
          y: 0,
          duration: REVEAL.duration,
          ease: "power3.out",
          stagger: REVEAL.stagger,
          overwrite: true,
        }),
    });
    gsap.utils.toArray<HTMLElement>("[data-count]").forEach((el) => {
      const to = Number(el.dataset.count);
      const o = { v: 0 };
      el.textContent = "0";
      gsap.to(o, {
        v: to,
        duration: COUNT.duration,
        ease: "power2.out",
        onUpdate: () => {
          el.textContent = String(Math.round(o.v));
        },
        scrollTrigger: { trigger: el, start: COUNT.start },
      });
    });
    ScrollTrigger.refresh();
  });

  return null;
}
