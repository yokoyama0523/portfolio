import { homeCopy } from "~/site/data/home";
import { services } from "~/site/data/services";
import { PillButton } from "./PillButton";
import { ResponsiveImg } from "./ResponsiveImg";

export function ServicePanels() {
  return (
    <section
      aria-label={homeCopy.servicesLabel}
      className="grid border-y border-line bg-white md:grid-cols-2"
    >
      {services.map((p) => (
        <article
          key={p.en}
          className="group relative flex min-h-130 flex-col justify-between overflow-hidden bg-white px-8 py-16 text-ink md:px-16 md:py-20 md:not-first:border-l md:not-first:border-line"
        >
          <div className="relative z-10" data-reveal>
            <h3 className="font-latin text-display-panel font-light leading-none -tracking-1 text-accent">
              {p.en}
            </h3>
            <p className="mt-4 text-sm font-medium tracking-12 text-mute">{p.jp}</p>
            <p className="mt-10 text-md leading-loose tracking-6">
              {p.text.map((line) => (
                <span key={line} className="md:block">
                  {line}
                </span>
              ))}
            </p>
          </div>
          <ResponsiveImg
            image={p.image.media.thumb}
            sizes="(min-width: 1280px) 560px, 80vw"
            className="relative -mr-14 mt-12 ml-auto w-4/5 -rotate-4 opacity-90 shadow-float transition-transform duration-700 ease-out-soft group-hover:-translate-y-4 group-hover:-rotate-2 xl:absolute xl:-right-10 xl:-bottom-10 xl:left-100 xl:m-0 xl:w-auto xl:max-w-panel-image"
            aria-hidden="true"
          />
          <div className="relative z-10 mt-12" data-reveal>
            <PillButton href={p.href} {...homeCopy.serviceMore} tone="dark" />
          </div>
        </article>
      ))}
    </section>
  );
}
