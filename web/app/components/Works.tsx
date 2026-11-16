import { useRef } from "react";
import { caseAsset, cases, caseUrl, stats } from "~/data/cases";
import { worksLead } from "~/data/copy";
import { gsap, ScrollTrigger, useIdleGSAP } from "~/hooks/useMotion";
import { LaptopMock, PhoneMock } from "./Devices";
import { Lines } from "./Lines";
import { PillButton } from "./PillButton";
import { SectionTitle } from "./SectionTitle";

export function Works({ pages }: { pages: number }) {
  const root = useRef<HTMLElement>(null);

  useIdleGSAP(() => {
    ScrollTrigger.matchMedia({
      "(min-width: 768px)": () => {
        gsap.utils.toArray<HTMLElement>("[data-col]").forEach((col, i) => {
          gsap.fromTo(col, { y: i ? 120 : 0 }, { y: i ? -60 : 0, ease: "none", scrollTrigger: { trigger: col, start: "top bottom", end: "bottom top", scrub: true } });
        });
      },
    });
  }, root);

  const cols = [cases.filter((_, i) => i % 2 === 0), cases.filter((_, i) => i % 2 === 1)];

  return (
    <section ref={root} id="works" className="px-5 py-32 md:px-12 md:py-48">
      <div className="mx-auto grid max-w-[1280px] gap-16 md:grid-cols-[4fr_7fr] md:gap-24">
        <div className="md:sticky md:top-32 md:self-start">
          <SectionTitle en="Works" jp="制作事例" />
          <p className="mt-10 text-[14px] leading-[2.1] tracking-[0.06em]" data-reveal>
            <Lines lines={worksLead} />
          </p>
          <dl className="mt-12 border-t border-line" data-reveal>
            {[
              ["Industries", "業種", stats.industries],
              ["Pages", "ページ", pages],
              ["Forms", "予約・購入フォーム", stats.forms],
            ].map(([en, jp, n]) => (
              <div key={en} className="flex items-end justify-between border-b border-line py-5">
                <dt className="flex flex-col">
                  <span className="font-latin text-[13px] tracking-[0.06em] text-accent">{en}</span>
                  <span className="mt-1 text-[11px] tracking-[0.08em] text-mute">{jp}</span>
                </dt>
                <dd className="font-latin text-[56px] font-light leading-none tracking-[-0.03em] text-ink" data-count={n}>
                  {n}
                </dd>
              </div>
            ))}
          </dl>
          <div className="mt-12" data-reveal>
            <PillButton href="/portfolio/" en="View Works" jp="制作事例一覧へ" />
          </div>
        </div>
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 md:gap-12">
          {cols.map((col, ci) => (
            <div key={ci} data-col className="flex flex-col gap-14">
              {col.map((c) => (
                <a key={c.id} href={caseUrl(c)} className="group block" data-reveal>
                  <span className="relative flex aspect-[4/5] items-end justify-center overflow-hidden bg-mist px-[9%] pb-[14%] transition-colors duration-500 group-hover:bg-[#e9ebf2]">
                    <span className="w-full transition-transform duration-700 ease-out-soft group-hover:-translate-y-2">
                      <LaptopMock src={caseAsset(c, "desktop")} alt={`${c.name}（${c.industry}）`} />
                    </span>
                    <span className="absolute bottom-[10%] right-[8%] w-[24%] transition-transform duration-700 ease-out-soft group-hover:-translate-y-4">
                      <PhoneMock src={caseAsset(c, "mobile")} />
                    </span>
                  </span>
                  <span className="mt-5 block font-latin text-[12px] tracking-[0.08em] text-accent">{c.industry_en}</span>
                  <span className="mt-1 block text-[16px] font-bold tracking-[0.04em] text-ink">{c.name}</span>
                  <span className="mt-1 block text-[12px] tracking-[0.06em] text-mute">{c.industry}</span>
                </a>
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
