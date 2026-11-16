import { useRef } from "react";
import { cases } from "~/site/data/cases";
import { links, sectionTitles, worksLead } from "~/site/data/copy";
import { homeCopy } from "~/site/data/home";
import { portfolioCopy } from "~/site/data/portfolio";
import { gsap, ScrollTrigger, useIdleGSAP } from "~/site/hooks/useMotion";
import { LaptopMock, PhoneMock } from "./Devices";
import { Lines } from "./Lines";
import { PillButton } from "./PillButton";
import { SectionTitle } from "./SectionTitle";

const PARALLAX_FROM = 120;
const PARALLAX_TO = -60;

export function Works({ pages }: { pages: number }) {
  const root = useRef<HTMLElement>(null);

  useIdleGSAP(() => {
    ScrollTrigger.matchMedia({
      "(min-width: 768px)": () => {
        gsap.utils.toArray<HTMLElement>("[data-col]").forEach((col, i) => {
          gsap.fromTo(
            col,
            { y: i ? PARALLAX_FROM : 0 },
            {
              y: i ? PARALLAX_TO : 0,
              ease: "none",
              scrollTrigger: { trigger: col, start: "top bottom", end: "bottom top", scrub: true },
            },
          );
        });
      },
    });
  }, root);

  const cols = [
    { id: "even", items: cases.filter((_, i) => i % 2 === 0) },
    { id: "odd", items: cases.filter((_, i) => i % 2 === 1) },
  ];

  return (
    <section ref={root} id="works" className="px-5 py-32 md:px-12 md:py-48">
      <div className="mx-auto grid max-w-content gap-16 md:grid-cols-aside md:gap-24">
        <div className="md:sticky md:top-32 md:self-start">
          <SectionTitle {...sectionTitles.works} />
          <p className="mt-10 text-md leading-loose tracking-6" data-reveal>
            <Lines lines={worksLead} />
          </p>
          <dl className="mt-12 border-t border-line" data-reveal>
            {homeCopy.stats(pages).map((stat) => (
              <div
                key={stat.en}
                className="flex items-end justify-between border-b border-line py-5"
              >
                <dt className="flex flex-col">
                  <span className="font-latin text-sm tracking-6 text-accent">{stat.en}</span>
                  <span className="mt-1 text-2xs tracking-8 text-mute">{stat.jp}</span>
                </dt>
                <dd
                  className="font-latin text-5xl font-light leading-none -tracking-3 text-ink"
                  data-count={stat.value}
                >
                  {stat.value}
                </dd>
              </div>
            ))}
          </dl>
          <div className="mt-12" data-reveal>
            <PillButton {...links.works} />
          </div>
        </div>
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 md:gap-12">
          {cols.map((col) => (
            <div key={col.id} data-col className="flex flex-col gap-14">
              {col.items.map((c) => (
                <a key={c.id} href={c.path} className="group block" data-reveal>
                  <span className="relative flex aspect-card items-end justify-center overflow-hidden bg-mist px-mock-x pb-mock-bottom transition-colors duration-500 group-hover:bg-mist-deep">
                    <span className="w-full transition-transform duration-700 ease-out-soft group-hover:-translate-y-2">
                      <LaptopMock
                        image={c.media.desktop}
                        sizes="(min-width: 768px) 24vw, 80vw"
                        alt={portfolioCopy.caseName(c.name, c.industry)}
                      />
                    </span>
                    <span className="absolute right-2/25 bottom-1/10 w-6/25 transition-transform duration-700 ease-out-soft group-hover:-translate-y-4">
                      <PhoneMock image={c.media.mobile} sizes="(min-width: 768px) 8vw, 20vw" />
                    </span>
                  </span>
                  <span className="mt-5 block font-latin text-xs tracking-8 text-accent">
                    {c.industry_en}
                  </span>
                  <span className="mt-1 block text-lg font-bold tracking-4 text-ink">{c.name}</span>
                  <span className="mt-1 block text-xs tracking-6 text-mute">{c.industry}</span>
                </a>
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
