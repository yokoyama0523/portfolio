import Lenis from "lenis";
import { useEffect } from "react";
import { themeColor } from "~/site/hooks/themeColor";
import { gsap, reducedMotion, ScrollTrigger, useIdleGSAP } from "~/site/hooks/useMotion";

const SMOOTH_SCROLL = { duration: 1.1, anchors: true };
const MS_PER_SECOND = 1000;
const REVEAL = { offset: 40, duration: 1.1, stagger: 0.1, start: "top 90%" };
const COUNT = { duration: 1.6, start: "top 85%" };
const CURTAIN = {
  hidden: "inset(100% 0% 0% 0%)",
  shown: "inset(0% 0% 0% 0%)",
  duration: 1.3,
  zoom: 1.25,
  settle: 1.3,
  stagger: 0.12,
  start: "top 88%",
};
const PARALLAX = { scale: 1.15, shift: 6, ease: 1.2 };
const SCRUB = { stagger: 0.08, start: "top 85%", end: "top 40%" };
const SPIN = { turn: 180, lag: 0.6 };

const belowFold = (el: HTMLElement) => el.getBoundingClientRect().top > window.innerHeight;
const imageOf = (el: HTMLElement) => el.querySelector<HTMLElement>("img");
const restScale = (img: HTMLElement) => (img.hasAttribute("data-parallax") ? PARALLAX.scale : 1);

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

    const curtains = gsap.utils.toArray<HTMLElement>("[data-curtain]").filter(belowFold);
    for (const el of curtains) {
      gsap.set(el, { clipPath: CURTAIN.hidden });
      const img = imageOf(el);
      if (img) gsap.set(img, { scale: CURTAIN.zoom });
    }
    ScrollTrigger.batch(curtains, {
      start: CURTAIN.start,
      once: true,
      onEnter: (batch) =>
        batch.forEach((el, i) => {
          const delay = i * CURTAIN.stagger;
          gsap.to(el, {
            clipPath: CURTAIN.shown,
            duration: CURTAIN.duration,
            ease: "power4.inOut",
            delay,
            clearProps: "clipPath",
          });
          const img = imageOf(el as HTMLElement);
          if (img)
            gsap.to(img, {
              scale: restScale(img),
              duration: CURTAIN.duration * CURTAIN.settle,
              ease: "power3.out",
              delay,
            });
        }),
    });

    gsap.utils.toArray<HTMLElement>("[data-parallax]").forEach((img) => {
      if (!curtains.some((c) => c.contains(img)))
        gsap.to(img, { scale: PARALLAX.scale, duration: PARALLAX.ease, ease: "power2.out" });
      gsap.fromTo(
        img,
        { yPercent: -PARALLAX.shift },
        {
          yPercent: PARALLAX.shift,
          ease: "none",
          scrollTrigger: {
            trigger: img.parentElement,
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          },
        },
      );
    });

    gsap.utils.toArray<HTMLElement>("[data-scrub]").forEach((el) => {
      gsap.fromTo(
        el.querySelectorAll("[data-scrub-part]"),
        { color: themeColor("statement-dim") },
        {
          color: themeColor("accent"),
          stagger: SCRUB.stagger,
          ease: "none",
          scrollTrigger: { trigger: el, start: SCRUB.start, end: SCRUB.end, scrub: true },
        },
      );
    });

    gsap.utils.toArray<HTMLElement>("[data-spin]").forEach((el) => {
      gsap.to(el, {
        rotate: SPIN.turn,
        ease: "none",
        scrollTrigger: {
          trigger: document.documentElement,
          start: "top top",
          end: "bottom bottom",
          scrub: SPIN.lag,
        },
      });
    });

    ScrollTrigger.refresh();
  });

  return null;
}
