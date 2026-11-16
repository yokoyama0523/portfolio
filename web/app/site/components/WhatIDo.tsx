import { useRef } from "react";
import { cases } from "~/site/data/cases";
import { about, links, sectionTitles } from "~/site/data/copy";
import { homeCopy } from "~/site/data/home";
import { themeColor } from "~/site/hooks/themeColor";
import { gsap, useIdleGSAP } from "~/site/hooks/useMotion";
import { Lines } from "./Lines";
import { PillButton } from "./PillButton";
import { ResponsiveImg } from "./ResponsiveImg";
import { SectionTitle } from "./SectionTitle";

const STACK_SIZE = 4;
const WORD_STAGGER = 0.25;
const LAYER_RISE = 70;
const LAYER_DIM = 0.6;
const LAYER_TOP = 30;
const LAYER_LEFT = 6;
const LAYER_STEP = 4;

const stack = cases.slice(0, STACK_SIZE);

export function WhatIDo() {
  const root = useRef<HTMLElement>(null);

  useIdleGSAP(() => {
    gsap.fromTo(
      "[data-word]",
      { color: themeColor("statement-dim") },
      {
        color: themeColor("accent"),
        stagger: WORD_STAGGER,
        ease: "none",
        scrollTrigger: {
          trigger: "[data-statement]",
          start: "top 80%",
          end: "bottom 35%",
          scrub: true,
        },
      },
    );
    gsap.utils.toArray<HTMLElement>("[data-layer]").forEach((el, i) => {
      gsap.fromTo(
        el,
        { y: 0, opacity: i === 0 ? 1 : LAYER_DIM },
        {
          y: -i * LAYER_RISE,
          opacity: 1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: "[data-stack]",
            start: "top 85%",
            end: "center 45%",
            scrub: true,
          },
        },
      );
    });
  }, root);

  return (
    <section ref={root} id="about" className="bg-white px-5 py-32 text-text md:px-12 md:py-48">
      <div className="mx-auto max-w-content">
        <SectionTitle {...sectionTitles.whatIDo} size="sm" />
        <p
          data-statement
          className="mt-10 font-latin text-display-statement font-light leading-statement -tracking-3 text-accent"
        >
          {homeCopy.statement.map((w) => (
            <span key={w} data-word className="mr-word inline-block">
              {w}
            </span>
          ))}
        </p>
        <div className="mt-20 grid items-center gap-16 md:mt-28 md:grid-cols-intro">
          <div data-reveal>
            <p className="text-base leading-airy tracking-8">
              <Lines lines={about} always={[1]} />
            </p>
            <div className="mt-12">
              <PillButton {...links.service} tone="dark" />
            </div>
          </div>
          <div data-stack className="relative h-90 perspective-stack md:h-115" aria-hidden="true">
            {stack.map((c, i) => (
              <ResponsiveImg
                key={c.id}
                data-layer
                image={c.media.thumb}
                sizes="(min-width: 768px) 36vw, 78vw"
                style={{
                  zIndex: stack.length - i,
                  top: `${LAYER_TOP + i * LAYER_STEP}%`,
                  left: `${LAYER_LEFT + i * LAYER_STEP}%`,
                }}
                className="absolute w-39/50 rotate-x-52 -rotate-z-38 shadow-float-soft"
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
