import Lenis from "lenis";
import { useEffect } from "react";
import { gsap, reducedMotion, ScrollTrigger, useIdleGSAP } from "~/site/hooks/useMotion";

export function MotionRoot() {
  useEffect(() => {
    if (reducedMotion() || window.matchMedia("(pointer: coarse)").matches) return;
    const lenis = new Lenis({ duration: 1.1, anchors: true });
    lenis.on("scroll", ScrollTrigger.update);
    const tick = (t: number) => lenis.raf(t * 1000);
    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(0);
    return () => {
      gsap.ticker.remove(tick);
      lenis.destroy();
    };
  }, []);

  useIdleGSAP(() => {
    const items = gsap.utils.toArray<HTMLElement>("[data-reveal]");
    gsap.set(items, { opacity: 0, y: 40 });
    ScrollTrigger.batch(items, {
      start: "top 90%",
      onEnter: (batch) =>
        gsap.to(batch, {
          opacity: 1,
          y: 0,
          duration: 1.1,
          ease: "power3.out",
          stagger: 0.1,
          overwrite: true,
        }),
    });
    gsap.utils.toArray<HTMLElement>("[data-count]").forEach((el) => {
      const to = Number(el.dataset.count);
      const o = { v: 0 };
      el.textContent = "0";
      gsap.to(o, {
        v: to,
        duration: 1.6,
        ease: "power2.out",
        onUpdate: () => {
          el.textContent = String(Math.round(o.v));
        },
        scrollTrigger: { trigger: el, start: "top 85%" },
      });
    });
    ScrollTrigger.refresh();
  });

  return null;
}
