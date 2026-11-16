import { site } from "~/config";
import { cases } from "~/site/data/cases";
import { PillButton } from "./PillButton";

export function ContactBand() {
  return (
    <section
      aria-label="ご相談"
      className="relative isolate overflow-hidden bg-accent px-5 py-28 text-white md:px-12 md:py-36"
    >
      <div
        className="absolute inset-0 -z-10 grid rotate-[-6deg] scale-125 grid-cols-5 gap-3 opacity-25 mix-blend-luminosity"
        aria-hidden="true"
      >
        {cases.map((c) => (
          <img
            key={c.id}
            src={c.media.thumb.src}
            srcSet={c.media.thumb.srcSet}
            sizes="20vw"
            alt=""
            width={480}
            height={300}
            loading="lazy"
            decoding="async"
            className="aspect-[16/10] w-full object-cover"
          />
        ))}
      </div>
      <div
        className="absolute inset-0 -z-10 bg-gradient-to-r from-accent via-accent/85 to-accent/40"
        aria-hidden="true"
      />
      <div className="mx-auto flex max-w-[1280px] flex-col gap-14 md:flex-row md:items-end md:justify-between">
        <div data-reveal>
          <p className="font-latin text-[15px] tracking-[0.06em] text-white/80">Contact</p>
          <p className="mt-8 font-latin text-[clamp(40px,5.4vw,84px)] font-light leading-[1.05] tracking-[-0.02em]">
            Let&apos;s work together.
          </p>
          <p className="mt-8 text-[14px] leading-[2.1] tracking-[0.08em] text-white/85">
            ご相談・お見積もりは、クラウドワークスからお問い合わせください。
            <br className="hidden md:inline" />
            お見積もりは3日以内にご提示します。
          </p>
        </div>
        <div data-reveal>
          <PillButton
            href={site.crowdworks}
            en="Contact"
            jp="クラウドワークスで相談する"
            tone="ghost"
            external
          />
        </div>
      </div>
    </section>
  );
}
