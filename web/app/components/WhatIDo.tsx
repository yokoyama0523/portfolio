import { useRef } from "react";
import { caseAsset, caseSmall, cases } from "~/data/cases";
import { about } from "~/data/copy";
import { gsap, useIdleGSAP } from "~/hooks/useMotion";
import { Lines } from "./Lines";
import { PillButton } from "./PillButton";
import { SectionTitle } from "./SectionTitle";

const statement = ["Websites", "that", "fit", "the", "business."];
const stack = cases.slice(0, 4);

export function WhatIDo() {
  const root = useRef<HTMLElement>(null);

  useIdleGSAP(() => {
    gsap.fromTo(
      "[data-word]",
      { color: "#d9dbe3" },
      {
        color: "#000000",
        stagger: 0.25,
        ease: "none",
        scrollTrigger: { trigger: "[data-statement]", start: "top 80%", end: "bottom 35%", scrub: true },
      },
    );
    gsap.utils.toArray<HTMLElement>("[data-layer]").forEach((el, i) => {
      gsap.fromTo(
        el,
        { y: 0, opacity: i === 0 ? 1 : 0.6 },
        { y: -i * 70, opacity: 1, ease: "power2.out", scrollTrigger: { trigger: "[data-stack]", start: "top 85%", end: "center 45%", scrub: true } },
      );
    });
  }, root);

  return (
    <section ref={root} id="about" className="bg-white px-5 py-32 text-text md:px-12 md:py-48">
      <div className="mx-auto max-w-[1280px]">
        <SectionTitle en="What I do" jp="仕事内容" size="sm" />
        <p data-statement className="mt-10 font-latin text-[clamp(48px,9vw,148px)] font-light leading-[0.98] tracking-[-0.03em] text-accent">
          {statement.map((w, i) => (
            <span key={i} data-word className="mr-[0.22em] inline-block">
              {w}
            </span>
          ))}
        </p>
        <div className="mt-20 grid items-center gap-16 md:mt-28 md:grid-cols-[5fr_7fr]">
          <div data-reveal>
            <p className="text-[15px] leading-[2.2] tracking-[0.08em]">
              <Lines lines={about} always={[1]} />
            </p>
            <div className="mt-12">
              <PillButton href="/service/" en="View Service" jp="サービス内容を見る" tone="dark" />
            </div>
          </div>
          <div data-stack className="relative h-[360px] [perspective:1800px] md:h-[460px]" aria-hidden>
            {stack.map((c, i) => (
              <img
                key={c.id}
                data-layer
                src={caseAsset(c, "thumb")}
                srcSet={`${caseSmall(c, "thumb")} 480w, ${caseAsset(c, "thumb")} 960w`}
                sizes="(min-width: 768px) 36vw, 78vw"
                alt=""
                width={960}
                height={600}
                loading="lazy"
                style={{ zIndex: stack.length - i, top: `${30 + i * 4}%`, left: `${6 + i * 4}%` }}
                className="absolute w-[78%] shadow-[0_30px_60px_-30px_rgba(0,0,0,0.45)] [transform:rotateX(52deg)_rotateZ(-38deg)]"
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
