import { services } from "~/site/data/services";
import { PillButton } from "./PillButton";

export function ServicePanels() {
  return (
    <section aria-label="サービス" className="grid border-y border-line bg-white md:grid-cols-2">
      {services.map((p) => (
        <article
          key={p.en}
          className="group relative flex min-h-[520px] flex-col justify-between overflow-hidden bg-white px-8 py-16 text-ink md:px-16 md:py-20 md:[&+&]:border-l md:[&+&]:border-line"
        >
          <div className="relative z-10" data-reveal>
            <h3 className="font-latin text-[clamp(32px,3vw,44px)] font-light leading-none tracking-[-0.01em] text-accent">
              {p.en}
            </h3>
            <p className="mt-4 text-[13px] font-medium tracking-[0.12em] text-mute">{p.jp}</p>
            <p className="mt-10 text-[14px] leading-[2.1] tracking-[0.06em]">
              {p.text.map((line) => (
                <span key={line} className="md:block">
                  {line}
                </span>
              ))}
            </p>
          </div>
          <div className="relative z-10 mt-12" data-reveal>
            <PillButton href={`/service/#${p.id}`} en="View More" jp="詳しく見る" tone="dark" />
          </div>
          <img
            src={p.image.media.thumb.src}
            srcSet={p.image.media.thumb.srcSet}
            sizes="(min-width: 1280px) 560px, 80vw"
            alt=""
            width={960}
            height={600}
            loading="lazy"
            className="relative -mb-28 -mr-14 ml-auto mt-12 w-[80%] rotate-[-4deg] xl:absolute xl:-bottom-10 xl:left-[400px] xl:-right-10 xl:m-0 xl:w-auto xl:max-w-[560px] opacity-90 shadow-[0_30px_60px_-30px_rgba(0,0,0,0.5)] transition-transform duration-700 ease-out-soft group-hover:-translate-y-4 group-hover:rotate-[-2deg]"
            aria-hidden="true"
          />
        </article>
      ))}
    </section>
  );
}
